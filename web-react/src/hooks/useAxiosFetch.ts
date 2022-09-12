// use-fetch-data.js
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxiosFetch = (
  api: string,
  axiosParams: { [key: string]: string } | null
) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config: AxiosRequestConfig<any> = {
      cancelToken: source.token,
    };
    if (axiosParams !== null) config["params"] = axiosParams;

    const fetchData = async () => {
      await axios(api, config)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (axios.isCancel(err)) {
            console.log("fetch request aborted.");
          } else if (err?.response?.data) {
            setError(err?.response?.data);
          } else {
            setError("Error");
            console.error(err);
          }
        });
    };
    fetchData();
    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useAxiosFetch;
