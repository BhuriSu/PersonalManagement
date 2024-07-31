
import './checkboard.css';

interface CheckboardProps {
  className?: string;
}

export default function Checkboard({ className }: CheckboardProps) {
  return (
    <div className={`pattern-rectangles pattern-bg-white ${className}`} />
  );
}
