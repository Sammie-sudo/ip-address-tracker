import React from "react";
import type { IpData } from "../types/ip";

interface InfoCardProps {
  data: IpData | null;
  isLoading: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center min-h-[160px] animate-pulse pointer-events-auto">
        <span className="text-slate-400 font-semibold tracking-wide">
          Retrieving Geolocation Data...
        </span>
      </div>
    );
  }

  if (!data) return null;

  const timezoneOffset =
    data.location.timezone.startsWith("+") ||
    data.location.timezone.startsWith("-")
      ? data.location.timezone
      : `+${data.location.timezone}`;

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 md:p-8 grid grid-cols-2 md:flex md:flex-row gap-x-4 gap-y-3.5 md:gap-0 justify-between items-start md:items-stretch text-center md:text-left transition-all duration-500 pointer-events-auto">
      {/* IP Address Column */}
      <div className="flex-1 md:pr-8 w-full flex flex-col">
        <h2 className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-3">
          IP Address
        </h2>
        <p className="text-sm md:text-xl font-bold text-slate-900 break-words">
          {data.ip}
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-slate-200 self-center" />

      {/* Location Column */}
      <div className="flex-1 md:px-8 w-full flex flex-col">
        <h2 className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-3">
          Location
        </h2>
        <p className="text-sm md:text-xl font-bold text-slate-900 break-words">
          {data.location.city}, {data.location.region}{" "}
          {data.location.postalCode}
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-slate-200 self-center" />

      {/* Timezone Column */}
      <div className="flex-1 md:px-8 w-full flex flex-col">
        <h2 className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-3">
          Timezone
        </h2>
        <p className="text-sm md:text-xl font-bold text-slate-900 break-words">
          UTC {timezoneOffset}
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-16 bg-slate-200 self-center" />

      {/* ISP Column */}
      <div className="flex-1 md:pl-8 w-full flex flex-col">
        <h2 className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-3">
          ISP
        </h2>
        <p className="text-sm md:text-xl font-bold text-slate-900 break-words">
          {data.isp}
        </p>
      </div>
    </div>

  );
};
