import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
)

const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(5)

if (error) console.error('Error:', error)
else console.log('Users:', data)
