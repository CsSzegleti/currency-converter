class Currency {
    constructor(name) {
        this.name = name;
        this.rates = [];
    }
}

class ExchangeRate {
    constructor(to, rate) {
        this.to = to;
        this.rate = rate;
    }
}

class Converter {
    constructor() {
        this.currencies = new Map();
    }

    addExchangeRate(fromCurrencyName, toCurrencyName, exchangeRate) {
        if (!this.currencies.has(toCurrencyName)) {
            this.currencies.set(toCurrencyName, new Currency(toCurrencyName));
        }
        
        if (!this.currencies.has(fromCurrencyName)) {
            this.currencies.set(fromCurrencyName, new Currency(fromCurrencyName));
        }

        this.currencies.get(fromCurrencyName).rates.push(new ExchangeRate(
            this.currencies.get(toCurrencyName),
            exchangeRate)
        );
        
        this.currencies.get(toCurrencyName).rates.push(new ExchangeRate(
            this.currencies.get(fromCurrencyName),
            1.0 / exchangeRate)
        );
    }

    getExchangeRate(fromCurrencyName, toCurrencyName) {
        function getRate(fromCurrency, toCurrency, hasBeen = [], exchangeRate = 1) {

            if (!hasBeen.includes(fromCurrency)) {
                hasBeen.push(fromCurrency);
            }

            for (const directlyConvertableRate of fromCurrency.rates) {
                if (hasBeen.includes(directlyConvertableRate.to)) {
                    continue;
                }
                if (directlyConvertableRate.to != toCurrency) {
                    return getRate(directlyConvertableRate.to, toCurrency, hasBeen, exchangeRate * directlyConvertableRate.rate)
                } else {
                    return (exchangeRate * directlyConvertableRate.rate);
                }
            }
        }

        return getRate(
            this.currencies.get(fromCurrencyName),
            this.currencies.get(toCurrencyName)
        )
    }
}

module.exports = Converter