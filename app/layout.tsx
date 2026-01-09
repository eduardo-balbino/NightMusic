import './styles/globals.css';
import './styles/style.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'NightMusic',
  description: 'NightMusic - player',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
