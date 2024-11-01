const cryptoPrices = document.getElementById("cryptoPrices");
const resultDisplay = document.getElementById("result");

// Fetch cryptocurrency prices
async function fetchPrices() {
  try {
    console.log("Fetching current prices...");
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd,eur,gbp");
    const data = await response.json();
    console.log("Prices fetched:", data); // Log fetched data

    // Populate the price list in HTML
    cryptoPrices.innerHTML = `
      <li>Bitcoin (BTC): $${data.bitcoin.usd} USD</li>
      <li>Ethereum (ETH): $${data.ethereum.usd} USD</li>
      <li>Litecoin (LTC): $${data.litecoin.usd} USD</li>
    `;
  } catch (error) {
    cryptoPrices.innerHTML = "<li>Could not fetch prices. Please try again later.</li>";
    console.error("Error fetching prices:", error);
  }
}

// Convert cryptocurrency to fiat currency
async function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  // Check for valid input
  if (!amount || amount <= 0) {
    resultDisplay.textContent = "Please enter a valid amount";
    return;
  }

  try {
    console.log(`Converting ${amount} ${fromCurrency.toUpperCase()} to ${toCurrency.toUpperCase()}...`);
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`);
    const data = await response.json();
    console.log("Conversion data:", data); // Log conversion data

    // Check if the conversion data is available
    if (!data[fromCurrency] || !data[fromCurrency][toCurrency]) {
      resultDisplay.textContent = "Conversion rate not available. Please try a different currency.";
      return;
    }

    const conversionRate = data[fromCurrency][toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);
    resultDisplay.textContent = `Converted Amount: ${convertedAmount} ${toCurrency.toUpperCase()}`;
  } catch (error) {
    resultDisplay.textContent = "Conversion failed. Please try again.";
    console.error("Error converting currency:", error);
  }
}

// Initial price fetch
fetchPrices();
