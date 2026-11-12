import type { Dish } from './dish.types';

export const RESTAURANTS = [
    { id: 1, name: 'Yod Abyssinia' },
    { id: 2, name: 'Kategna Restaurant' },
    { id: 3, name: 'Habesha 2000' },
    { id: 4, name: 'Totot Traditional Restaurant' },
];

export const INITIAL_DISHES: Dish[] = [
    {
        id: 1,
        restaurantId: 1,
        name: 'Doro Wot',
        priceSantim: 45000,
    },
    {
        id: 2,
        restaurantId: 1,
        name: 'Kitfo',
        priceSantim: 55000,
    },
    {
        id: 3,
        restaurantId: 2,
        name: 'Tibs',
        priceSantim: 48000,
    },
    {
        id: 4,
        restaurantId: 2,
        name: 'Shiro Wot',
        priceSantim: 25000,
    },
    {
        id: 5,
        restaurantId: 3,
        name: 'Beyaynet',
        priceSantim: 35000,
    },
    {
        id: 6,
        restaurantId: 3,
        name: 'Firfir',
        priceSantim: 28000,
    },
    {
        id: 7,
        restaurantId: 4,
        name: 'Gomen Besiga',
        priceSantim: 42000,
    },
    {
        id: 8,
        restaurantId: 4,
        name: 'Dulet',
        priceSantim: 38000,
    },
];