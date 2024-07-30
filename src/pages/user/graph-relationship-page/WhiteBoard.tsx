import React from 'react';
import { ToolBar } from './components/ToolBar';
const RoughCanvasNoSSR = React.lazy(() => import('./components/RoughCanvas'));

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <RoughCanvasNoSSR />
      <ToolBar />
    </main>
  );
}