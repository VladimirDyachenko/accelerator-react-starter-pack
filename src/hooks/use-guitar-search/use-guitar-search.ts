import axios from 'axios';
import { ApiRoute, BACKEND_URL } from 'const/const';
import { useEffect, useState } from 'react';
import { Guitar } from 'types/guitars';

function useGuitarSearch(searchTerm: string | undefined) {
  const [results, setResults] = useState<Guitar[]>([]);
  useEffect(() => {
    async function fetchGuitars() {
      if (!searchTerm) {
        setResults([]);
        return;
      }
      const backEndURLWithSearch = `${BACKEND_URL}${ApiRoute.Guitars}?name_like=${searchTerm}`;
      const { data } = await axios.get<Guitar[]>(backEndURLWithSearch);

      setResults(data);
    }

    fetchGuitars();
  }, [searchTerm]);

  return [results];
}

export default useGuitarSearch;