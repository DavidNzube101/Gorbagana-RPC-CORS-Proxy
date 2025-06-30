# Gorbagana CORS Proxy

This is a simple Node.js Express proxy that adds CORS headers to requests to the Gorbagana Solana RPC endpoint (`https://rpc.gorbagana.wtf`).

## Why?
Most public Solana RPC endpoints do **not** support browser CORS. This proxy allows your browser-based dApp to interact with Gorbagana by forwarding requests and adding the necessary CORS headers.

## Files
- `cors-proxy.js` — The Express proxy server
- `package.json` — Node.js dependencies and start script
- `vercel.json` — Vercel configuration for serverless deployment

## How to Deploy (Vercel)
1. Place all files in a folder called `cors-proxy` (already done).
2. Push this folder to a GitHub repo (or your preferred git host).
3. Go to [Vercel](https://vercel.com/) and create a new project, linking it to your repo.
4. Deploy! Vercel will detect the `vercel.json` and deploy the proxy as a serverless function.

## Usage
- Your proxy will be available at: `https://<your-vercel-project>.vercel.app`
- Set your frontend RPC URL to: `https://<your-vercel-project>.vercel.app`
- All requests will be forwarded to `https://rpc.gorbagana.wtf` with CORS headers added.

## Local Development
```bash
cd cors-proxy
npm install
node cors-proxy.js
```
Proxy will run at `http://localhost:8080`.

## Security Note
This proxy is open to all origins (`*`). For production, you may want to restrict allowed origins or add authentication. 