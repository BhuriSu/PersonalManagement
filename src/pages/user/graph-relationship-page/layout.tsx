import './WhiteBoard.css';
import { cn } from './lib/utils';
import '@fontsource/montserrat'; 

const montserrat = 'montserrat';
export const metadata = {
  title: 'Roughly',
  description: 'Whiteboard with hand-drawn, sketchy look',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={cn('min-h-screen antialiased grainy', montserrat)}>
        {children}
      </body>
    </html>
  );
}
