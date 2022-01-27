import { render, screen } from '@testing-library/react';
import RateStars from './rate-stars';

describe('Component: RateStars', () => {

  it('should render RateStars correctly', () => {
    render(
      <RateStars
        size={{ width: 10, height: 10 }}
        rating={1}
        rateCount={10}
        rateMessage={'message'}
        additionalContainerClassName={'test'}
      />,
    );

    expect(screen.getByTestId('rate-stars-wrapper').classList.contains('test'))
      .toBe(true);
    expect(screen.getByText('message')).toBeInTheDocument();
    expect(screen.getByTestId('rate-stars-count')).toHaveTextContent('10');
  });

});
