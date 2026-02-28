import React from 'react';

export default function ApiPage(): JSX.Element {
  React.useEffect(() => {
    window.location.href = '/api.html';
  }, []);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Redirecting to API Documentation...</h1>
      <p>If you are not redirected automatically, <a href="/api.html">click here</a>.</p>
    </main>
  );
}
