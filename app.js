const Converter = require('./currencyConverter')

function convertCurrency(conversionRates, startCurrency, endCurrency) {
    const converter = new Converter()
    for (const rate of conversionRates) {
        converter.addExchangeRate(rate[0], rate[1], rate[2]);
    }

    return converter.getExchangeRate(startCurrency, endCurrency);

}

const exchangeRate = convertCurrency([
    ["USD", "JPY", 110],
    ["USD", "AUD", 1.45],
    ["JPY", "GBP", 0.0070]], "GBP", "AUD");
console.log(exchangeRate);