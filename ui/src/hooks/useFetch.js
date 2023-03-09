import axios from 'axios';
import { useEffect, useState } from 'react';
import { enrichWorksAuthorships } from '../utils/enrich';
import defaultData from '../../data/huawei_france.json';

const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default function useFetch(filters) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => axios.get(`${endpoint}?oaq=${filters}`)
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch((e) => {
      setError(true);
      setIsLoading(false);
    });
    
    setIsLoading(true);
    setError(null);
    setData(null);
    if (import.meta.env.DEV) {
      setIsLoading(false);
      setError(false);
      setData(defaultData);
    } else {
      fetchData();
    }
  }, [filters]);

  return { data: enrichWorksAuthorships(data), error, isLoading };
}