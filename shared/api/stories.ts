import { Story as PrismaStory, StoryItem } from '@prisma/client';
import { api } from './instance';
import { ApiRoutes } from './constants';

export type Story = PrismaStory & {
  items: StoryItem[];
};

export const getAll = async () => {
  const response = await api.get<Story[]>(ApiRoutes.STORIES);

  return response.json();
};
