# Supabase authentication with SvelteKit SSR

## Demo
https://supabase-svelte-ssr.vercel.app

## Description

This template was build using [Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit) with some minor tweaks:

- Full page protection inside `hooks.server.ts`, which means EVERY request is checked.
- Moved image logic into server side.

## Missing environment variables

For local development You can create an .env file in root folder.

```
PUBLIC_SUPABASE_URL='supabase url'
PUBLIC_SUPABASE_ANON_KEY='supabase anon key'
```
