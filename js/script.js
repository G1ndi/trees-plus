const modalOpen = document.querySelectorAll("#open__modal"); 
const modalClose = document.querySelectorAll("#close__modal"); 
const body = document.body;

if(modalOpen){
  modalOpen.forEach(btn => {
        btn.addEventListener("click", function(){
            document.getElementById("my-modal").classList.add("open");
            body.classList.add("_locked");
            window.scrollBy(0, 0)
          });
    })
}

if(modalClose){
    modalClose.forEach(btn => {
          btn.addEventListener("click", function(){
            document.getElementById("my-modal").classList.remove("open")
            body.classList.remove("_locked");
            });
      })
  }

  window.addEventListener('keydown', (e) =>{
    if(e.key == "Escape"){
        document.getElementById("my-modal").classList.remove("open")
        body.classList.remove("_locked");
    }
  });

  document.querySelector("#my-modal .modal-body").addEventListener('click', event =>{
    event._isClickWithInModal = true;
  });
  document.querySelector("#my-modal").addEventListener('click', event =>{
    if(  event._isClickWithInModal) return;
    event.currentTarget.classList.remove("open");
    body.classList.remove("_locked");
  });