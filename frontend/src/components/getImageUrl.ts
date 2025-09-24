import Foto from '@/assets/dummy.jpg';

export const getImageUrl = (path?:string) => {
  const baseUrl = "http://localhost:8000/storage/";
  return path ? `${baseUrl}${path}` : `${Foto}`;
};