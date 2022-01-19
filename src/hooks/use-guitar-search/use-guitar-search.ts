import axios from 'axios';
import { ApiRoute, Api } from 'const/const';
import { useEffect, useState } from 'react';
import { Guitar } from 'types/types';

function useGuitarSearch(searchTerm: string | undefined) {
  const [results, setResults] = useState<Guitar[]>([]);
  useEffect(() => {
    async function fetchGuitars() {
      if (!searchTerm) {
        setResults([]);
        return;
      }
      const backEndURLWithSearch = `${Api.Url}${ApiRoute.Guitars}?name_like=${searchTerm}`;
      const { data } = await axios.get<Guitar[]>(backEndURLWithSearch);

      data.sort((a, _) => a.name.startsWith(searchTerm) ? -1 : 1);

      setResults(data);
    }

    fetchGuitars();
  }, [searchTerm]);

  return [results];
}

export default useGuitarSearch;
