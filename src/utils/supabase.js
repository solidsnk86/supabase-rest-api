const { createClient } = require('@supabase/supabase-js')

const { SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY } = process.env

const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY)

module.exports = { supabase }
