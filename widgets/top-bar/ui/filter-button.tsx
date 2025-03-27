import { Filters } from '@/features/filters';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { Filter } from 'lucide-react';

export const FilterButton = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button
          className="px-4 py-3 font-bold h-full"
          variant="secondary"
          aria-label="Открыть фильтры"
        >
          <Filter className="h-6 w-6 mr-1" />
          <span className="inline text-base">Фильтры</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-6 py-10 bg-white overflow-scroll">
        <SheetTitle hidden>Фильтры</SheetTitle>
        <SheetDescription hidden>Фильтрация товаров</SheetDescription>
        <div className="flex flex-col gap-6">
          <Filters className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
