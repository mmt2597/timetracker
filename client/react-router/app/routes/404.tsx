import { useLocation } from "react-router";

export default function NotFound() {
  const location = useLocation();

  // Silently ignore well-known paths (used by browsers/dev tools)
  if (location.pathname.startsWith("/.well-known")) {
    return null;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  );
}
