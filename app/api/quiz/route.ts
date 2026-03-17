import { NextRequest, NextResponse } from 'next/server'
import { createClient }              from '@/lib/supabase/server'
import { computeRiskResult }         from '@/lib/quiz'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, pet_type, pet_age, dog_size, zip_code } = body

    if (!email || !pet_type || !pet_age) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = await createClient()

    // Store quiz submission
    const { error: quizError } = await supabase.from('quiz_submissions').insert({
      email:    email.toLowerCase().trim(),
      pet_type,
      pet_age,
      dog_size: dog_size ?? null,
      zip_code: zip_code ?? null,
    })

    if (quizError) {
      console.error('[quiz] Supabase insert error:', quizError.message)
      // Continue — don't block the user from seeing their results
    }

    // Also add to email_subscribers (upsert — won't duplicate existing emails)
    await supabase.from('email_subscribers').upsert(
      { email: email.toLowerCase().trim(), signup_source: 'quiz' },
      { onConflict: 'email', ignoreDuplicates: true },
    )

    // Compute personalised risk result (business logic lives in lib/quiz.ts)
    const result = computeRiskResult({ pet_type, pet_age, dog_size: dog_size ?? null })

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('[quiz] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
