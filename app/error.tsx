'use client'

import React from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-8">Something went wrong!</h2>
            <p className="text-gray-500 mb-8">We apologize for the inconvenience.</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Try again
                </button>
                <Link href="/" className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                    Go back home
                </Link>
            </div>
        </div>
    );
}
