import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {client} from './client';

export function useJobs(numb) {
  const search = useSelector((state) => state.search);
  const {keyword, type, pageNumber} = search;

  console.log(numb);
  return useQuery('jobs', async () => {
    return await client.get(
      `/positions.json?search=${keyword}&page=${pageNumber}`,
    );
  });
}
