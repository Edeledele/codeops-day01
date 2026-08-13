// Task 1: async function that fetches USD -> ETB rate, checks res.ok, returns the rate.
// API: https://open.er-api.com/v6/latest/USD  (free, no key required)

async function getUsdToEtbRate() {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');

  if (!res.ok) {
    throw new Error(`Exchange rate API request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const rate = data.rates && data.rates.ETB;

  if (rate === undefined) {
    throw new Error('ETB rate not found in API response');
  }

  return rate;
}

// Demo run
getUsdToEtbRate()
  .then((rate) => console.log(`1 USD = ${rate} ETB`))
  .catch((err) => console.error('Failed to fetch rate:', err.message));

module.exports = { getUsdToEtbRate };
