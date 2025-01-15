import Table from "./components/tableComponent.js";
import CustomModal from "./components/currencyModal.js";

const registerSaleBtn = document.querySelector(".summary button");

const tableComponent = new Table(".table-container table");

registerSaleBtn.addEventListener("click", () => {
    const modal = new CustomModal("Adicionar Pix")
    registerSaleBtn.disabled = true;
    modal.show()

    modal.dialogElement.addEventListener("confirm", (Event) => {
        const inputValue = Event.detail.value
        tableComponent.addRow(inputValue)
        setTimeout(() => {registerSaleBtn.disabled = false;}, 1)
        modal.close()
    });

    modal.dialogElement.addEventListener("cancel", (Event) => {
        setTimeout(() => {registerSaleBtn.disabled = false;}, 1)
        modal.close()
    });
});