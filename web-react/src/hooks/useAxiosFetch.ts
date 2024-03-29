import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useAuthContext } from "../context/AuthContext";

interface HookParameters extends AxiosRequestConfig {
  api: string;
  fetch?: boolean;
  timeOut?: number;
}

const useAxiosFetch = <TData>(paramObj: HookParameters) => {
  const [data, setData] = useState<TData | null>(null);
  const [axiosParams, setAxiosParams] = useState(paramObj)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetch, setFetch] = useState(axiosParams?.fetch ?? true);
  const [toRetry, setToRetry] = useState(false);
  const { userAuth } = useAuthContext();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig = {
      cancelToken: source.token,
      method: axiosParams?.method || "GET",
      url: axiosParams.api,
      ...axiosParams,
    };
    //TODO: add this to the above config declaration
    if (userAuth?.isAuth)
      config["headers"] ={ "Authorization":`Bearer ${userAuth.token}`};

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
    }, axiosParams?.timeOut ?? 5000);

    return () => {
      // clear fetch request and timer
      source.cancel();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch, toRetry, axiosParams]);
  return {
    data,
    loading,
    error,
    setFetch,
    setAxiosParams
  };
};

export default useAxiosFetch;