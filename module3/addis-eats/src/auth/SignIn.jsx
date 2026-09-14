import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'
import Button from '../ui/Button.jsx'

export default function SignIn() {
  const [name, setName] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    signIn(name.trim())
    navigate(from, { replace: true })
  }

  return (
    <div className="page">
      <h1>Sign in</h1>
      <p>Sign in to continue to checkout.</p>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Selam"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  )
}
