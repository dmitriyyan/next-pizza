import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { TopBar } from '@/widgets/top-bar';
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
      <Container className="mt-6 md:mt-10">
        <div className="flex items-center justify-between">
          <Title text="Все меню" size="lg" className="font-extrabold" />
        </div>
      </Container>
      <TopBar categories={categories} />
      <Container className="mt-6 md:mt-10 pb-14">
        <div className="flex gap-10 md:gap-16">
          <React.Suspense>
            <Filters className="w-[180px] lg:w-[250px] hidden md:block" />
          </React.Suspense>

          <div className="flex-1">
            <div className="flex flex-col gap-10 md:gap-16">
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
