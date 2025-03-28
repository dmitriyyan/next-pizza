import { User } from '@prisma/client';
import { api } from './instance';
import { ApiRoutes } from './constants';

export const getMe = async () => {
  const response = await api.get<User>(ApiRoutes.AUTH_ME);

  return response.json();
};
