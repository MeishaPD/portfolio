import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 transition-colors duration-300 ease-in-out flex rounded-2xl bg-linear-to-tr from-gray-950 to-gray-600 hover:from-[#FE4409] hover:to-[#FFDACE] from-55% text-sm text-gray-50 items-center justify-center drop-shadow-lg drop-shadow-gray-500"
      >
        Go Back
      </Link>
    </div>
  )
}
