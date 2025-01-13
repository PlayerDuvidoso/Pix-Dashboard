import CurrencyParser from "../utils/currencyParser.js";


class CurrencyInput {
    
    constructor(query, currency) {
        this.parser = new CurrencyParser(currency);
        
        this.inputElement = document.querySelector(query);

        this.inputElement.addEventListener("input", this.inputEventHandler.bind(this));
        this.inputElement.addEventListener("keydown", this.keyPressEventHandler.bind(this));
        this.inputElement.addEventListener("mousedown", (Event) => Event.preventDefault());
        this.inputElement.addEventListener("click", () => this.inputElement.focus());

    };
    
    resetInput() {
        this.inputElement.setSelectionRange(-1, -1);
        this.formatInput("000");
    };

    inputEventHandler(Event) {
        const newValueArr = this.parseInput(this).split("")

        switch (Event.inputType) {
            case "insertText": //Insertion logic
                if (newValueArr[0] == 0) {
                    newValueArr.shift()
                    this.valueArr = newValueArr.join("")
                    this.inputElement.value = this.valueArr
                }

                this.valueArr = newValueArr.join("")
                this.formatInput(this.valueArr)
                break;
            
            case "deleteContentBackward": //Deletion logic
                if (newValueArr.length < 3) {
                    newValueArr.unshift("0")
                    this.valueArr = newValueArr.join("")
                    this.updateInput(this.valueArr)
                }

                this.valueArr = newValueArr.join("")
                this.formatInput(this.valueArr)
                break;
            
            case "insertFromPaste": //Prevents pasting
                this.formatInput(this.valueArr)    
                break;
        };
    };

    keyPressEventHandler(Event) {
        const pressedKey = String(Event.key)
        const allowedKeys = ["Backspace", "Enter", "Escape"]

        //prevents letters and especial keys
        if (isNaN(pressedKey) && !allowedKeys.includes(pressedKey)) {
            Event.preventDefault()
            return
        };

        if (pressedKey === "Enter") {
            const addSaleEvent = new CustomEvent("addSaleRequested", {detail: {value: this.getValue()}})
            this.inputElement.dispatchEvent(addSaleEvent)
            return
        };

        if (pressedKey === "Escape") {
            const cancelSaleEvent = new CustomEvent("addSaleCanceled")
            this.inputElement.dispatchEvent(cancelSaleEvent)
            return
        };
    };

    formatInput(value) {
        const formatedValue = this.parser.format(value)
        this.updateInput(formatedValue)
    };

    parseInput() {
        return this.parser.extract(this.getValue())
    };

    getValue() {
        return this.inputElement.value
    };

    updateInput(value) {
        this.inputElement.value = value
    };
};

export default CurrencyInput;