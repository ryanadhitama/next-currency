import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await axios.get("/api/exchange-rates");
        setExchangeRates(response.data.conversion_rates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExchangeRates();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Real-Time Exchange Rates</h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <div className="h-[600px] overflow-y-scroll">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Currency Code</th>
                <th className="py-3 px-4 border-b text-left">Exchange Rate</th>
              </tr>
            </thead>
            <tbody>
              {exchangeRates &&
                Object.entries(exchangeRates).map(([currency, rate]) => (
                  <tr key={currency}>
                    <td className="py-3 px-4 border-b">{currency}</td>
                    <td className="py-3 px-4 border-b">{Number(rate)?.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
