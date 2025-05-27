import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Implement actual authentication logic
    // For now, return a mock response
    if (email === 'test@example.com' && password === 'password') {
      return NextResponse.json({
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
      })
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    )
  }
} 