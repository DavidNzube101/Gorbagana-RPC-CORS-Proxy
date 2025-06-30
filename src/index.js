/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const target = 'https://rpc.gorbagana.wtf' + url.pathname + url.search;

		// Only allow POST and OPTIONS (for Solana JSON-RPC)
		if (!['POST', 'OPTIONS'].includes(request.method)) {
			return new Response('Only POST and OPTIONS allowed', { status: 405 });
		}

		// Forward the request
		const response = await fetch(target, {
			method: request.method,
			headers: request.headers,
			body: request.method === 'POST' ? await request.text() : undefined,
		});

		// Clone and add CORS headers
		const newHeaders = new Headers(response.headers);
		newHeaders.set('Access-Control-Allow-Origin', '*');
		newHeaders.set('Access-Control-Allow-Headers', '*');
		newHeaders.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders,
		});
	}
};
