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

// Populate Currency Options
const currencies = [
    'USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'
];

function populateCurrencyOptions() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = `${currency} - ${getCurrencyName(currency)}`;
        
        const option2 = option1.cloneNode(true);
        
        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });
}

function getCurrencyName(currencyCode) {
    const currencyNames = {
        'USD': 'US Dollar',
        'EUR': 'Euro',
        'INR': 'Indian Rupee',
        'GBP': 'British Pound',
        'JPY': 'Japanese Yen',
        'AUD': 'Australian Dollar',
        'CAD': 'Canadian Dollar',
        'CHF': 'Swiss Franc',
        'CNY': 'Chinese Yuan',
        'SEK': 'Swedish Krona'
    };
    return currencyNames[currencyCode] || currencyCode;
}

// Initialize
populateCurrencyOptions();

// Add keyboard support
document.getElementById('amount').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertCurrency();
    }
});

// Add input validation
document.getElementById('amount').addEventListener('input', (e) => {
    const value = e.target.value;
    if (value < 0) {
        e.target.value = Math.abs(value);
    }
});

// Add swap currencies functionality
const swapButton = document.createElement('button');
swapButton.textContent = '↕ Swap Currencies';
swapButton.className = 'swap-btn';
swapButton.addEventListener('click', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

document.querySelector('.converter-container').insertBefore(
    swapButton,
    document.getElementById('convertBtn')
);

// Add styles for new elements
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