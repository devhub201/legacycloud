import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-6xl font-bold text-gradient-blossom mb-4">404</h1>
      <p className="text-muted-foreground mb-8">This block doesn't exist in our world.</p>
      <Link to="/" className="grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl inline-block">
        Back home
      </Link>
    </div>
  );
}
