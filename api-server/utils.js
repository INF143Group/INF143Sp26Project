import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
)

export async function getConnection(){
    return supabase;
}
export async function getConnectionWithToken(token){
    return createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY,
        {global: {headers: {
                Authorization: "Bearer " + token
        }}}
    )
}

export async function getUserId(){
    return sessionStorage.getItem("userId");
}