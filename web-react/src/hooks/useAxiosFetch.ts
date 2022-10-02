import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxiosFetch = (
  api: string,
  axiosParams: { [key: string]: string } | null = null,
  rerender = true,
  timeOut = 7000
) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(rerender);
  const [toRetry, setToRetry] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig<any> = {
      cancelToken: source.token,
    };
    if (axiosParams !== null) config["params"] = axiosParams;

    const fetchData = async () => {
      if (!fetch) return false;
      await axios(api, config)
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError("")
        })
        .catch((err) => {
          setLoading(false);
          setToRetry(true);
          if (axios.isCancel(err)) {
            console.log("fetch request aborted.");
          } else {
            setError(err?.response?.data ?? "Error");
            console.error(err);
          }
        });
    };
    fetchData();
    const timer = setTimeout(()=> {
      toRetry && setToRetry(false)
      console.log(timeOut)
    }, timeOut)

    return () => {
      source.cancel();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch, toRetry]);
  return {
    data,
    loading,
    error,
    setFetch,
  };
};

export default useAxiosFetch;
