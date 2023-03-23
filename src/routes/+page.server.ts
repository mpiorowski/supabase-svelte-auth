import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    let profile = null;
    if (session) {
        const data = await supabase
            .from("profiles")
            .select(`username, full_name, website, avatar_url`)
            .eq("id", session.user.id)
            .single();
        profile = data.data;
    }

    return { session, profile };
}) satisfies PageServerLoad;

export const actions = {
    update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const fullName = formData.get("fullName") as string;
        const username = formData.get("username") as string;
        const website = formData.get("website") as string;

        const session = await getSession();

        const { error } = await supabase.from("profiles").upsert({
            id: session?.user.id,
            full_name: fullName,
            username,
            website,
            updated_at: new Date(),
        });

        if (error) {
            return fail(500, {
                fullName,
                username,
                website,
            });
        }

        return {
            fullName,
            username,
            website,
        };
    },
    updateAvatar: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const avatar = formData.get("avatar");
        const session = await getSession();
        const userId = session?.user.id;

        if (!(avatar instanceof File) || avatar.size === 0) {
            throw error(400, "Invalid request");
        }

        if (!userId) {
            throw new Error("You must be logged in to upload an image.");
        }
        const fileExt = avatar.name.split(".").pop();
        const url = `${Math.random()}.${fileExt}`;

        const response = await supabase.storage
            .from("avatars")
            .upload(url, avatar);

        await supabase
            .from("profiles")
            .update({ avatar_url: response.data?.path })
            .eq("id", userId);

        if (response.error) {
            return fail(500, {
                avatarName: avatar.name,
            });
        }

        return {
            success: true,
        };
    },
    signout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut();
        throw redirect(303, "/logging-in");
    },
} satisfies Actions;
