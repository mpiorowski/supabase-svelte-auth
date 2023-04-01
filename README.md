# Supabase authentication with SvelteKit SSR

## Demo
https://supabase-svelte-ssr.vercel.app

## Description

This template was build using [Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit) with some minor tweaks:

- Moved image logic into server side.

## Missing environment variables

For local development You can create an .env file in root folder.

```
SERVICE_ACCOUNT='service account key object parsed as string'
PUBLIC_API_KEY='firebase client api key'
PUBLIC_AUTH_DOMAIN='firebase client auth domain'
```
