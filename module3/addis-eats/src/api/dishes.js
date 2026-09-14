// One fetch helper per resource. A real backend would just change the URL here —
// nothing else in the app needs to know.
export async function fetchDishes({ signal } = {}) {
  // small artificial delay so the loading state is visible in dev
  await new Promise((res) => setTimeout(res, 500))

  const response = await fetch('/dishes.json', { signal })

  if (!response.ok) {
    throw new Error(`Failed to load the menu (status ${response.status})`)
  }

  return response.json()
}

export async function fetchDishById(id, { signal } = {}) {
  const dishes = await fetchDishes({ signal })
  const dish = dishes.find((d) => d.id === id)
  if (!dish) {
    throw new Error(`No dish found with id "${id}"`)
  }
  return dish
}
