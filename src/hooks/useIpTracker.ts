import { useState, useEffect } from "react";
import type { IpData } from "../types/ip";
import { fetchIpDetails } from "../services/ipApi";

export const useIpTracker = () => {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchIpOrDomain = async (ipOrDomain: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchIpDetails(ipOrDomain);
      setIpData(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch client's IP on load
  useEffect(() => {
    searchIpOrDomain("");
  }, []);

  return {
    ipData,
    isLoading,
    error,
    searchIpOrDomain,
  };
};
