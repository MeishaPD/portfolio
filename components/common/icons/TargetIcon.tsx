const GradientStrokeTargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4 h-4 lg:w-5 lg:h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E22AA" />
        <stop offset="100%" stopColor="#E5005A" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#targetGradient)" />
    <circle cx="12" cy="12" r="6" stroke="url(#targetGradient)" />
    <circle cx="12" cy="12" r="2" stroke="url(#targetGradient)" />
  </svg>
)

export default GradientStrokeTargetIcon
