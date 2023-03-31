<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { browser } from "$app/environment";
    import {
        PUBLIC_SUPABASE_ANON_KEY,
        PUBLIC_SUPABASE_URL,
    } from "$env/static/public";
    import type { Database } from "$lib/database.types";
    import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { PageData } from "./$types";

    export let data: PageData;
    export let email: string;

    let supabase: SupabaseClient<Database> | undefined;
    if (browser) {
        supabase = createSupabaseLoadClient<Database>({
            supabaseUrl: PUBLIC_SUPABASE_URL,
            supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
            event: { fetch },
            serverSession: data.session,
        });
    }
</script>

<svelte:head>
    <title>User Management</title>
</svelte:head>

<div class="row flex-center flex">
    <div class="col-6 form-widget">
        <button
            class="btn btn-primary btn-block"
            on:click={() => {
                supabase?.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${data.url}/logging-in?redirect=/`,
                    },
                });
            }}
        >
            Sign in with google
        </button>
        <input
            type="text"
            name="email"
            placeholder="Email"
            bind:value={email}
        />
        <button
            class="btn btn-primary btn-block"
            on:click={async () => {
                await supabase?.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: `${data.url}/logging-in?redirect=/`,
                    },
                });
            }}
        >
            Sign in using email
        </button>
    </div>
</div>
