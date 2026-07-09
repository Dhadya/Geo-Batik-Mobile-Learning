// Auth validation constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const NAME_MIN_LENGTH = 2;

// Password must contain: uppercase, lowercase, number, symbol
const PASSWORD_UPPERCASE = /[A-Z]/;
const PASSWORD_LOWERCASE = /[a-z]/;
const PASSWORD_NUMBER = /[0-9]/;
const PASSWORD_SYMBOL = /[!@#$%^&*]/;

// Validate email — empty check + format
export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email wajib diisi";
  if (!EMAIL_REGEX.test(email)) return "Format email tidak valid (misal: nama@email.com)";
  return null;
}

// Validate password — empty check + length + character variety
export function validatePassword(password: string): string | null {
  if (!password) return "Password wajib diisi";
  if (password.length < PASSWORD_MIN_LENGTH) return `Password minimal ${PASSWORD_MIN_LENGTH} karakter`;
  if (!PASSWORD_UPPERCASE.test(password)) return "Password harus mengandung huruf besar (A-Z)";
  if (!PASSWORD_LOWERCASE.test(password)) return "Password harus mengandung huruf kecil (a-z)";
  if (!PASSWORD_NUMBER.test(password)) return "Password harus mengandung angka (0-9)";
  if (!PASSWORD_SYMBOL.test(password)) return "Password harus mengandung simbol (!@#$%^&*)";
  return null;
}

// Validate name — empty check + minimum length
export function validateName(name: string): string | null {
  if (!name.trim()) return "Nama wajib diisi";
  if (name.trim().length < NAME_MIN_LENGTH) return `Nama minimal ${NAME_MIN_LENGTH} karakter`;
  return null;
}

// Map BetterAuth error messages to user-friendly Indonesian text
export function mapLoginError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid") || lower.includes("credentials") || lower.includes("password")) {
    return "Email atau password salah";
  }
  if (lower.includes("not found") || lower.includes("user")) {
    return "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
  }
  if (lower.includes("too many") || lower.includes("rate") || lower.includes("percobaan")) {
    return "Terlalu banyak percobaan. Coba lagi dalam beberapa menit.";
  }
  if (lower.includes("oauth") || lower.includes("google")) {
    return "Gagal masuk dengan Google. Silakan coba lagi.";
  }
  return message || "Gagal masuk. Silakan coba lagi.";
}

// Map BetterAuth registration errors to user-friendly Indonesian text
export function mapRegisterError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already") || lower.includes("exists") || lower.includes("unique")) {
    return "Email sudah terdaftar. Silakan gunakan email lain atau masuk.";
  }
  if (lower.includes("password")) {
    return "Password terlalu lemah. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.";
  }
  if (lower.includes("email")) {
    return "Format email tidak valid (misal: nama@email.com)";
  }
  return message || "Gagal mendaftar. Silakan coba lagi.";
}
