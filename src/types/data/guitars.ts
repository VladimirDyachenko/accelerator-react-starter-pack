import { Comment } from './comment';

export enum GuitarType {
  Electric = 'electric',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele',
}

export type StringsCount = 4 | 6 | 7 | 12;

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: StringsCount;
  rating: number;
  price: number;
  comments: Comment[];
};
