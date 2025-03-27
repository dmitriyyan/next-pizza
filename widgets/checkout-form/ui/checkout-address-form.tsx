'use client';

import React from 'react';
import { WhiteBlock } from './white-block';
import { AddressInput } from './address-input';
import { ErrorText } from '@/shared/ui/error-text';
import { FormTextarea } from './form-textarea';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  className?: string;
};

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
