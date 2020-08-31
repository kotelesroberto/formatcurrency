/**
 * Widget script for formatting the currencies
 * Robert Koteles, Senior Web Developer, 2019
 */


import * as data from '../countries/uk/currency.json';


export default class FormatCurrency {

    // ==========================================================================
    // Constructor
    // ==========================================================================
    constructor(skus) {
        this.currency = data;
    }

    // ==========================================================================
    // Handle numbers / strings and gives back in the right format of currency
    // Param: String or number
    // Return String
    // ==========================================================================
    handleCurrencyAsString( item ) {
        
        log('handleCurrencyAsString item',item);
        var _self = this,
            itemValue,
            output = "",
            // currencySettings = {
            //     "symbol": "€",
            //     "html": "&euro;",
            //     "thousand": ",",
            //     "decimal": ".",
            //     "decimalCount": 2, // how many decimal placeholders after
            //     "before": true,
            //     "space": false,
            //     "pence": true
            // },

            currencySettings = _self.currency,
            space = "";

        if( item === '-' ) {
            return item;
        }
        

        if( typeof(item) === "number" ) {
            itemValue = item;
        } else if( typeof(item) === "string" ) {
            itemValue = Number(item.replace(/[^0-9.-]+/g,""));
        }



        // adding decimals
        itemValue = parseFloat(Math.round(itemValue * 100) / 100).toFixed( currencySettings.decimalCount );

        // adding thousand
        itemValue = this.addThousand(itemValue, currencySettings.decimal, currencySettings.thousand);

        //TODO: currencySettings.thousand --> need to use it at format the number

        // need space?
        if( currencySettings.space ) {
            space = " ";
        } 

        // position of symbol
        if( currencySettings.before ) {
            output = currencySettings.symbol + space + itemValue;
        } else {
            output = itemValue + space + currencySettings.symbol;
        }

        return output;
    }

     // ==========================================================================
    // Handle numbers / strings and gives back as number
    // Param: String or number
    // Return number
    // ==========================================================================
    handleCurrencyAsNumber( item ) {
        
        var itemValue;

        if( typeof(item) === "number" ) {
            itemValue = item;
        } else if( typeof(item) === "string" ) {
            itemValue = Number(item.replace(/[^0-9.-]+/g,""));
        }

        return itemValue;
    }


    // ==========================================================================
    // Handle numbers / strings and gives back in the right format of percentage
    // Param: String or number
    // Return String
    // ==========================================================================
    handlePercentageAsString( item ) {
        
        var _self = this,
            itemValue,
            output = "",
            space = "";

        if( typeof(item) === "number" ) {
            itemValue = item;
        } else if( typeof(item) === "string" ) {
            itemValue = Number(item.replace(/[^0-9.-]+/g,""));
        }
        
        
        // adding decimals
        itemValue = parseFloat(Math.round(itemValue * 100) / 100).toFixed( 2 );
        

        output = itemValue + space + "%";
        

        return output;
    }


    // ==========================================================================
    // Adds special character at evefry n character from RIGHT
    // ==========================================================================
    addThousand(str, decimalSymbol, thousandSymbol) {
        var n = 3;
        // integer part
        var part1 = Math.trunc(str);
        
        // decimal part
        var part2 = (str % 1).toFixed(2).split(decimalSymbol);
        
        // reverse part1 as string
        part1 = part1 + ""; // make string
        var reversed = part1.split("").reverse().join("");
        
        // group by "n"
        var stringSplit = [];
        for(var i = 0, len = reversed.length; i < len; i += n) {
           stringSplit.push(reversed.substr(i, n));
        }
      
        var temp = stringSplit.join( thousandSymbol );
        // reverse back
        var numWithThousand = temp.split("").reverse().join("") + decimalSymbol + part2[1];
        // console.log('numWithThousand', numWithThousand);

        return numWithThousand;
    }



}