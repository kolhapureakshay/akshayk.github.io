// Currency Converter Logic
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`${apiUrl}${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency];
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');
    
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter a valid amount</p>';
        return;
    }
    
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    
    if (exchangeRate) {
        const convertedValue = (amount * exchangeRate).toFixed(2);
        document.getElementById('convertedAmount').value = convertedValue;
        resultDiv.innerHTML = `<p class="success">${amount} ${fromCurrency} = ${convertedValue} ${toCurrency}</p>`;
    } else {
        resultDiv.innerHTML = '<p class="error">Unable to get exchange rates. Please try again later.</p>';
    }
}

// Event Listeners
document.getElementById('convertBtn').addEventListener('click', convertCurrency);

// Swap Button Logic
const swapButton = document.createElement('button');
swapButton.id = 'swapBtn';
swapButton.className = 'btn btn-secondary swap-btn';
swapButton.innerHTML = '<i class="fas fa-exchange-alt"></i>Swap Currencies';
swapButton.addEventListener('click', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

// Update swap functionality to only swap currencies
document.getElementById('swapBtn').addEventListener('click', function() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    
    // Store current from currency value
    const tempCurrency = fromCurrency.value;
    
    // Swap currency values
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    
    // Trigger conversion if there's an amount
    if (document.getElementById('amount').value) {
        convertCurrency();
    }
});

// Add styles for currency converter
const style = document.createElement('style');
style.textContent = `
    .error {
        color: #dc3545;
        margin-top: 10px;
    }
    .success {
        color: #28a745;
        margin-top: 10px;
    }
    .swap-btn {
        width: 100%;
        padding: 8px;
        margin: 10px 0;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .swap-btn:hover {
        background-color: #5a6268;
    }
`;
document.head.appendChild(style); 