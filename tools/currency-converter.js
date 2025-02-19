// Currency Converter Logic
const apiKey = '8c4b556efee6b933954339ce'; // Replace with your actual API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; // Replace with your actual API URL
const fromCurrencyDropdown = document.getElementById('fromCurrency');
const toCurrencyDropdown = document.getElementById('toCurrency');

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
        resultDiv.innerHTML = `<p class="success">${amount} ${fromCurrency} = ${convertedValue} ${toCurrency}</p>`;
    } else {
        resultDiv.innerHTML = '<p class="error">Unable to get exchange rates. Please try again later.</p>';
    }
}

async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        storeCurrencyData(data);
        populateDropdowns(data);
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

function storeCurrencyData(data) {
    // Save data to localStorage for reuse
    localStorage.setItem('currencyData', JSON.stringify(data));
}

function populateDropdowns(data) {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
        const fromOption = document.createElement('option');
        fromOption.value = currency;
        fromOption.textContent = `${currency} - ${data.rates[currency]}`;
        fromCurrencyDropdown.appendChild(fromOption);

        const toOption = document.createElement('option');
        toOption.value = currency;
        toOption.textContent = `${currency} - ${data.rates[currency]}`;
        toCurrencyDropdown.appendChild(toOption);
    });
}

// Check if currency data is already stored
const storedData = localStorage.getItem('currencyData');
if (storedData) {
    populateDropdowns(JSON.parse(storedData));
} else {
    fetchCurrencyData();
}

// Placeholder function to reset currency data monthly
function resetCurrencyData() {
    localStorage.removeItem('currencyData');
    fetchCurrencyData();
}

// Call resetCurrencyData() at the start of each month (you can set this up with a scheduler)

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