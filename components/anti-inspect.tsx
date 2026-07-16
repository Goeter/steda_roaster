'use client';

import { useEffect } from 'react';

export function AntiInspect() {
  useEffect(() => {
    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        // F12
        e.key === 'F12' ||
        // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        // Ctrl+U (View Source)
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    // 3. Simple DevTools Detection with debugger statements (only active on development/production client)
    const handleDevToolsDetection = () => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        // DevTools is open/paused
        console.clear();
      }
    };

    let intervalId: number;
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      intervalId = window.setInterval(handleDevToolsDetection, 1000);
    }

    return () => {
      if (process.env.NODE_ENV === 'production') {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        clearInterval(intervalId);
      }
    };
  }, []);

  return null;
}
