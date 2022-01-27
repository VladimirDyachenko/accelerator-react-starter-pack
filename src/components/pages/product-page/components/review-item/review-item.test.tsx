import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {

  it('should render ReviewItem correctly', () => {

    render(
      <ReviewItem
        review={{
          id: 'some-id',
          userName: 'userName',
          advantage: 'advantage',
          disadvantage: 'disadvantage',
          comment: 'comment',
          rating: 10,
          createAt: '2021-12-27T06:09:26.005Z',
          guitarId: 666,
        }}
      />);

    expect(screen.getByText('userName')).toBeInTheDocument();
    expect(screen.getByText('advantage')).toBeInTheDocument();
    expect(screen.getByText('disadvantage')).toBeInTheDocument();
    expect(screen.getByText('comment')).toBeInTheDocument();
    expect(screen.getByText('27 декабря')).toBeInTheDocument();
  });

});
