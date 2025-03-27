import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { CheckoutForm } from '@/widgets/checkout-form/checkout-form';
import { createOrderAction } from './actions';

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <CheckoutForm onSubmitAction={createOrderAction} />
    </Container>
  );
}
