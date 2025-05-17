import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-6 text-center">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
}