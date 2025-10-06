"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SwaggerUIBundle?: any;
  }
}

export default function DocsPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@4/swagger-ui.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js';
    script.async = true;
    script.onload = () => {
      if (window.SwaggerUIBundle) {
        window.SwaggerUIBundle({ url: '/api/openapi', dom_id: '#swagger' });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-white text-black dark:bg-white dark:text-black">
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/[.06]">
        <h1 className="text-lg font-semibold">API Docs</h1>
      </div>
      <div
        id="swagger"
        style={{ height: 'calc(100vh - 56px)', background: '#ffffff', overflow: 'auto', padding: '0.5rem' }}
      >
        Loading API docs…
      </div>
    </div>
  );
}
