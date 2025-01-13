class CurrencyParser {
    
    constructor(currency="R$") {
        this.currency = currency;
    };

    format(number) {
        const valueStr = String(number);
        const formatedValue = `${this.currency} ${valueStr.slice(0, -2)},${valueStr.slice(-2)}`;

        return formatedValue;
    };

    extract(string) {
        return string.replace(/[^0-9]/g, '');
    };
};

export default CurrencyParser;