export enum GuitarType {
  Electric = 'electric',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele',
}

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: 4 | 6 | 7 | 12;
  rating: number;
  price: number;
};
