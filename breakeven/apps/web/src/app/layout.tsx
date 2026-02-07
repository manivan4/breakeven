import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'BreakEven',
  description: 'Relationship finance toolkit for women',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
