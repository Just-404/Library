const library = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read === true? "been read." : "not read yet.");
    }
}

const dialog = document.querySelector("dialog");
const openDialog = document.querySelector("#show-modal");
const closeDialog = document.querySelector("#cancel-book-btn");

openDialog.addEventListener('click', (e) =>{
    dialog.showModal();
});

closeDialog.addEventListener('click', (e)=>{
    dialog.close();
});