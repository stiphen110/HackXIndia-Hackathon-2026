import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Suvidha Sahayak. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground max-w-md">
          Disclaimer: This is a demonstrative project. Information provided may not be accurate or up-to-date. Always consult official government sources.
        </p>
      </div>
    </footer>
  );
}
