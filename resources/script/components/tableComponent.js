import CurrencyParser from "../utils/currencyParser.js"
import Summary from "./summaryComponent.js";
import CustomModal from "./currencyModal.js";

class TableRow {

    constructor(value) {

        this.editValueModal = new CustomModal("Editar Valor")

        this.tableRowElement = document.createElement("tr");

        this.hourElement = document.createElement("td");
        this.hourElement.innerText = this.getCurrentTime();
        this.hourElement.classList.add("sale-time");

        this.valueElement = document.createElement("td");
        this.valueElement.classList.add("sale-value");
        this.valueText = document.createElement("span");
        this.valueText.innerText = value;
        this.valueElement.appendChild(this.valueText);
        
        this.removeIco = document.createElement("i");
        this.removeIco.classList.add("fa-solid", "fa-trash")
        
        this.removeBtnElement = document.createElement("button");
        this.removeBtnElement.appendChild(this.removeIco);
        this.removeBtnElement.type = "button";
        this.removeBtnElement.addEventListener("click", () => {this.remove()})
        
        this.valueElement.appendChild(this.removeBtnElement);
        
        this.tableRowElement.appendChild(this.hourElement);
        this.tableRowElement.appendChild(this.valueElement);

        this.valueText.addEventListener("click", () => {
            this.editValueModal.show();
            this.editValueModal.dialogElement.addEventListener("confirm", this.handleConfirmEvent.bind(this))
            this.editValueModal.dialogElement.addEventListener("cancel", this.handleCancelEvent.bind(this))
        })
    };

    handleConfirmEvent(Event) {
        this.valueText.innerText = Event.detail.value;
        this.editValueModal.close();
        this.editValueModal.dialogElement.removeEventListener("confirm", this.handleConfirmEvent);
    };

    handleCancelEvent() {
        this.editValueModal.close();
        this.editValueModal.dialogElement.removeEventListener("cancel", this.handleCancelEvent);
    };

    getCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString("pt-BR", {hour: '2-digit', minute: '2-digit'});
        return timeString;
    };

    render() {
        return this.tableRowElement;
    };

    remove() {
        this.tableRowElement.remove();
    };
};

class Table {

    constructor(query) {
        this.parser = new CurrencyParser();
        this.summary = new Summary("#dailyTotal");
        this.tableElement = document.querySelector(query);
        this.tableValue = this.getTotalValue();

        this.observer = new MutationObserver(mutations => {
            this.tableValue = this.getTotalValue();
            this.summary.updateValue(this.tableValue);
            this.checkTable(this.tableElement.querySelectorAll(".sale-value"));
        })

        const config = { childList: true, subtree: true};
        this.observer.observe(this.tableElement, config);

    };

    addRow(value) {
        const newRow = new TableRow(value);
        this.tableElement.appendChild(newRow.render());
    };

    getTotalValue() {
        const tableData = this.tableElement.querySelectorAll(".sale-value");
        let partialValue = 0;
        
        if (!this.checkTable(tableData)) {
            return 0;
        };

        tableData.forEach(element => {
            partialValue += Number(this.parser.extract(element.innerText));
        });

        return this.parser.format(partialValue);
    };
    
    checkTable(tableData) {
        
        if (tableData.length <= 0) {
            this.tableElement.hidden = true;
            this.summary.updateValue(this.parser.format("000"));
            return false;
        } else if (tableData.length >= 1) {
            this.tableElement.hidden = false;
            return true;
        };
    };
};

export default Table;