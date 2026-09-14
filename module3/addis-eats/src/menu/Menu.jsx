import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { fetchDishes } from '../api/dishes.js'
import Spinner from '../ui/Spinner.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import CategoryBar from './CategoryBar.jsx'
import DishList from './DishList.jsx'

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'All'

  const { data: dishes, loading, error } = useFetch((signal) => fetchDishes({ signal }), [])

  if (loading) return <Spinner label="Loading the menu…" />
  if (error) return <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />

  const categories = ['All', ...new Set(dishes.map((d) => d.category))]
  const filtered =
    selectedCategory === 'All' ? dishes : dishes.filter((d) => d.category === selectedCategory)

  return (
    <div className="page">
      <h1>Menu</h1>
      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={(category) =>
          setSearchParams(category === 'All' ? {} : { category })
        }
      />
      {filtered.length === 0 ? (
        <p className="empty-note">No dishes in this category yet — try another one.</p>
      ) : (
        <DishList dishes={filtered} />
      )}
    </div>
  )
}
