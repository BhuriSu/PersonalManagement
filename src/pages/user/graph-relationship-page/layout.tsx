import './WhiteBoard.css';
import '@fontsource/montserrat'; 

export const metadata = {
  title: 'Roughly',
  description: 'Whiteboard with hand-drawn, sketchy look',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light">
      <body>
        {children}
      </body>
    </html>
  );
}