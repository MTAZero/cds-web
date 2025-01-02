import {serialize, toArray} from "utils";
import useSWR from "swr";
const useTienTrinhBieu = (params: any) => {
  const {data, error, isLoading, mutate} = useSWR(
    params
      ? `/progresses/get-of-week` +
          `${serialize(params) ? `${serialize(params)}` : ""}`
      : null,
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      errorRetryInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  return {data, error, isLoading, mutate};
};
export default useTienTrinhBieu;
