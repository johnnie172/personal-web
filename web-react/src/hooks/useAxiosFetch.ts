import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface IParameters {
  api: string;
  axiosParams?: { [key: string]: string };
  fetch?: boolean;
  timeOut?: number;
}

const useAxiosFetch = (
  paramObj: IParameters
) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(paramObj?.fetch ?? true);
  const [toRetry, setToRetry] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig<any> = {
      cancelToken: source.token,
    };
    if (paramObj?.axiosParams !== null) config["params"] = paramObj?.axiosParams;
    const fetchData = async () => {
      if (!fetch) return false;
      await axios(paramObj.api, config)
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

    // set retry timer
    const timer = setTimeout(()=> {
      toRetry && setToRetry(false)
    }, paramObj?.timeOut ?? 5000)

    return () => {
      // clear fetch request and timer
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
