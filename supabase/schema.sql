-- ============================================================================
-- GEMATRI — Supabase Database Schema
-- Nusantara Rebel: Complete DDL for all tables, indexes, RLS, and seed data.
-- Paste the entire file into Supabase SQL Editor and run.
-- ============================================================================

-- ── Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. USERS — extends Clerk-managed identities (only student role)
-- ============================================================================
CREATE TABLE users (
  id            TEXT PRIMARY KEY,               -- Clerk user ID
  username      TEXT NOT NULL,
  email         TEXT,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  users      IS $$Extended user profile synced from Clerk auth$$;
COMMENT ON COLUMN users.id   IS $$Clerk user ID (matches auth.users.id)$$;

-- ============================================================================
-- 2. SUBTOPIC PROGRESS — tracks student advancement through a PageContent
-- ============================================================================
CREATE TABLE subtopic_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module           TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),
  subtopic         TEXT NOT NULL,                   -- PageContent.id

  -- Daftar id langkah inkuiri yang sudah dikerjakan, misal ["step1","step2"]
  steps_completed  JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Indeks pengamatan yang sudah diceklis, misal [0,1]
  observations     JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Catatan kesimpulan siswa berupa teks bebas
  conclusion       TEXT,

  completed        BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_ms    INTEGER NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Satu baris per (user, module, subtopic)
  UNIQUE(user_id, module, subtopic)
);

COMMENT ON TABLE  subtopic_progress           IS $$Tracks student progress through each PageContent module subtopic$$;
COMMENT ON COLUMN subtopic_progress.module    IS $$'translasi' | 'refleksi'$$;
COMMENT ON COLUMN subtopic_progress.subtopic IS $$PageContent.id — 'titik', 'garis', 'bangun', 'sumbu-x', 'sumbu-y', 'titik-asal', 'garis-y-x', 'garis-y-neg-x', 'garis-x-h', 'garis-y-k'$$;
COMMENT ON COLUMN subtopic_progress.steps_completed IS $$InquiryStep.id[] — string[] of completed step IDs, e.g. ["step1","step2"]$$;
COMMENT ON COLUMN subtopic_progress.observations IS $$number[] — indices of confirmed observations, e.g. [0,1]$$;

CREATE INDEX idx_subtopic_progress_user      ON subtopic_progress(user_id);
CREATE INDEX idx_subtopic_progress_module    ON subtopic_progress(module);
CREATE INDEX idx_subtopic_progress_lookup    ON subtopic_progress(user_id, module, subtopic);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE subtopic_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own progress"
  ON subtopic_progress FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 3. QUIZ RESULTS — per-attempt quiz scores with full answer history
-- ============================================================================
CREATE TABLE quiz_results (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module           TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),

  score            INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  total_questions  INTEGER NOT NULL CHECK (total_questions > 0),

  -- [{question_id, answer, correct, time_spent_ms, feedback}]
  answers          JSONB NOT NULL DEFAULT '[]'::jsonb,

  ai_feedback      TEXT,                    -- overall AI-generated feedback text
  completed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  quiz_results              IS $$Per-attempt quiz results with full answer history$$;
COMMENT ON COLUMN quiz_results.answers IS $$JSON array of answer objects: [{question_id: string, answer: string, correct: boolean, time_spent_ms: number, feedback?: string}]$$;
COMMENT ON COLUMN quiz_results.ai_feedback  IS $$Overall AI-generated feedback for the attempt$$;

CREATE INDEX idx_quiz_results_user     ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_module   ON quiz_results(module);
CREATE INDEX idx_quiz_results_completed ON quiz_results(completed_at DESC);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own quiz results"
  ON quiz_results FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 4. LAB BATIK CREATIONS — saved sandbox artwork
-- ============================================================================
CREATE TABLE batik_creations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name             TEXT,
  canvas_data      JSONB NOT NULL,          -- {stamps, positions, colors, transforms}
  thumbnail_url    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  batik_creations            IS $$User-created Lab Batik artwork$$;
COMMENT ON COLUMN batik_creations.canvas_data IS $$JSON — {stamps: BatikStamp[], gridSettings: GridConfig, background: string}$$;

CREATE INDEX idx_batik_creations_user ON batik_creations(user_id);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE batik_creations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own creations"
  ON batik_creations FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 5. CHAT MESSAGES — AI scaffolding conversation history
-- ============================================================================
CREATE TABLE chat_messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id       TEXT NOT NULL,
  role             TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content          TEXT NOT NULL,
  context_page     TEXT,                    -- current subtopic or route
  metadata         JSONB,                   -- optional: token count, model, latency
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  chat_messages              IS $$AI scaffolding chat history per user session$$;
COMMENT ON COLUMN chat_messages.role IS $$'user' | 'assistant' | 'system'$$;
COMMENT ON COLUMN chat_messages.context_page IS $$Current page route or subtopic ID for context-aware AI$$;

CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_user    ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at ASC);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own chat messages"
  ON chat_messages FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 6. PAGE CONTENT (optional) — stores curriculum data for all 10 subtopics
--    If seeded, allows admin editing without code deployment.
-- ============================================================================
CREATE TABLE page_content (
  id               TEXT PRIMARY KEY,         -- matches PageContent.id
  module           TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),
  sort_order       INTEGER NOT NULL,        -- display ordering within module

  -- Content fields (mirrors PageContent interface)
  title            TEXT NOT NULL,
  batik_concept    TEXT NOT NULL,
  batik_description TEXT NOT NULL,
  interactive_title TEXT NOT NULL,
  instructions     JSONB NOT NULL DEFAULT '[]'::jsonb,      -- string[]
  geogebra_url     TEXT,                                    -- optional GeoGebra embed
  inquiry_steps    JSONB NOT NULL DEFAULT '[]'::jsonb,      -- InquiryStep[]
  observations     JSONB NOT NULL DEFAULT '[]'::jsonb,      -- string[]
  matrix_formula   TEXT NOT NULL,                            -- LaTeX string
  matrix_explanation TEXT NOT NULL,

  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  page_content    IS $$Static curriculum data for each subtopic page. Seeded at deploy time or edited via admin UI.$$;
COMMENT ON COLUMN page_content.instructions IS $$string[] — step-by-step instructions for the interactive$$;
COMMENT ON COLUMN page_content.inquiry_steps IS $$InquiryStep[] — [{id: string, text: string}]$$;
COMMENT ON COLUMN page_content.observations IS $$string[] — observable facts listed for the student$$;

CREATE INDEX idx_page_content_module ON page_content(module, sort_order);

-- ── RLS (public read-only; data is seeded, not user-writable) ──────────────
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page content"
  ON page_content FOR SELECT
  USING (TRUE);

-- ============================================================================
-- SEED: Page Content — translasi
-- ============================================================================
INSERT INTO page_content (id, module, sort_order, title, batik_concept, batik_description, interactive_title, instructions, inquiry_steps, observations, matrix_formula, matrix_explanation) VALUES
(
  'titik', 'translasi', 1,
  'Translasi Titik (Motif Kawung)',
  'Geser Titik Pusat Batik Kawung',
  'Batik Kawung memiliki motif menyerupai buah kelapa (kolang-kaling) yang disusun rapi dalam pola geometris melingkar. Pergeseran pola (Translasi) dari satu titik pusat ke titik pusat berikutnya merepresentasikan pergeseran konstan [a, b].',
  'Eksplorasi Pergeseran Titik Pusat (a, b)',
  '["Perhatikan posisi mula-mula titik pusat motif Kawung A = (2, 3).","Seret slider pergeseran horizontal (a) sebesar 4, dan pergeseran vertikal (b) sebesar -2.","Amati koordinat titik bayangan baru A'' yang terbentuk."]'::jsonb,
  '[{"id":"step1","text":"Tentukan posisi awal titik A(x, y) pada sumbu Kartesius."},{"id":"step2","text":"Geser titik sejauh a satuan mendatar dan b satuan vertikal."},{"id":"step3","text":"Hitung posisi akhir dengan rumus penjumlahan: x'' = x + a dan y'' = y + b."},{"id":"step4","text":"Validasikan hasil perhitungan dengan bayangan A'' pada simulasi."}]'::jsonb,
  '["Titik bergeser ke kanan jika nilai pendorong horizontal (a) positif.","Titik bergeser ke bawah jika nilai pendorong vertikal (b) negatif.","Tidak ada perubahan ukuran atau bentuk objek batik, hanya posisi koordinatnya."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} x \\ y \end{pmatrix} + \begin{pmatrix} a \\ b \end{pmatrix}',
  'Titik bayangan didapatkan dengan menjumlahkan koordinat mula-mula dengan vektor translasi T[a, b].'
),
(
  'garis', 'translasi', 2,
  'Translasi Garis (Motif Parang Rusak)',
  'Kemiringan Garis Diagonal Parang',
  'Batik Parang memiliki ciri khas garis lurus diagonal konstan yang berulang. Translasi pada garis batas lereng Parang memindahkan setiap titik pada garis y = mx + c sejauh [a, b] menghasilkan garis sejajar baru.',
  'Translasi Garis Diagonal Parang Rusak',
  '["Diberikan persamaan garis lereng batik Parang: y = x - 1.","Terapkan translasi T = [3, 2].","Amati perpindahan garis lama ke posisi garis baru yang tetap sejajar."]'::jsonb,
  '[{"id":"step1","text":"Pilih dua titik sembarang pada garis y = mx + c."},{"id":"step2","text":"Terapkan pergeseran [a, b] pada kedua titik tersebut."},{"id":"step3","text":"Hubungkan kedua titik bayangan baru untuk membentuk garis baru."},{"id":"step4","text":"Substitusikan hubungan x'' = x+a dan y'' = y+b ke persamaan awal."}]'::jsonb,
  '["Koefisien kemiringan (gradien) garis bayangan tetap sama dengan garis mula-mula.","Dua garis (awal dan bayangan) membentuk garis-garis sejajar yang tidak akan pernah saling berpotongan.","Representasi visual garis sejajar ini mirip dengan jajaran baris motif Parang."]'::jsonb,
  'y'' - b = m(x'' - a) + c \\implies y'' = m(x'' - a) + b + c',
  'Garis baru didapatkan dengan mensubstitusi x = x'' - a dan y = y'' - b ke persamaan asal.'
),
(
  'bangun', 'translasi', 3,
  'Translasi Bangun (Motif Megamendung)',
  'Perulangan Pola Awan Megamendung',
  'Batik Megamendung dari Cirebon melambangkan awan pembawa hujan. Bentuk awan melingkar berlapis yang berulang dengan ukuran bervariasi dapat dipahami sebagai pergeseran struktur bidang koordinat tertutup.',
  'Pergeseran Pola Awan Megamendung',
  '["Amati bidang segitiga/poligon pembentuk modul awan Megamendung dengan titik sudut P, Q, R.","Geser seluruh modul tersebut dengan vektor translasi [5, 3].","Periksa apakah seluruh titik sudut bergeser sama jauh dan searah."]'::jsonb,
  '[{"id":"step1","text":"Catat seluruh titik koordinat sudut bidang poligon pembentuk awan."},{"id":"step2","text":"Tambahkan nilai translatif [a, b] untuk masing-masing titik koordinat secara merata."},{"id":"step3","text":"Gambar ulang bidang bayangan dengan menghubungkan koordinat bayangan baru."},{"id":"step4","text":"Cocokkan luas dan bentuk bidang awal dengan hasil translasi."}]'::jsonb,
  '["Bentuk dan luas bidang awan Megamendung sebelum dan sesudah translasi adalah KONGRUEN (sama persis).","Semua vektor yang menghubungkan titik asal ke titik bayangan berbentuk sejajar dan memiliki panjang yang sama.","Posisi orientasi (arah menghadap bidang) tidak mengalami perubahan."]'::jsonb,
  '\text{Poligon}'' = \{ (x_i + a, y_i + b) \mid \forall i \in \text{Sudut} \}',
  'Setiap verteks poligon digeser sejauh vektor T secara simultan.'
);

-- ============================================================================
-- SEED: Page Content — refleksi
-- ============================================================================
INSERT INTO page_content (id, module, sort_order, title, batik_concept, batik_description, interactive_title, instructions, inquiry_steps, observations, matrix_formula, matrix_explanation) VALUES
(
  'sumbu-x', 'refleksi', 1,
  'Refleksi terhadap Sumbu X (Motif Kawung)',
  'Pencerminan Vertikal Ornamen Kawung',
  'Motif Kawung memiliki simetri lipat horizontal dan vertikal. Pencerminan terhadap sumbu X menghasilkan bagian bawah motif yang simetris dari bagian atasnya.',
  'Refleksi Ornamen Kawung terhadap Sumbu X (Garis cermin y = 0)',
  '["Tempatkan titik ornamen atas Kawung A = (3, 4).","Lakukan pencerminan terhadap sumbu X.","Perhatikan bayangan titik A'' berada di posisi (3, -4) dengan jarak vertikal yang sama ke sumbu X."]'::jsonb,
  '[{"id":"step1","text":"Tentukan jarak tegak lurus dari titik asal ke sumbu X."},{"id":"step2","text":"Pindahkan bayangan ke sisi seberang sumbu X dengan jarak pencerminan yang sama."},{"id":"step3","text":"Simpulkan perubahan tanda dari absis (x) dan ordinat (y)."}]'::jsonb,
  '["Nilai absis (x) tetap tidak berubah.","Nilai ordinat (y) berganti tanda menjadi negatifnya (-y).","Garis hubung AA'' memotong tegak lurus Sumbu X pada titik (x, 0)."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}',
  'Matriks Transformasi Refleksi Sumbu X adalah [[1, 0], [0, -1]] menghasilkan koordinat bayangan (x, -y).'
),
(
  'sumbu-y', 'refleksi', 2,
  'Refleksi terhadap Sumbu Y (Motif Parang)',
  'Sisi Berseberangan Lereng Parang',
  'Pencerminan motif lereng Parang ke arah horizontal seolah mencermin kemiringan lereng berlawanan arah, mengilustrasikan refleksi geometri sempurna terhadap sumbu Y.',
  'Refleksi Lereng Parang terhadap Sumbu Y',
  '["Pilih titik acuan ornamen Parang A = (3, 2).","Cerminkan terhadap sumbu Y (garis x = 0).","Amati bayangan A'' yang menjadi (-3, 2)."]'::jsonb,
  '[{"id":"step1","text":"Ukur jarak horizontal titik A ke sumbu Y."},{"id":"step2","text":"Proyeksikan sejauh jarak tersebut ke arah negatif sumbu Y."},{"id":"step3","text":"Cermati korelasi koordinat awal (x, y) dan bayangan (x'', y'')."}]'::jsonb,
  '["Nilai ordinat (y) tetap sama tinggi.","Nilai absis (x) berubah tanda menjadi negatifnya (-x).","Arah hadap lereng batik terbalik secara lateral (kiri ke kanan)."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}',
  'Matriks Transformasi Refleksi Sumbu Y adalah [[-1, 0], [0, 1]] menghasilkan koordinat bayangan (-x, y).'
),
(
  'titik-asal', 'refleksi', 3,
  'Refleksi terhadap Titik Pusat O(0,0) (Motif Megamendung)',
  'Pusat Pusaran Megamendung',
  'Motif awan Megamendung juga memiliki harmoni melingkar. Refleksi terhadap titik pusat O(0,0) membalikkan setiap ornamen secara diagonal 180 derajat melintasi titik pusat.',
  'Pencerminan terhadap Titik Pusat O(0,0)',
  '["Letakkan titik uji awan Megamendung di kuadran I, misal A = (4, 3).","Refleksikan melintasi titik pusat O(0,0).","Amati titik bayangan A'' yang jatuh tepat di Kuadran III pada koordinat (-4, -3)."]'::jsonb,
  '[{"id":"step1","text":"Tarik garis lurus dari titik asal A melewati O(0,0)."},{"id":"step2","text":"Perpanjang garis tersebut sejauh jarak AO untuk menemukan A''."},{"id":"step3","text":"Verifikasi koordinat koordinatif bayangan di seberang diagonal."}]'::jsonb,
  '["Kedua koordinat (x dan y) sama-sama berubah tanda menjadi negatifnya.","Sama dengan melakukan rotasi 180 derajat terhadap titik pusat koordinat.","Posisi bayangan terbalik seutuhnya atas-bawah dan kiri-kanan."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}',
  'Matriks pencerminan terhadap titik asal O(0, 0) mengalikan kedua komponen koordinat dengan -1.'
),
(
  'garis-y-x', 'refleksi', 4,
  'Refleksi terhadap Garis y = x (Motif Truntum)',
  'Kemegahan Bintang Mekar Truntum',
  'Motif Truntum (bintang kecil) memiliki kerapian simetris yang tinggi. Garis y = x membentang 45 derajat membagi ornamen menjadi dua belahan simetris serasi, di mana nilai x dan y saling bertukar posisi.',
  'Pencerminan terhadap Garis Diagonal y = x',
  '["Pilih titik puncak kelopak bintang Truntum A = (1, 5).","Cerminkan terhadap garis y = x yang melintasi (1,1), (2,2), dst.","Amati posisi bayangan A'' yang menjadi (5, 1)."]'::jsonb,
  '[{"id":"step1","text":"Gambar garis y = x sebagai sumbu cermin diagonal."},{"id":"step2","text":"Tarik garis tegak lurus dari A(x, y) ke garis y = x."},{"id":"step3","text":"Ukur jarak yang sama ke seberang garis cermin untuk menemukan A''."}]'::jsonb,
  '["Nilai absis bayangan x'' sama dengan nilai ordinat awal y.","Nilai ordinat bayangan y'' sama dengan nilai absis awal x.","Koordinat bertukar tempat secara sempurna: (x, y) menjadi (y, x)."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}',
  'Matriks pencerminan terhadap garis y = x adalah [[0, 1], [1, 0]], menukarkan relasi absis dan ordinat.'
),
(
  'garis-y-neg-x', 'refleksi', 5,
  'Refleksi terhadap Garis y = -x (Motif Sidomukti)',
  'Simetri Diagonal Kontra Sidomukti',
  'Batik Sidomukti melambangkan kesejahteraan dan kemakmuran berwujud sayap/kupu-kupu simetris. Pencerminan terhadap garis y = -x membalikkan posisi bayangan sekaligus menukar tanda absis dan ordinat.',
  'Refleksi Sayap Sidomukti terhadap Garis y = -x',
  '["Pilih titik sudut sayap Sidomukti A = (2, 4).","Cerminkan terhadap garis miring y = -x.","Amati titik bayangan baru A'' di koordinat (-4, -2)."]'::jsonb,
  '[{"id":"step1","text":"Gambarkan garis cermin y = -x."},{"id":"step2","text":"Buat garis hubung tegak lurus dari titik A ke cermin."},{"id":"step3","text":"Tentukan koordinat A'' yang memenuhi pertukaran nilai dan tanda."}]'::jsonb,
  '["Koordinat bertukar tempat sekaligus berganti tanda.","X awal menjadi -Y bayangan, dan Y awal menjadi -X bayangan.","(x, y) ditransformasikan menjadi (-y, -x)."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}',
  'Matriks pencerminan terhadap garis y = -x adalah [[0, -1], [-1, 0]], menukarkan posisi disertai inversi tanda.'
),
(
  'garis-x-h', 'refleksi', 6,
  'Refleksi terhadap Garis x = h (Motif Sekar Jagad)',
  'Pembatas Ornamen Sekar Jagad',
  'Batik Sekar Jagad menggambarkan keanekaragaman pulau-pulau yang dipisahkan garis batas berliku meliuk. Garis vertikal tegak x = h bertindak selaku cermin geser koordinatif horizontal.',
  'Pencerminan terhadap Garis Vertikal x = h',
  '["Tentukan garis pembatas vertikal, misal x = 3 (h = 3).","Pilih titik pulau Sekar Jagad A = (1, 2).","Refleksikan dan amati hasil bayangan A'' di posisi (5, 2)."]'::jsonb,
  '[{"id":"step1","text":"Tentukan garis x = h sejajar sumbu Y."},{"id":"step2","text":"Hitung jarak horizontal d dari titik x ke h: d = h - x."},{"id":"step3","text":"Tentukan koordinat baru x'' dengan menambahkan d ke h: x'' = h + (h - x) = 2h - x."},{"id":"step4","text":"Pastikan koordinat y tetap tidak berubah."}]'::jsonb,
  '["Koordinat ordinat (y) tidak berubah karena pergeseran cermin hanya horisontal.","Sumbu simetri berada tepat di tengah-tengah antara titik asal dan bayangan.","Bayangan bergeser seiring perubahan nilai parameter pembatas h."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} + \begin{pmatrix} 2h \\ 0 \end{pmatrix}',
  'Translasi non-homogen: absis bayangan x'' = 2h - x dan ordinat bayangan y'' = y.'
),
(
  'garis-y-k', 'refleksi', 7,
  'Refleksi terhadap Garis y = k (Motif Gentongan)',
  'Sumbu Air Wadah Gentongan',
  'Batik Gentongan Madura menampilkan wadah gentong air tradisional yang sangat anggun. Garis horisontal sejajar sumbu X (y = k) merepresentasikan riak permukaan air seimbang yang memantulkan ornamen di atasnya.',
  'Pencerminan terhadap Garis Horisontal y = k',
  '["Tentukan garis pembatas permukaan air y = 2 (k = 2).","Pilih ornamen Gentongan di atas air A = (3, 5).","Pantulkan terhadap y = 2, sehingga bayangannya A'' tercatat di (3, -1)."]'::jsonb,
  '[{"id":"step1","text":"Tentukan nilai k untuk garis batas horisontal y = k."},{"id":"step2","text":"Hitung jarak vertikal dari titik awal y ke k."},{"id":"step3","text":"Terapkan transformasi koordinat vertikal: y'' = 2k - y."},{"id":"step4","text":"Biarkan koordinat absis x tetap konstan."}]'::jsonb,
  '["Koordinat absis (x) tidak mengalami perubahan posisional.","Tinggi ordinat bayangan berbanding lurus dengan nilai 2k dikurangi ketinggian y mula-mula.","Cermin horizontal membalik orientasi arah vertikal atas-bawah."]'::jsonb,
  '\begin{pmatrix} x'' \\ y'' \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} + \begin{pmatrix} 0 \\ 2k \end{pmatrix}',
  'Translasi non-homogen: absis bayangan x'' = x dan ordinat bayangan y'' = 2k - y.'
);

-- ============================================================================
-- HELPER VIEWS
-- ============================================================================

-- Per-module progress summary for the student dashboard
CREATE OR REPLACE VIEW student_module_progress AS
SELECT
  sp.user_id,
  sp.module,
  COUNT(*)::integer                                           AS total_subtopics,
  COUNT(*) FILTER (WHERE sp.completed)::integer               AS completed_subtopics,
  ROUND(COUNT(*) FILTER (WHERE sp.completed)::numeric / GREATEST(COUNT(*)::numeric, 1) * 100)::integer AS progress_pct,
  SUM(sp.time_spent_ms)::integer                              AS total_time_ms,
  MAX(sp.updated_at)                                          AS last_activity
FROM subtopic_progress sp
GROUP BY sp.user_id, sp.module;

COMMENT ON VIEW student_module_progress IS 'Aggregated progress per (user, module) for dashboard display';

-- Latest quiz score per module (most recent attempt)
CREATE OR REPLACE VIEW student_latest_quiz AS
SELECT DISTINCT ON (qr.user_id, qr.module)
  qr.user_id,
  qr.module,
  qr.score,
  qr.total_questions,
  qr.completed_at
FROM quiz_results qr
ORDER BY qr.user_id, qr.module, qr.completed_at DESC;

COMMENT ON VIEW student_latest_quiz IS 'Most recent quiz attempt per (user, module)';
