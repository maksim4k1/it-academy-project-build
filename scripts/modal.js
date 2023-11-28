const modalEl = document.getElementById("modal");
const closeModalFormButtonEl = document.getElementById("close-modal-form-button");
const closeModalButtonEl = document.getElementById("close-modal-button");
const openModalButtonEl = document.getElementById("open-modal-button");

let modalIsOpen = false;

function closeButtonHandler(){
  if(modalIsOpen){
    document.body.style.overflow = "auto";
    modalEl.classList.remove("modal--opened");
  } else{
    document.body.style.overflow = "hidden";
    modalEl.classList.add("modal--opened");
  }

  modalIsOpen = !modalIsOpen;
}

closeModalFormButtonEl.onclick = closeButtonHandler;
closeModalButtonEl.onclick = closeButtonHandler;
openModalButtonEl.onclick = closeButtonHandler;