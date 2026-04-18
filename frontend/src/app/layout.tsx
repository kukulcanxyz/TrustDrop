import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/providers/web3-provider';

export const metadata: Metadata = {
  title: 'TrustDrop',
  description: 'Programmable commitments on Monad',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
