import React from 'react';
import { ToolBar } from './components/ToolBar';
const RoughCanvasNoSSR = React.lazy(() => import('./components/RoughCanvas'));

import styles from './WhiteBoard.module.css'; // Import the CSS module

export default function WhiteBoard() {
  return (
    <main className={styles.mainContainer}>
      <RoughCanvasNoSSR />
      <ToolBar />
    </main>
  );
}