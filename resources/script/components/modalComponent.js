class Modal {
    constructor(query) {
        this.modalElement = document.querySelector(query);
        this.addSaleBtn = this.modalElement.querySelector(".add-sale-btn");
        this.closeSaleBtn = this.modalElement.querySelector(".close-sale-btn");

        //TODO: Handle the add and cancel buttons
    };

    show() {
        this.modalElement.showModal();
    };

    close() {
        this.modalElement.close();
    };

};

export default Modal;