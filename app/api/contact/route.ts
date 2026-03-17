import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('contact_submissions').insert({
      name:    name.trim(),
      email:   email.toLowerCase().trim(),
      subject: subject ?? null,
      message: message.trim(),
    })

    if (error) {
      console.error('[contact] Supabase error:', error.message)
      return NextResponse.json({ error: 'Could not send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message sent! We\'ll reply within 2 business days.' })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
