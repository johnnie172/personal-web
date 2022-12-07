import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface Parameters {
  api: string;
  method?: "POST" | "GET";
  data?: { [key: string]: string };
  axiosParams?: { [key: string]: string };
  fetch?: boolean;
  timeOut?: number;
}

// TODO: deconstruct
const useAxiosFetch = (paramObj: Parameters) => {
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
    if (paramObj?.axiosParams !== null)
      config["params"] = paramObj?.axiosParams;

    //TODO: add the data & method
    const fetchData = async () => {
      if (!fetch) return false;
      try {
        const res = await axios(paramObj.api, config);
        if (res.status == 200) {
          setData(res.data);
          setLoading(false);
          setError("");
          return res;
        }
      } catch (err: any) {
        // TODO: change type
        setLoading(false);
        setToRetry(true);
        if (axios.isCancel(err)) {
          console.log("fetch request aborted.");
        } else {
          setError(err?.response?.data ?? "Error");
          console.error(err);
        }
      }
    };
    fetchData();

    // set retry timer
    const timer = setTimeout(() => {
      if (toRetry) setToRetry(false);
    }, paramObj?.timeOut ?? 5000);

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
