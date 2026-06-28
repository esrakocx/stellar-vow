import "./globals.css";

export const metadata = {
  title: "StellarVow — Milestone-Based Escrow Payments",
  description: "Secure your freelance agreements with blockchain-powered milestones on the Stellar Network.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
