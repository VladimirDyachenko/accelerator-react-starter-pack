import { commerce, datatype, internet, unique } from 'faker';
import { Guitar, GuitarType } from 'types/types';

export const generateGuitarMock = (): Guitar => ({
  id: unique(datatype.number),
  name: commerce.productName(),
  vendorCode: commerce.product(),
  type: GuitarType.Acoustic,
  description: commerce.productDescription(),
  previewImg: internet.avatar(),
  stringCount: 4,
  rating: datatype.number(5),
  price: datatype.number(150_000),
  comments: [],
});
