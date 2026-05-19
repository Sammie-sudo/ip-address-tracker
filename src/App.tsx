import React from 'react';
import { SearchBar } from './components/SearchBar';
import { InfoCard } from './components/InfoCard';
import { Map } from './components/Map';
import { useIpTracker } from './hooks/useIpTracker';

const App: React.FC = () => {
  const { ipData, isLoading, error, searchIpOrDomain } = useIpTracker();

  return (
    <main className="min-h-screen flex flex-col relative font-sans">
      {/* Top Header Section */}
      <header
        className="w-full header-bg pt-8 pb-32 px-4 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide mb-6 text-center select-none drop-shadow-md relative z-10">
          IP Address Tracker
        </h1>

        <div className="relative z-10 w-full flex justify-center">
          <SearchBar onSearch={searchIpOrDomain} isLoading={isLoading} />
        </div>



        {error && (
          <div className="mt-4 px-4 py-2 bg-red-500/90 text-white font-medium text-sm rounded-xl shadow-lg animate-bounce z-20">
            {error}
          </div>
        )}
      </header>

      {/* Floating InfoCard & Map Section */}
      <section className="flex-1 flex flex-col relative min-h-[500px]">
        {/* InfoCard container overlay */}
        <div className="absolute -top-16 left-0 right-0 z-[9999] px-4 flex justify-center pointer-events-none">
          <InfoCard data={ipData} isLoading={isLoading} />
        </div>



        {/* Map Container */}
        <div className="flex-1 w-full bg-slate-200">
          {ipData && ipData.location ? (
            <Map lat={ipData.location.lat} lng={ipData.location.lng} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 min-h-[500px]">
              <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="font-medium">Initializing Map View...</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
