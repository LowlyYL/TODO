//initializationElem
let arrayOfTodo = [];

//findElem
let callModal = document.querySelector('.container-content-header__addTodo');
let modalWindow = document.querySelector('.modalWindow');
let modalWindowBtnAdd = document.querySelector('.modalWindow-container__btn');
let containerOfTodoItem = document.querySelector('.container-content-main__TodoContainer');
let modalWindowTitle = document.querySelector('.modalWindow__input-title');
let modalWindowTextarea = document.querySelector('.modalWindow__textarea');
let mainContainer = document.querySelector('.container-content-main');
let footer = document.querySelector('.container-content-footer');

let delThisTodo = document.querySelector('.container-content-header__delThisTodo');
let delAllTodo = document.querySelector('.container-content-header__delAllTodo');

let rightArrowOfPagination = document.querySelector('.rightArrowOfPagination')
let leftArrowOfPagination = document.querySelector('.leftArrowOfPagination')

//function
function createNewTodo() {
    modalWindow.style = `display: block`;
}

function addTodoOnArr() {
    let newTodo = document.createElement('div');
    
    if(arrayOfTodo.length === 0) {
        newTodo.setAttribute('class', 'TodoContainer-item active')
        containerOfTodoItem.append(newTodo)
        let paginationContainer = document.querySelector('.footer-paginationContainer');
        paginationContainer.style = `display: flex`;
    } else {
        newTodo.setAttribute('class', 'TodoContainer-item')
    }

    newTodo.style = `
    height: 100%;
    width: 500px;
    box-shadow: rgb(0 0 0 / 70%) 15px 0px 35px 70px;
    background-color: rgb(0 0 0 / 70%)`

    let titleOfNewTodo = document.createElement('div');
    titleOfNewTodo.style = `
    height: 20%;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #fff;`

    let pTitle = document.createElement('p');
    pTitle = modalWindowTitle.value;

    let textareaOfNewTodo = document.createElement('div');
    textareaOfNewTodo.style = `
    height: 80%;
    max-width: 500px;
    display: flex;
    justify-content: start;
    font-size: 16px;
    color: #fff;
    padding: 30px;
    overflow-wrap: anywhere;`

    let pTextarea = document.createElement('p');
    pTextarea = modalWindowTextarea.value;

    titleOfNewTodo.append(pTitle)
    textareaOfNewTodo.append(pTextarea)
    newTodo.append(titleOfNewTodo, textareaOfNewTodo)

    modalWindow.style = `display: none`;

    arrayOfTodo.push(newTodo)

    mainContainer.style = `display: flex`;
    
    if(arrayOfTodo.length > 1) {
        footer.style = `display: flex`;
    }

    modalWindowTitle.value = '';
    modalWindowTextarea.value = '';
}

function newCircle() {
    let itemOnContainer = containerOfTodoItem.querySelector('.active');
    itemOnContainer.classList.remove('class')
    itemOnContainer.setAttribute('class', 'TodoContainer-item')
    itemOnContainer.remove();

    let itemOfNewCircle = arrayOfTodo[0]
    itemOfNewCircle.setAttribute('class', 'TodoContainer-item active');

    containerOfTodoItem.append(itemOfNewCircle)
}

function nextTODO(index) {
    let itemNextTODO = arrayOfTodo[index + 1];
    itemNextTODO.setAttribute('class', 'TodoContainer-item active');

    let itemOnContainer = containerOfTodoItem.querySelector('.active');
    itemOnContainer.setAttribute('class', 'TodoContainer-item')
    itemOnContainer.remove();

    containerOfTodoItem.append(itemNextTODO);
}

function indexPenult() {
    return arrayOfTodo.findIndex((item) => item === arrayOfTodo[arrayOfTodo.length-2])
}

//Event
callModal.onclick = () => {
    mainContainer.style = `display: none`;
    footer.style = `display: none`;
    createNewTodo();
};

modalWindowBtnAdd.onclick = addTodoOnArr;

rightArrowOfPagination.addEventListener("click", () => {
    let index = arrayOfTodo.findIndex((item) => item === containerOfTodoItem.querySelector('.active'))
    arrayOfTodo[arrayOfTodo.length-1] === arrayOfTodo[index] ? newCircle() : nextTODO(index)
})

leftArrowOfPagination.addEventListener("click", () => {
    let index = arrayOfTodo.findIndex((item) => item === containerOfTodoItem.querySelector('.active'))
    let Penult = indexPenult()
    arrayOfTodo[0] === arrayOfTodo[index] ? nextTODO(Penult) : nextTODO(index-2)
})

delAllTodo.onclick = () => {
    if(arrayOfTodo.length !== 0) {
    let itemOnContainer = containerOfTodoItem.querySelector('.active');
    itemOnContainer.remove();
    arrayOfTodo = [];
    footer.style = `display: none`;
    }
}

delThisTodo.onclick = () => {
    if(arrayOfTodo.length !== 0 && arrayOfTodo.length !== 1) {
        let index = arrayOfTodo.findIndex((item) => item === containerOfTodoItem.querySelector('.active'))
        arrayOfTodo[arrayOfTodo.length-1] === arrayOfTodo[index] ? newCircle() : nextTODO(index)
        arrayOfTodo.splice(index, 1);
    } else if(arrayOfTodo.length !== 0) {
        let itemOnContainer = containerOfTodoItem.querySelector('.active');
        itemOnContainer.remove();
        arrayOfTodo = [];
        footer.style = `display: none`;
    }
    if(arrayOfTodo.length === 1) {
        footer.style = `display: none`;
    }  
}