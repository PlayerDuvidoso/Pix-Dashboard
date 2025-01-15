import CurrencyParser from "../utils/currencyParser.js";

class Summary {
    constructor(query) {
        this.parser = new CurrencyParser()
        this.summaryElement = document.querySelector(query);
    };

    updateValue(value) {
        this.summaryElement.innerText = value
    }
    //TODO: Fix value less than 0,00 BUG
};

export default Summary;