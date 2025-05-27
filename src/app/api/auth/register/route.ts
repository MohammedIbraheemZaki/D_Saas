import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // TODO: Implement actual registration logic
    // For now, validate password length and return a mock response
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      user: {
        id: '1',
        name,
        email,
      },
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    )
  }
} 