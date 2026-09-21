import DishCard from "./components/DishCard";

const dishes = [
    {
        id: "kitfo",
        name: "Kitfo",
        price: 350,
        category: "Traditional",
        icon: "🥩",
        description:
            "Minced beef seasoned with Ethiopian spices and served with traditional sides.",
    },
    {
        id: "doro-wot",
        name: "Doro Wot",
        price: 400,
        category: "Traditional",
        icon: "🍗",
        description:
            "Spicy chicken stew cooked with berbere, onions, and Ethiopian spices.",
    },
    {
        id: "tibs",
        name: "Beef Tibs",
        price: 380,
        category: "Traditional",
        icon: "🥘",
        description:
            "Tender beef sautéed with onions, peppers, herbs, and Ethiopian spices.",
    },
    {
        id: "shiro",
        name: "Shiro",
        price: 250,
        category: "Vegetarian",
        icon: "🍲",
        description:
            "Smooth chickpea stew cooked with spices and served with fresh injera.",
    },
    {
        id: "pizza",
        name: "Addis Pizza",
        price: 450,
        category: "Fast Food",
        icon: "🍕",
        description:
            "Freshly baked pizza with cheese, vegetables, and your favorite toppings.",
    },
    {
        id: "burger",
        name: "Addis Burger",
        price: 300,
        category: "Fast Food",
        icon: "🍔",
        description:
            "Juicy beef burger with fresh vegetables and our special house sauce.",
    },
];

export default function MenuPage() {
    return (
        <main className="menu-page">
            <section className="page-header">
                <h1>Our Menu</h1>

                <p>
                    Fresh flavors from Addis, made for you.
                </p>
            </section>

            <div className="menu-grid">
                {dishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </main>
    );
}