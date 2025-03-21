import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { TopBar } from '@/components/top-bar';
import React from 'react';
import { Filters } from '@/components/filters/filters';
import { ProductsGroupList } from '@/components/product-group-list';

const categories = [
  {
    name: 'Все',
    id: 1,
    products: [
      {
        id: 11,
        name: 'Пицца',
        imageUrl: 'https://placehold.co/215',
        ingredients: [],
        items: [
          {
            id: 111,
            price: 100,
          },
        ],
      },
    ],
  },
  {
    name: 'Мясные',
    id: 2,
    products: [
      {
        id: 21,
        name: 'Пицца',
        imageUrl: 'https://placehold.co/215',
        ingredients: [],
        items: [
          {
            id: 211,
            price: 100,
          },
        ],
      },
    ],
  },
  {
    name: 'Вегетарианские',
    id: 3,
    products: [
      {
        id: 31,
        name: 'Пицца',
        imageUrl: 'https://placehold.co/215',
        ingredients: [],
        items: [
          {
            id: 311,
            price: 100,
          },
        ],
      },
    ],
  },
  {
    name: 'Гриль',
    id: 4,
    products: [
      {
        id: 41,
        name: 'Пицца',
        imageUrl: 'https://placehold.co/215',
        ingredients: [],
        items: [
          {
            id: 411,
            price: 100,
          },
        ],
      },
    ],
  },
  {
    name: 'Острые',
    id: 5,
    products: [
      {
        id: 51,
        name: 'Пицца',
        imageUrl: 'https://placehold.co/215',
        ingredients: [],
        items: [
          {
            id: 511,
            price: 100,
          },
        ],
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <React.Suspense>
              <Filters />
            </React.Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <div key={category.id}>
                      <ProductsGroupList
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                      <div>{category.name}</div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
