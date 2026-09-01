// Each dish has a stable, unique id — that's what we use as the React key,
// not the array index, since the menu order might change later.
const dishes = [
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    description: 'Slow-simmered chicken in berbere sauce, hard-boiled egg.',
    price: 240,
  },
  {
    id: 'tibs',
    name: 'Tibs',
    description: 'Pan-seared beef cubes with onion, garlic, and rosemary.',
    price: 220,
  },
  {
    id: 'shiro',
    name: 'Shiro',
    description: 'Spiced chickpea stew, simmered until velvet-smooth.',
    price: 150,
  },
  {
    id: 'kitfo',
    name: 'Kitfo',
    description: 'Minced beef warmed in mitmita and niter kibbeh.',
    price: 260,
  },
  {
    id: 'gomen',
    name: 'Gomen',
    description: 'Collard greens braised with garlic and ginger.',
    price: 130,
  },
  {
    id: 'misir-wat',
    name: 'Misir Wat',
    description: 'Red lentils simmered in a deep berbere sauce.',
    price: 140,
  },
]

export default dishes
