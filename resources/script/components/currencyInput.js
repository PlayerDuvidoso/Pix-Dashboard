import CurrencyParser from "../utils/currencyParser.js";

class CurrencyInput {
    
    constructor(currency) {
        this.parser = new CurrencyParser(currency);

        this.inputElement = document.createElement("input");
        this.inputElement.classList.add("currency-dialog-input")
        this.inputElement.type = "text"
        this.inputElement.dir = "rtl"
        this.inputElement.name = "value"

        this.inputElement.addEventListener("input", this.inputEventHandler.bind(this));
        this.inputElement.addEventListener("keydown", this.keyPressEventHandler.bind(this));
        this.inputElement.addEventListener("mousedown", (Event) => Event.preventDefault());
        this.inputElement.addEventListener("click", () => this.inputElement.focus());

    };

    inputEventHandler(Event) {
        const newValueArr = this.extractInput()

        switch (Event.inputType) {
            case "insertText": //Insertion logic
                if (newValueArr[0] == 0) {
                    newValueArr.shift()
                    this.inputElement.value = newValueArr
                }

                this.formatInput(newValueArr)
                break;
            
            case "deleteContentBackward": //Deletion logic
                if (newValueArr.length < 3) {
                    newValueArr.unshift("0")
                    this.formatInput(newValueArr)
                }

                this.formatInput(newValueArr)
                break;
            
            case "insertFromPaste": //Prevents pasting
                this.formatInput(newValueArr)    
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
            const confirmEvent = new CustomEvent("confirm", {detail: {value: this.getValue()}})
            this.inputElement.dispatchEvent(confirmEvent)
            this.inputElement.blur()
            return
        };

        if (pressedKey === "Escape") {
            const cancelSaleEvent = new CustomEvent("cancel")
            this.inputElement.dispatchEvent(cancelSaleEvent)
            return
        };
    };

    formatInput(value) {

        if (!value) {
            value = "000".split("")
        }

        const formatedValue = this.parser.format(value.join(""))
        this.inputElement.value = formatedValue
    };

    resetInput() {
        this.inputElement.setSelectionRange(-1, -1);
        this.formatInput();
    };
    
    getValue() {
        return this.inputElement.value
    };
    
    extractInput() {
        return this.parser.extract(this.getValue()).split("")
    };

    render() {
        return this.inputElement
    }
};

export default CurrencyInput;