// 🔹 Page load hone par currency list load hogi
window.onload = function () {
    fetch("/currencies")
        .then(response => response.json())
        .then(data => {
            const fromSelect = document.getElementById("fromCurrency");
            const toSelect = document.getElementById("toCurrency");

            fromSelect.innerHTML = "";
            toSelect.innerHTML = "";

            for (const code in data) {
                const option1 = document.createElement("option");
                option1.value = code;
                option1.text = `${code} - ${data[code]}`;
                fromSelect.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = code;
                option2.text = `${code} - ${data[code]}`;
                toSelect.appendChild(option2);
            }
        })
        .catch(err => console.error("Currency load error:", err));
};


// 🔹 Convert currency button function
function convertCurrency() {
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Please enter valid amount");
        return;
    }
    
    fetch(`/convert?from=${from}&to=${to}&amount=${amount}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("result").innerText =
                `Converted Amount: ${data.convertedAmount}`;
        })
        .catch(err => console.error("Convert error:", err));
}
function getRate() {
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    fetch(`/rate?from=${from}&to=${to}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("rateResult").innerText =
                `1 ${from} = ${data.rate} ${to}`;
        });
}


function getFlagEmoji(countryCode) {
    if(!countycode) return "";
    return countryCode
    .toUpperCase()
    .replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt())
    );
}

Object.keys(rates).forEach(currency => {
    const countryCode = currencyToCountry[currency];
    const flag = getFlagEmoji(countryCode);

    const option1 =document.createElement("option");
    option1.value = currency;
    option1.textContent = '${flag} ${currency}';
    fromCurrency.appendChild(option1);

    const option2 =document.createElement("option");
    option2.value =currency;
    option2.textContent ='${flag} ${currency}';
    toCurrency.appendChild(option2);
});
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Function to set theme
const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// 1. Initial Load Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // If no save, use system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(systemPrefersDark ? 'dark' : 'light');
}

// 2. Click Event
toggleBtn.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

let fromCurrency = "";
let toCurrency = "";
fetch("https://open.er-api.com/v6/latest/USD")
  .then(res => {
    if (!res.ok) {
      throw new Error("API Error: " + res.status);
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));




