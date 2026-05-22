import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rtyabxvdzmgguaqbwhfd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0eWFieHZkem1nZ3VhcWJ3aGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTgzMjQsImV4cCI6MjA5MzY3NDMyNH0.MXJazj2pO1nZZKbRtOtS3XkDNSRCb4swCoJeRfGriPY' // paste your full anon key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey)