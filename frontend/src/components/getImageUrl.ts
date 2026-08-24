import Foto from '@/assets/dummy.jpg';

export const getImageUrl = (path?: string) => {
  return path ? `/storage/${path}` : Foto;
};
