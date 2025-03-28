import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="mt-20 mx-auto max-w-[840px] px-8">
      <div className="flex flex-col items-center gap-6">
        <div className="max-w-[445px]">
          <Title size="lg" text="Доступ запрещён" className="font-extrabold" />
          <p className="text-gray-400 text-lg">
            Данную страницу могут просматривать только авторизованные
            пользователи
          </p>
        </div>

        <Link href="/">
          <Button variant="outline" className="gap-2">
            На главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
