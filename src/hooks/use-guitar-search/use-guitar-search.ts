import axios from 'axios';
import { ApiRoute, Api } from 'const/const';
import { useEffect, useState } from 'react';
import { Guitar } from 'types/types';

function useGuitarSearch(searchTerm: string | undefined) {
  const [results, setResults] = useState<{data: Guitar[], error: null | boolean}>({data: [], error: null});
  useEffect(() => {
    async function fetchGuitars() {
      if (!searchTerm) {
        setResults({ data: [], error: null });
        return;
      }
      const backEndURLWithSearch = `${Api.Url}${ApiRoute.Guitars}?name_like=${searchTerm}`;
      try {
        setResults((state) => ({...state, error: null}));

        const { data } = await axios.get<Guitar[]>(backEndURLWithSearch);

        data.sort((a, _) => a.name.startsWith(searchTerm) ? -1 : 1);

        setResults({ data, error: null });
      } catch (error) {
        setResults({data: [], error: true});
      }
    }

    fetchGuitars();
  }, [searchTerm]);

  return [results];
}

export default useGuitarSearch;
