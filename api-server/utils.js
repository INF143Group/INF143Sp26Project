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

export function validateToken(req){
    let auth = req.headers.authorization;
        if (auth?.split(" ").length !== 2 || auth.split(" ")[0] !== "Bearer"){
            return null;
        }
        let token = auth.split(" ")[1]
        return token;
}

export async function getUserId(){
    return sessionStorage.getItem("userId");
}