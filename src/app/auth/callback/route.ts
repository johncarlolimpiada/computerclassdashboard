import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getURL } from '@/lib/utils/url'


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    console.log('Exchange code for session:', code)
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (err) {
              console.error('Error setting cookies in callback:', err)
            }
          },
        },
      }
    )
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Auth error in callback:', error.message)
      return NextResponse.redirect(`${getURL()}/login?error=${encodeURIComponent(error.message)}`)
    }
  } else {
    console.warn('No code found in callback URL')
  }

  // URL to redirect to after sign in process completes
  // We construct a clean URL to ensure the 'code' parameter is removed from the browser address bar
  const nextUrl = new URL('/', getURL())
  return NextResponse.redirect(nextUrl)
}
