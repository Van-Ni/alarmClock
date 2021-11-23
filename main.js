const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const input = document.getElementById('inputNumber');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const audio = document.getElementById('audio');
const intro = document.querySelector('.gif-intro');
const goal = document.querySelector('.my-goal');
const clockBtn = document.querySelectorAll('.clock__btn');
// modal
const iconImg = document.querySelector('.header-app__right img');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector(".modal-container");
const closeIcon = document.querySelector('.close-icon');
const time25 = document.getElementById('clock-icon--25');
const time5 = document.getElementById('clock-icon--5');
const time10 = document.getElementById('clock-icon--10');
// btn time 
const timeBtns = document.querySelectorAll(".clock-icon--default");

let ID;
let time; 
let timeCur;
let secCur ; 
let minCur;
timeBtns.forEach(function(btn){
    btn.onclick = function(e) {
        $('.clock-icon--default.active').classList.remove('active');
        this.classList.add('active');
        const activeElement = e.currentTarget.classList;
        const value = $('.clock-icon--default.active').value;
        if(activeElement.contains('active') && value == time25.value)
        {
            startBtn.onclick = function() {
                doCount();
            };
        }else if(activeElement.contains('active') && value == time5.value)
        {
            startBtn.onclick = function() {
                doCount5();
            }
        }
        else{
            startBtn.onclick = function() {
                doCount10();
            }
        }
    }
})
function doCount(){
     let doCount25 =  time25.value * 60;
     if(doCount25){
         ID = setInterval(function() {
             sec.innerHTML = doCount25 % 60;
             min.innerHTML = parseInt(doCount25 / 60);
             doCount25--;
     startBtn.setAttribute("disabled" , "disabled");
             if(sec.innerHTML == 0 && min.innerHTML == 0)
             {
                 clearInterval(ID);
                 audio.play();
                 startBtn.removeAttribute('disabled', 'disabled');
                 goal.classList.add('display-goal');
             }
        },1000);
     }
}
function doCount5(){
     let doCount5 = time5.value * 60;
     
     if(doCount5){
         ID = setInterval(function() {
             sec.innerHTML = doCount5 % 60;
             min.innerHTML = parseInt(doCount5 / 60);
             doCount5--;
     startBtn.setAttribute("disabled" , "disabled");
             if(sec.innerHTML == 0 && min.innerHTML == 0)
             {
                 clearInterval(ID);
                 audio.play();
                 startBtn.removeAttribute('disabled', 'disabled');
                 goal.classList.add('display-goal');
             }
        },1000);
     }
}
function doCount10(){
     let doCount10 = time10.value * 60;
     
     if(doCount10){
         ID = setInterval(function() {
             sec.innerHTML = doCount10 % 60;
             min.innerHTML = parseInt(doCount10 / 60);
             doCount10--;

     startBtn.setAttribute("disabled" , "disabled");
             if(sec.innerHTML == 0 && min.innerHTML == 0)
             {
                 clearInterval(ID);
                 audio.play();
                 startBtn.removeAttribute('disabled', 'disabled');
                 goal.classList.add('display-goal');
             }
        },1000);
     }
}
resetBtn.onclick = function() {
    startBtn.removeAttribute('disabled', 'disabled');
    clearInterval(ID);
    sec.innerHTML = 00;
    min.innerHTML = 00;
}

// modal
iconImg.onclick = function() {
    modal.classList.add("active");
}
closeIcon.onclick = function() {
    modal.classList.remove("active");
}
modal.onclick = function() {
    modal.classList.remove("active");
}
modalContainer.onclick = function(event) {
    event.stopPropagation();
}

// history
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("Đã thêm vào danh sách", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Đã thay đổi", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Bạn chưa nhập dữ liệu", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Danh sách trống", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Đã xóa", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "Sửa";
}
// set backt to defaults
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Thêm";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}