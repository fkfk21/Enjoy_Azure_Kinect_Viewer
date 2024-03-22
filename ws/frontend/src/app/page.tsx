import { useEffect, useRef, useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

import './styles.css';
import { Button } from 'flowbite-react';

export function Page() {
  const [count, setCount] = useState(0);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket('ws://localhost:5000');
      ws.current.onopen = () => {
        console.log('connected');
      };
      ws.current.onmessage = (event) => {
        console.log('Received: ' + event.data);
      };
      ws.current.onclose = () => {
        console.log('disconnected');
      };
      ws.current.onerror = (event) => {
        console.error('WebSocket error observed:', event);
      };
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            ws.current!.send('Hello, world!');
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <button
          onClick={() => {
            fetch('/api/hello')
              .then((res) => res.json())
              .then(console.log);
          }}
        >
          fetch
        </button>
        <p className="text-blue-300 bg-red-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Button>Click me</Button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Page;
