import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "linear-gradient(135deg, #6cb036 0%, #5a9a2d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          borderRadius: 36,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -4,
        }}
      >
        CC
      </div>
    ),
    {
      ...size,
    }
  );
}
