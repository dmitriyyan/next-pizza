import { Title } from '@/shared/ui/title';
import { CheckoutForm } from '@/widgets/checkout-form/checkout-form';
import { createOrderAction } from './actions';

export default function CheckoutPage() {
  return (
    <>
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 mt-10 text-2xl md:text-3xl text-center"
      />
      <CheckoutForm onSubmitAction={createOrderAction} />
    </>
  );
}
