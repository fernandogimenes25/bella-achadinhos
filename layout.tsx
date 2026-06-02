import "./globals.css";

export const metadata = {
  title: "Bella Achadinhos",
  description: "Achadinhos premium da Shopee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
