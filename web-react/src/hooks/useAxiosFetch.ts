import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface HookParameters extends AxiosRequestConfig {
  api: string;
  axiosParams?: { [key: string]: string };
  fetch?: boolean;
  timeOut?: number;
}

// TODO: deconstruct
const useAxiosFetch = (paramObj: HookParameters) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(paramObj?.fetch ?? true);
  const [toRetry, setToRetry] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig<any> = {
      cancelToken: source.token,
      method: paramObj?.method || "GET",
      url: paramObj.api,
      ...paramObj,
    };
    if (paramObj?.axiosParams !== null)
      config["params"] = paramObj?.axiosParams;

    const fetchData = async () => {
      if (!fetch) return false;
      try {
        const res = await axios(config);
        if (res.status == 200) {
          setData(res.data);
          setLoading(false);
          setError("");
          return res;
        }
      } catch (err) {
        setLoading(false);
        setToRetry(true);
        if (axios.isCancel(err)) console.log("fetch request aborted.");
        else if (axios.isAxiosError(err)) {
          setError(err.message);
          console.error(err);
        } else console.error(err);
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
