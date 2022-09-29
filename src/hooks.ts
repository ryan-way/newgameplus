// Require for typeorm
import type { Handle } from '@sveltejs/kit';
import appRouter from '$lib/solver/router';
import { createTRPCHandle } from 'trpc-sveltekit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await createTRPCHandle({
    url: '/trpc',
    router: appRouter,
    event: event,
    resolve: resolve,
  });
	return response;
}
