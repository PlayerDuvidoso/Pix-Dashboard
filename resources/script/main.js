import CurrencyInput from "./components/currencyInput.js";
import Table from "./components/tableComponent.js";
import Modal from "./components/modalComponent.js";

const registerSaleBtn = document.querySelector(".summary button");

const tableComponent = new Table(".table-container table");
const currencyInput = new CurrencyInput(".sale-modal-input", "R$");
const modal = new Modal("#add-new-sale")

currencyInput.inputElement.addEventListener("addSaleRequested", () => {
    
    registerSaleBtn.disabled = true;
    tableComponent.addRow(currencyInput.getValue())

    modal.close();
    setTimeout(() => {registerSaleBtn.disabled = false}, 1)

});

currencyInput.inputElement.addEventListener("addSaleCanceled", () => {

    modal.close();

})

registerSaleBtn.addEventListener("click", () => {

    modal.show();
    currencyInput.resetInput();
    
});

const addSaleBtn = document.querySelector(".add-sale-btn");
addSaleBtn.addEventListener("click", () => {

    tableComponent.addRow(currencyInput.getValue());
    modal.close();
});

const closeSaleBtn = document.querySelector(".close-sale-btn");
closeSaleBtn.addEventListener("click", () => {

    modal.close();
});