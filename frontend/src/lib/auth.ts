// TODO: Google OAuth helper (redirect ke /auth/google)
export function redirectToGoogle() {
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`
}
