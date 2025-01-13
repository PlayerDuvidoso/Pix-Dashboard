import CurrencyParser from "../utils/currencyParser.js";

class Summary {
    constructor(query) {
        this.parser = new CurrencyParser()
        this.summaryElement = document.querySelector(query);
    };

    updateValue(value) {
        this.summaryElement.innerText = value
    }

};

export default Summary;