// test/utils/testServer.js
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let serverProc;

function waitForPort(port, host = '127.0.0.1', timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const socket = net.connect(port, host);
      socket.once('connect', () => { socket.end(); resolve(); });
      socket.once('error', () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) {
          return reject(new Error(`Timed out waiting for ${host}:${port}`));
        }
        setTimeout(check, 200);
      });
    })();
  });
}

async function startServer() {
  if (serverProc && !serverProc.killed) return;

  // adjust path if your api.js is elsewhere
  const apiPath = path.join(__dirname, '..', '..', 'server', 'routes', 'api.js');
  serverProc = spawn(process.execPath, [apiPath], {
    stdio: ['ignore', 'inherit', 'inherit'],
    env: { ...process.env },
    shell: false,
  });

  serverProc.once('exit', (code) => {
    if (code !== null && code !== 0) {
      console.error(`api.js exited early with code ${code}`);
    }
  });

  await waitForPort(PORT);
}

async function stopServer() {
  if (serverProc && !serverProc.killed) {
    serverProc.kill();
  }
}

module.exports = {
  startServer,
  stopServer,
  BASE_URL,
  PORT,
};
