import axios from 'axios';
import { ApiRoute, FallbackPrice, ITEMS_PER_PAGE } from 'const/const';
import { Comment, CommentPost, Guitar, ThunkActionResult } from 'types/types';
import { setCartData, setCoupon, setDiscount } from './cart-process/actions';
import { setGuitarList, setMinMaxPrice, setProductsLoadingStatus, setTotalItemsCount } from './catalog-process/actions';
import { addProductComment, setProductData } from './product-process/actions';

export const fetchGuitarList = (searchQuery = ''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setProductsLoadingStatus(true, false));
    try {
      const response = await api.get<Guitar[]>(`${ApiRoute.Guitars}?_embed=comments&_limit=${ITEMS_PER_PAGE}&${searchQuery}`);
      const totalCount = parseInt(response.headers['x-total-count'], 10) ?? 0;

      dispatch(setGuitarList(response.data));
      dispatch(setTotalItemsCount(totalCount));
      dispatch(setProductsLoadingStatus(false, false));
    } catch (error) {
      dispatch(setGuitarList([]));
      dispatch(setProductsLoadingStatus(false, true));
    }
  };

export const fetchMinMaxPrice = (searchQuery = ''): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const minPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=acs&_limit=1${searchQuery}`);
      const maxPricePromise = api.get<Guitar[]>(`${ApiRoute.Guitars}?_sort=price&_order=desc&_limit=1${searchQuery}`);
      const [minPriceRes, maxPriceRes] = await Promise.allSettled([minPricePromise, maxPricePromise]);
      //TS не позволил присвоить что-то в переменную потом, поэтому использовал хак 0 + readonly number
      let minPrice = 0 + FallbackPrice.Min;
      let maxPrice = 0 + FallbackPrice.Max;

      if (minPriceRes.status === 'fulfilled') {
        minPrice = minPriceRes.value.data[0].price;
      }

      if (maxPriceRes.status === 'fulfilled') {
        maxPrice = maxPriceRes.value.data[0].price;
      }

      dispatch(setMinMaxPrice(minPrice, maxPrice));
    } catch (error) {
      dispatch(setMinMaxPrice(FallbackPrice.Min, FallbackPrice.Max));
    }
  };

export const fetchProductData = (id: number, onError: (code: number) => void): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Guitar>(`${ApiRoute.Guitars}/${id}?_embed=comments`);

      dispatch(setProductData(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== undefined) {
          onError(error.response.status);
        }
      }
      onError(0);
    }
  };

export const addComment = (
  commentPost: CommentPost,
  onSuccess: () => void,
  onError: (messages: string[]) => void,
): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<Comment>(ApiRoute.Comments, commentPost);
      dispatch(addProductComment(data));
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onError(error.response?.data?.messages as string[] ?? ['Произошла ошибка']);
        return;
      }
      onError(['Произошла ошибка']);
    }
  };


export const fetchCartData = (ids: Array<number>, onSuccess: () => void, onError: () => void): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const promises = ids.map((id) => api.get<Guitar>(`${ApiRoute.Guitars}/${id}`));
      const guitarsResponse = await Promise.all(promises);
      const guitarsData = guitarsResponse.map((res) => res.data);
      dispatch(setCartData(guitarsData));
      onSuccess();
    } catch (error) {
      dispatch(setCartData([]));
      onError();
    }
  };

export const applyCoupon = (coupon: string, onError: () => void): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const payload = { coupon };
      const { data } = await api.post<number>(ApiRoute.Coupons, payload);

      dispatch(setDiscount(data));
      dispatch(setCoupon(coupon));
    } catch (error) {
      dispatch(setDiscount(0));
      dispatch(setCoupon(null));
      onError();
    }
  };
