import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
)

export async function getConnection(){
    return supabase;
}

export async function getUserId(){
    return sessionStorage.getItem("userId");
}