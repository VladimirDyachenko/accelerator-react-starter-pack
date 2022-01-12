import { ApiRoute, FALLBACK_FILTER_MAX_PRICE, FALLBACK_FILTER_MIN_PRICE } from 'const/const';
import { Guitar, ThunkActionResult } from 'types/types';
import { setGuitarList, setMinMaxPrice } from './catalog-process/actions';

export const fetchGuitarList = (searchQuery = ''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Guitar[]>(`${ApiRoute.Guitars}?_embed=comments&${searchQuery}`);
      dispatch(setGuitarList(data));
    } catch (error) {
      //TODO Показать уведомление
      dispatch(setGuitarList([]));
    }
  };

export const fetchMinMaxPrice = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const minPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=acs&_limit=1`);
    const maxPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=desc&_limit=1`);
    Promise.allSettled([minPricePromise, maxPricePromise])
      .then(([minPriceRes, maxPriceRes]) => {
        let minPrice = FALLBACK_FILTER_MIN_PRICE;
        let maxPrice = FALLBACK_FILTER_MAX_PRICE;

        if (minPriceRes.status === 'fulfilled') {
          minPrice = minPriceRes.value.data[0].price;
        }

        if (maxPriceRes.status === 'fulfilled') {
          maxPrice = maxPriceRes.value.data[0].price;
        }

        dispatch(setMinMaxPrice(minPrice, maxPrice));
      })
      .catch(() => dispatch(setMinMaxPrice(FALLBACK_FILTER_MIN_PRICE, FALLBACK_FILTER_MAX_PRICE)));
  };
