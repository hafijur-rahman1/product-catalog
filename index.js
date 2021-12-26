console.log("hello");

const formElm = document.querySelector("form");
const nameInputElm = document.querySelector(".product-name");
const priceInputElm = document.querySelector(".product-price");
const listGroupElm = document.querySelector(".list-group");
const filterElm = document.querySelector("#filter");

//traking item
let products = [];

formElm.addEventListener("click", (evt) => {
  evt.preventDefault();
  const { nameInput, priceInput } = receiveInputs();

  //validate input
  const isError = validateInput(nameInput, priceInput);
  if (!isError) {
    //add item to data store
    //generate id
    const id = products.length;
    products.push({
      id: id,
      name: nameInput,
      price: priceInput,
    });
    console.log(products);
    //add item to UI
    addItemToUi(id, nameInput, priceInput);

    //reseet input
    resetInput();
  }
});
filterElm.addEventListener("keyup", (evt) => {
  const filterValue = evt.target.value;
  const filteredArr = products.filter((product) =>
    product.name.includes(filterValue)
  );
  showAllItemToUi(filteredArr);
  //   console.log(result);
});

function showAllItemToUi(items) {
  listGroupElm.innerHTML = "";
  items.forEach((item) => {
    const listElm = `<li class="list-group-item item-${item.id} collection-item">
            <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
          </li>`;
    listGroupElm.insertAdjacentHTML("afterbegin", listElm);
  });
}
//delet item(event delegation)
listGroupElm.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-item")) {
    const id = getItemId(evt.target);
    //delete item from ui
    removeItemFromUi(id);

    //delete item from data store
    removeItemFromDataStore(id);
  }
});

//remove from ui function
function removeItemFromUi(id) {
  document.querySelector(`.item-${id}`).remove();
}

//remove from database function
function removeItemFromDataStore(id) {
  const productsAfterDelet = products.filter((product) => product.id !== id);
  products = productsAfterDelet;
}
//delete function
function getItemId(elm) {
  const liElm = elm.parentElement;
  return Number(liElm.classList[1].split("-")[1]);
}
//reset input function
function resetInput() {
  nameInputElm.value = "";
  priceInputElm.value = "";
}

//add input in UI function
function addItemToUi(id, name, price) {
  const listElm = `<li class="list-group-item item-${id} collection-item">
            <strong>${name}</strong>- <span class="price">$${price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
          </li>`;
  listGroupElm.insertAdjacentHTML("afterbegin", listElm);
}

//validation function
function validateInput(name, price) {
  let isError = false;
  if (!name || name.length < 4) {
    isError = true;
  }
  if (!price || Number(price) <= 0) {
    isError = true;
  }
  return isError;
}

function receiveInputs() {
  const nameInput = nameInputElm.value;
  const priceInput = priceInputElm.value;
  return {
    nameInput,
    priceInput,
  };
}
