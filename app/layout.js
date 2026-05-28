import './globals.css';

export const metadata = {
  title: 'Kairos Language Institute',
  description: 'Learn English the smart way',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
