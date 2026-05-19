import axios from 'axios';
import type { IpData } from '../types/ip';

const API_KEY = 'at_DDwuLJmPr73FJe81QQU40EPyoIXHN';
const BASE_URL = 'https://geo.ipify.org/api/v2/country,city';

export const fetchIpDetails = async (ipOrDomain: string = ''): Promise<IpData> => {
  const params: Record<string, string> = {
    apiKey: API_KEY,
  };

  if (ipOrDomain) {
    // Simple check to determine if query is an IP address or domain
    const isIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/.test(ipOrDomain);
    if (isIp) {
      params.ipAddress = ipOrDomain;
    } else {
      params.domain = ipOrDomain;
    }
  }

  const response = await axios.get(BASE_URL, { params });
  const { data } = response;

  return {
    ip: data.ip,
    location: {
      country: data.location?.country || '',
      region: data.location?.region || '',
      city: data.location?.city || '',
      lat: data.location?.lat ?? 0,
      lng: data.location?.lng ?? 0,
      postalCode: data.location?.postalCode || '',
      timezone: data.location?.timezone || '+00:00',
    },
    isp: data.isp || 'Unknown ISP',
  };
};
