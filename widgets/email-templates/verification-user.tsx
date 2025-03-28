import React from 'react';

type Props = {
  code: string;
};

export const VerificationUserTemplate = ({ code }: Props) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </a>
    </p>
  </div>
);
