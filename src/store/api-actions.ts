import { ApiRoute } from 'const/const';
import { Guitar, ThunkActionResult } from 'types/types';
import { setGuitarList } from './catalog-process/actions';

export const fetchGuitarList = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Guitar[]>(`${ApiRoute.Guitars}?_embed=comments`);
      dispatch(setGuitarList(data));
    } catch (error) {
      //TODO Показать уведомление
      dispatch(setGuitarList([]));
    }
  };
