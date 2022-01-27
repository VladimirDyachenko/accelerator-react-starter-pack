import { datatype, date, internet, lorem } from 'faker';

export const generateCommentMock = () => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: lorem.words(5),
  disadvantage: lorem.words(5),
  comment: lorem.lines(5),
  rating: datatype.number(5),
  createAt: date.past(1).toString(),
  guitarId: datatype.number(),
});
