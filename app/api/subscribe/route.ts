import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, utm_source, utm_medium, utm_campaign } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('email_subscribers').insert({
      email:        email.toLowerCase().trim(),
      signup_source: source ?? 'unknown',
      utm_source:   utm_source ?? null,
      utm_medium:   utm_medium ?? null,
      utm_campaign: utm_campaign ?? null,
    })

    if (error) {
      // Unique constraint = already subscribed — treat as success
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: "You're already on the list!" })
      }
      console.error('[subscribe] Supabase error:', error.message)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Thanks! Check your inbox.' })
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
