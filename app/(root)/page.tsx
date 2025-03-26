import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { TopBar } from '@/features/top-bar';
import React from 'react';
import { Filters } from '@/features/filters';
import { ProductsGroupList } from '@/features/product-group-list';
import { prisma } from '@/prisma/prisma-client';

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return categories;
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[50px] lg:gap-[80px]">
          <React.Suspense>
            <Filters className="w-[180px] lg:w-[250px]" />
          </React.Suspense>

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
