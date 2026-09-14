import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'

export default function Home() {
  return (
    <div className="page home">
      <h1>Addis Eats</h1>
      <p>Ethiopian home cooking, delivered across Addis Ababa.</p>
      <Link to="/menu">
        <Button>Browse the menu</Button>
      </Link>
    </div>
  )
}
