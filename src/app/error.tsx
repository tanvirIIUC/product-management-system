'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error caught by error.tsx:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>

      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
