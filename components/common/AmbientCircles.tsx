/* Decorative background circles scattered across the viewport at low opacity.
   Rendered server-side — no JS needed. Used on the landing page. */
const positions = [
  { left: "5vw", top: "10vh", scale: 1.2 },
  { left: "80vw", top: "5vh", scale: 0.8 },
  { left: "60vw", top: "80vh", scale: 1.5 },
  { left: "20vw", top: "70vh", scale: 0.6 },
  { left: "90vw", top: "50vh", scale: 1.0 },
  { left: "40vw", top: "90vh", scale: 1.3 },
  { left: "70vw", top: "30vh", scale: 0.7 },
  { left: "10vw", top: "40vh", scale: 0.9 },
]

export function AmbientCircles() {
  return (
    <>
      {positions.map((p, i) => (
        <div
          key={i}
          className="fixed pointer-events-none opacity-[0.03]"
          style={{
            left: p.left,
            top: p.top,
            width: "300px",
            height: "300px",
            border: "8px solid black",
            borderRadius: "50%",
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </>
  )
}
