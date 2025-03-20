import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { TopBar } from '@/components/top-bar';
import React from 'react';
import { Filters } from '@/components/filters/filters';

const categories = [
  { name: 'Все', id: 'all', products: [] },
  { name: 'Мясные', id: 'meat', products: [] },
  { name: 'Вегетарианские', id: 'vegetarian', products: [] },
  { name: 'Гриль', id: 'grill', products: [] },
  { name: 'Острые', id: 'spicy', products: [] },
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
                    // <ProductsGroupList
                    //   key={category.id}
                    //   title={category.name}
                    //   categoryId={category.id}
                    //   items={category.products}
                    // />
                    <div key={category.id}>{category.name}</div>
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
