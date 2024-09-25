import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Create a response object based on the incoming request
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialize Supabase server client
  const supabase = createServerComponentClient({
    cookies: () => request.cookies,
  })

  // Perform Supabase authentication (e.g., get the current user session)
  const { data: user, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user:', error)
    // Handle error if needed, e.g., return a different response
  }

  // Return the modified response (if any cookies were set or removed)
  return response
}
