import CurrencyParser from "../utils/currencyParser.js"
import Summary from "./summaryComponent.js";

class TableRow {

    constructor(hour, value) {
        this.tableRowElement = document.createElement("tr");

        this.hourElement = document.createElement("td");
        this.hourElement.innerText = hour;
        this.hourElement.classList.add("sale-time");

        this.valueElement = document.createElement("td");
        this.valueElement.classList.add("sale-value");
        this.valueElement.innerText = value;

        
        this.removeIco = document.createElement("i");
        this.removeIco.classList.add("fa-solid", "fa-trash")
        
        this.removeBtnElement = document.createElement("button");
        this.removeBtnElement.appendChild(this.removeIco);
        this.removeBtnElement.type = "button";
        this.removeBtnElement.addEventListener("click", () => {this.remove()})

        this.valueElement.appendChild(this.removeBtnElement);

        this.tableRowElement.appendChild(this.hourElement);
        this.tableRowElement.appendChild(this.valueElement);
    };

    render() {
        return this.tableRowElement;
    };

    remove() {
        this.tableRowElement.remove();
    };

    //TODO: Move the time function to TableRow
};

class Table {

    constructor(query) {
        this.parser = new CurrencyParser();
        this.summary = new Summary("#dailyTotal");
        this.tableElement = document.querySelector(query);
        this.tableValue = this.getTotalValue();

        this.observer = new MutationObserver(mutations => {
            this.tableValue = this.getTotalValue()
            this.summary.updateValue(this.tableValue)
            this.checkTable(this.tableElement.querySelectorAll(".sale-value"))
        })

        const config = { childList: true, subtree: true}
        this.observer.observe(this.tableElement, config)

    };

    addRow(value) {
        const now = new Date();
        const timeString = now.toLocaleTimeString("pt-BR", {hour: '2-digit', minute: '2-digit'});
        const newRow = new TableRow(timeString, value);
        this.tableElement.appendChild(newRow.render());
    };

    getTotalValue() {
        const tableData = this.tableElement.querySelectorAll(".sale-value");
        let partialValue = 0;
        
        if (!this.checkTable(tableData)) {
            return 0;
        };

        tableData.forEach(element => {
            partialValue += Number(this.parser.extract(element.innerText))
        });

        return this.parser.format(partialValue);
    };
    
    checkTable(tableData) {
        
        if (tableData.length <= 0) {
            this.tableElement.hidden = true;
            this.summary.updateValue(this.parser.format("000"))
            return false
        } else if (tableData.length >= 1) {
            this.tableElement.hidden = false;
            return true
        };
    };

};

export default Table;