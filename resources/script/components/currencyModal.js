import CurrencyInput from "./currencyInput.js"

class DialogInput {

    constructor(label) {
        this.currencyInput = new CurrencyInput("R$");

        this.inputContainer = document.createElement("div");
        this.inputContainer.classList.add("currency-dialog-container");

        const dialogLabel = document.createElement("label");
        dialogLabel.htmlFor = "value";
        dialogLabel.innerText = label;

        this.inputContainer.appendChild(dialogLabel);
        this.inputContainer.appendChild(this.getInputElement());
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

    getInputElement() {
        return this.currencyInput.render();
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

    getConfirmBtn() {
        return this.confirmBtn
    }

    getCancelBtn() {
        return this.cancelBtn
    }
};

class CustomModal {

    constructor(title) {
        this.dialogInput = new DialogInput(title);
        this.dialogButtons = new DialogButtons();

        this.dialogElement = document.createElement("dialog");
        this.dialogElement.classList.add("currency-dialog");

        this.dialogContainer = document.createElement("div");
        this.dialogContainer.classList.add("currency-input-container");

        this.dialogContainer.appendChild(this.dialogInput.render());
        this.dialogContainer.appendChild(this.dialogButtons.render());
        this.dialogElement.appendChild(this.dialogContainer);

    };

    show() {
        document.body.appendChild(this.dialogElement)
        const input = this.dialogInput.getInputElement();

        this.dialogInput.resetInput();
        this.dialogElement.showModal();

        input.addEventListener("confirm", this.handleConfirmEvent.bind(this))
        input.addEventListener("cancel", this.handleCancelEvent.bind(this))
        this.dialogButtons.getConfirmBtn().addEventListener("click", this.handleConfirmEvent.bind(this))
        this.dialogButtons.getCancelBtn().addEventListener("click", this.handleCancelEvent.bind(this))
    };

    close() {
        this.dialogElement.close();
        this.dialogElement.remove()
    };

    handleConfirmEvent(Event) {
        const inputValue = this.dialogInput.getInputValue()
        const onConfirm = new CustomEvent("confirm", {detail: {value: inputValue}})
        this.dialogElement.dispatchEvent(onConfirm)
    };

    handleCancelEvent(Event) {
        const onCancel = new CustomEvent("cancel")
        this.dialogElement.dispatchEvent(onCancel)
    };

};

export default CustomModal;