import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p>That page doesn't exist. Let's get you back on track.</p>
      <Link to="/">Go home</Link>
    </div>
  )
}
