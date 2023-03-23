<script lang="ts">
    import type { SupabaseClient } from "@supabase/supabase-js";

    export let size = 10;
    export let supabase: SupabaseClient;
    export let avatarPath: string;

    let avatarUrl = "";

    let uploading = false;
    let form: HTMLFormElement;

    const downloadImage = async (path: string) => {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);
            if (error) {
                throw error;
            }
            avatarUrl = URL.createObjectURL(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error downloading image: ", error.message);
            }
        }
    };

    const uploadAvatar = async () => {
        form.submit();
    };

    $: if (avatarPath) downloadImage(avatarPath);
</script>

<div>
    {#if avatarUrl}
        <img
            src={avatarUrl}
            alt={avatarUrl ? "Avatar" : "No image"}
            class="avatar image"
            style="height: {size}em; width: {size}em;"
        />
    {:else}
        <div
            class="avatar no-image"
            style="height: {size}em; width: {size}em;"
        />
    {/if}

    <div style="width: {size}em;">
        <form
            action="?/updateAvatar"
            method="post"
            bind:this={form}
            enctype="multipart/form-data"
        >
            <label class="button primary block" for="avatar">
                {uploading ? "Uploading ..." : "Upload"}
            </label>
            <input
                style="visibility: hidden; position:absolute;"
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                on:change={uploadAvatar}
                disabled={uploading}
            />
        </form>
    </div>
</div>
