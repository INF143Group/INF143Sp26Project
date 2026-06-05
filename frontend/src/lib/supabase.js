import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getCurrentUserInfo() {
    const { data: { user } } = await supabase.auth.getUser()

    const Username = await supabase
    .from("users")
    .select("display_name")
    .eq("user_id", user?.id)
    .single();

    return {"email": user?.email, "id": user?.id, "username": Username.data?.display_name};
}