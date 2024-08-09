class library{
    library = [];

    getBook(idx){
        return this.library[idx];
    }

    addBook(book){
        this.library.push(book);
    }

    delBook(idx){
        this.library.splice(idx, 1);
    }

}

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){
        const info = `${this.title}, ${this.author}, ${this.pages},` + (this.read === 'true'? "Yesss!" : "Not yet");
        return info.split(',');
    }

    changeStatus(){
        this.read === 'true' ? this.read = 'false' : this.read = 'true';
    }

    get readStatus(){
        return this.info().pop(',');
    }
}

const myLibrary = new library;
const submit = document.querySelector("#add-book-btn");

submit.addEventListener("click", addBookToLibrary, false);

const dialog = document.querySelector("dialog");
const openDialog = document.querySelector("#show-modal");
const closeDialog = document.querySelector("#cancel-book-btn");

openDialog.addEventListener('click', (e) =>{
    dialog.showModal();
});

closeDialog.addEventListener('click', (e)=>{
    dialog.close();
});

function addBookToLibrary(event){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numPages = document.querySelector("#num-pages").value;
    const read = document.querySelector("input[name='read-option']:checked").value;
    
    const newBook = new Book(title, author, numPages, read);
    myLibrary.addBook(newBook);

    clear();
    displayBookInfo(newBook);
    event.preventDefault();
}

function displayBookInfo(book){
    const main = document.querySelector("main");
    const bookCard = document.createElement("div");
    bookCard.classList.add("books");

    bookCard.dataset.bookPosition = "";

    main.appendChild(bookCard);

    const bookInfo = book.info();

    const h2Array = ["Title:", "Author:", "Pages:", "Read:"]

    h2Array.forEach((elem, idx) => {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const output = document.createElement("output");

        bookCard.appendChild(div);
        h2.textContent = elem;


        output.textContent = bookInfo[idx]   
        div.appendChild(h2);
        div.appendChild(output);

    });  

    createBookBtns(bookCard);
    

}

function createBookBtns(bookCard){
    const btnsDiv = document.createElement("div");
    const delBtn = document.createElement("button");
    const statusBtn = document.createElement("button");

    delBtn.classList.add("book-buttons");
    delBtn.textContent = "Delete";

    statusBtn.classList.add("book-buttons");
    statusBtn.textContent = "Status <-->";

    bookCard.appendChild(btnsDiv);
    btnsDiv.appendChild(delBtn);
    btnsDiv.appendChild(statusBtn);

    delBtn.addEventListener("click", (e) =>{
        
        let bookPos = e.target.closest("[data-book-position]");
        deleteBook(bookPos.dataset.bookPosition);
    });

    statusBtn.addEventListener("click", (e) => {
        let book = e.target.closest("[data-book-position]");
        changeReadStatus(book);

    })

    const booksPos = document.querySelectorAll('[data-book-position]')
    updateBookPosition(booksPos);
}

function clear(){
    const reset = document.querySelector("button[type=reset]");
    reset.click();
    dialog.close();
}

function updateBookPosition(arr){

    arr.forEach((book, idx) => {
        book.setAttribute('data-book-position', idx);
    })
}

function deleteBook(bookIndex){
    myLibrary.delBook(bookIndex); 

    const del = document.querySelector(`[data-book-position="${bookIndex}"]`);  
    del.remove();

    const updateBookInfo = document.querySelectorAll("[data-book-position]");
    updateBookPosition(updateBookInfo);
    
}

function changeReadStatus(book){
    const bookIndex = book.dataset.bookPosition;
    myLibrary.getBook(bookIndex).changeStatus();
    
    const output = book.querySelector(".books div:nth-child(4) output");
    
    output.textContent = myLibrary.getBook(bookIndex).readStatus;

}


//Default books:

const book1 = new Book("The Lord Of The Rings", "J.R.R Tolkien", 1216, "false");
myLibrary.addBook(book1);
displayBookInfo(book1);

const book2 = new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, "false")
myLibrary.addBook(book2)
displayBookInfo(book2);

const book3 = new Book("Moby-Dick", "Herman Melville", 635, "false")
myLibrary.addBook(book3)
displayBookInfo(book3);

const book4 = new Book("Percy Jackson & the Olympians: The Lightning Thief", "Rick Riordan", 377, "false")
myLibrary.addBook(book4)
displayBookInfo(book4);


