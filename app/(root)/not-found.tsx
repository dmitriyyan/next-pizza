import { Pizza, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export const metadata = {
  title: 'Страница не найдена | Next Pizza',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 p-4 text-center">
      <div className="relative mb-6">
        <div className="flex items-center justify-center">
          <span className="text-9xl font-black text-primary">4</span>
          <div className="relative mx-1 flex items-center justify-center">
            <div className="flex justify-center items-center h-28 w-28 overflow-hidden rounded-full border-4 border-primary/20">
              <Pizza className="w-18 h-18 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <span className="text-9xl font-black text-primary">4</span>
        </div>
      </div>

      <div className="max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Упс! Похоже, этот кусочек пиццы потерялся.
        </h2>
        <p className="text-muted-foreground">
          Страница, которую вы ищете, испарилась, как последний кусок пепперони.
          Не волнуйтесь, давайте вернемся на главную.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            На главную
          </Link>
        </Button>
      </div>
    </div>
  );
}
