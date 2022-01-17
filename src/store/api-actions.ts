import { ApiRoute, FallbackMinMaxPrice, ITEMS_PER_PAGE } from 'const/const';
import { Guitar, ThunkActionResult } from 'types/types';
import { setGuitarList, setMinMaxPrice, setTotalItemsCount } from './catalog-process/actions';

export const fetchGuitarList = (searchQuery = ''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(`${ApiRoute.Guitars}?_embed=comments&_limit=${ITEMS_PER_PAGE}&${searchQuery}`);
      const totalCount: number = response.headers['x-total-count'] || 0;

      dispatch(setGuitarList(response.data));
      dispatch(setTotalItemsCount(totalCount));
    } catch (error) {
      dispatch(setGuitarList([]));
    }
  };

export const fetchMinMaxPrice = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const minPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=acs&_limit=1`);
      const maxPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=desc&_limit=1`);
      const [minPriceRes, maxPriceRes] = await Promise.allSettled([minPricePromise, maxPricePromise]);
      //TS не позволил присвоить что-то в переменную потом, поэтому использовал хак 0 + readonly number
      //let minPrice = FallbackMinMaxPrice.min
      let minPrice = 0 + FallbackMinMaxPrice.min;
      let maxPrice = 0 + FallbackMinMaxPrice.max;

      if (minPriceRes.status === 'fulfilled') {
        minPrice = minPriceRes.value.data[0].price;
      }

      if (maxPriceRes.status === 'fulfilled') {
        maxPrice = maxPriceRes.value.data[0].price;
      }

      dispatch(setMinMaxPrice(minPrice, maxPrice));
    } catch (error) {
      dispatch(setMinMaxPrice(FallbackMinMaxPrice.min, FallbackMinMaxPrice.max));
    }
  };
