// File: components/Background/Background.tsx

export default function Background() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background: "linear-gradient(270deg, #d3d3d3, #4b4b4b)", // light grey → dark grey
      }}
    ></div>
  );
}