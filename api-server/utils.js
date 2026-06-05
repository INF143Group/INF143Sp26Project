import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'


const isDevelopment = process.env.NODE_ENV === 'development';

const supabaseUrl = isDevelopment 
    ? process.env.VITE_SUPABASE_URL 
    : process.env.SUPABASE_URL;

const supabaseKey = isDevelopment
    ? process.env.VITE_SUPABASE_SECRET_KEY
    : process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(
    supabaseUrl,
    supabaseKey
)

export async function getConnection(){
    return supabase;
}
export async function getConnectionWithToken(token){
    return createClient(
        supabaseUrl,
        supabaseKey,
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