# Format Currency

## About the code
This snippet is for formatting currency regarding to the country where to use.

## How to use

1. Import library
```
import FormatCurrency from 'format-currency.js';
```

2. Create instance
```
let formatCurrency = new FormatCurrency();
```

3. Call validator

```
let price = '123456';
let formattedPrice = formatCurrency.handleCurrencyAsString(price)
console.log(formattedPrice);
```


