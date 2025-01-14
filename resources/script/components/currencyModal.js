import CurrencyInput from "./moneyInput.js"

class DialogInput {

    constructor(label) {
        this.inputId = crypto.randomUUID()
        this.currencyInput = new CurrencyInput("R$", this.inputId);

        this.inputContainer = document.createElement("div");
        this.inputContainer.classList.add("currency-dialog-container");

        const dialogLabel = document.createElement("label");
        dialogLabel.htmlFor = "value";
        dialogLabel.innerText = label;

        this.inputContainer.appendChild(dialogLabel);
        this.inputContainer.appendChild(this.currencyInput.render());
    }

    render() {
        return this.inputContainer;
    }

    resetInput() {
        this.currencyInput.resetInput();
    };

    getInputValue() {
        return this.currencyInput.getValue();
    };
};

class DialogButtons {

    constructor() {
        this.btnsContainer = document.createElement("div");
        this.btnsContainer.classList.add("currency-dialog-btns");

        this.cancelBtn = document.createElement("button");
        this.cancelBtn.classList.add("close-sale-btn");
        this.cancelBtn.type = "button";
        this.cancelBtn.innerText = "Cancelar";

        this.confirmBtn = document.createElement("button");
        this.confirmBtn.classList.add("add-sale-btn");
        this.confirmBtn.type = "button";
        this.confirmBtn.innerText = "Confirmar";

        this.btnsContainer.appendChild(this.cancelBtn);
        this.btnsContainer.appendChild(this.confirmBtn);

    };

    render() {
        return this.btnsContainer;
    };
};

class CustomModal {

    constructor(title) {
        this.dialogInput = new DialogInput(title);
        this.dialogButtons = new DialogButtons();

        this.dialogElement = document.createElement("dialog");
        document.body.appendChild(this.dialogElement)
        this.dialogElement.classList.add("currency-dialog");

        this.dialogContainer = document.createElement("div");
        this.dialogContainer.classList.add("currency-input-container");

        this.dialogContainer.appendChild(this.dialogInput.render());
        this.dialogContainer.appendChild(this.dialogButtons.render());
        this.dialogElement.appendChild(this.dialogContainer);

    };

    show() {
        this.dialogInput.resetInput();
        this.dialogElement.showModal();
    };

    close() {
        this.dialogElement.close();
    }

    getInputId() {
        return this.dialogInput.inputId
    }

};

export default CustomModal;