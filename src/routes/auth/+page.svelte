<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { Auth } from "@supabase/auth-ui-svelte";
    import { ThemeSupa } from "@supabase/auth-ui-shared";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>User Management</title>
</svelte:head>

<div class="row flex-center flex">
    <div class="col-6 form-widget">
        <Auth
            supabaseClient={data.supabase}
            providers={['google', 'facebook', 'twitter']}
            magicLink={true}
            onlyThirdPartyProviders={true}
            redirectTo={`${data.url}/logging-in?redirect=/`}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
        />
        <Auth
            supabaseClient={data.supabase}
            showLinks={false}
            view="magic_link"
            redirectTo={`${data.url}/logging-in?redirect=/`}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
        />
    </div>
</div>
