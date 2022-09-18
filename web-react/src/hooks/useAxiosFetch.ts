import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxiosFetch = (
  api: string,
  axiosParams: { [key: string]: string } | null,
  rerender: boolean
) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(rerender);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig<any> = {
      cancelToken: source.token,
    };
    if (axiosParams !== null) config["params"] = axiosParams;

    const fetchData = async () => {
      if (!fetch) return;
      await axios(api, config)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log("fetch request aborted.");
          } else {
            setError(err?.response?.data ?? "Error");
            console.error(err);
          }
        });
    };
    fetchData();
    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);
  return {
    data,
    loading,
    error,
    setFetch,
  };
};

export default useAxiosFetch;
