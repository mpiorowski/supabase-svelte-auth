<!-- src/routes/+page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    export let email: string;
</script>

<svelte:head>
    <title>User Management</title>
</svelte:head>

<div class="row flex-center flex">
    <div class="col-6 form-widget">
        <button
            class="btn btn-primary btn-block"
            on:click={() => {
                data.supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${data.url}/logging-in?redirect=/`,
                    },
                });
            }}
        >
            Sign in with google
        </button>
        <input type="text" name="email" placeholder="Email" bind:value={email} />
        <button
            class="btn btn-primary btn-block"
            on:click={async () => {
                await data.supabase.auth.signInWithOtp({
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
