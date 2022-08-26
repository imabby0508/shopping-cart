import "./scss_dir/main.scss";

const cartItemsWrapper = document.querySelector(".cart-items-wrapper");
const shippingRadioBtns = document.querySelectorAll('input[name="shipping"]');
const totalShippingFee = document.querySelector(".total-shipping-fee");
const totalAmount = document.querySelector(".total-amount");
const stepperPanel = document.querySelector(".stepper-panel");
const steps = stepperPanel.querySelectorAll(".step");
const form = document.querySelector(".form");
const formParts = form.querySelectorAll(".part");
const btnPanel = document.querySelector(".button-panel");
const nextBtn = btnPanel.querySelector(".btn-next");
const prevBtn = btnPanel.querySelector(".btn-previous");
const finishBtn = btnPanel.querySelector(".btn-finish");

let step = 0;
let shippingFee = 0;
let checkoutAmount = 0;

let cartItems = [
  {
    id: 0,
    name: "破壞補丁修身牛仔褲",
    image: "/src/image/cart-item-1.png",
    quantity: 1,
    price: 3999,
  },
  {
    id: 1,
    name: "刷色直筒牛仔褲",
    image: "/src/image/cart-item-2.png",
    quantity: 1,
    price: 1299,
  },
];

function renderCartItems() {
  cartItems.forEach((item) => {
    cartItemsWrapper.innerHTML += `
    <div class="cart-item-wrapper d-flex" id="${item.id}">
      <img
        src="${item.image}"
        alt="cart-item"
        class="cart-item__image"
      />
      <div class="cart-item-details d-flex">
        <p class="cart-item__name">${item.name}</p>
        <div class="cart-item-quantity-wrapper d-flex">
          <div class="minus-container" id="${item.id}">-</div>
          <div class="cart-item__quantity">${item.quantity}</div>
          <div class="plus-container" id="${item.id}">+</div>
        </div>
        <p class="cart-item__price">$${item.price.toLocaleString("en-US")}</p>
      </div>
    </div>
    `;
  });
}

function cartItemsClicked(e) {
  const id = e.target.id;
  const parentElement = e.target.parentElement;
  let quantity = 0;
  let subAmount = 0;
  if (e.target.matches(".plus-container")) {
    quantity = cartItems[id].quantity += 1;
    subAmount = cartItems[id].price * quantity;
  } else if (
    e.target.matches(".minus-container") &&
    cartItems[id].quantity > 0
  ) {
    quantity = cartItems[id].quantity -= 1;
    subAmount = cartItems[id].price * quantity;
  } else {
    return;
  }
  parentElement.children[1].innerHTML = quantity;
  parentElement.nextElementSibling.innerHTML = `$${subAmount.toLocaleString(
    "en-US"
  )}`;
  checkoutTotalAmount();
}

function shippingChosen(e) {  
  for (const shippingRadioBtn of shippingRadioBtns) {
    shippingRadioBtn.addEventListener("change", changeShippingFee)
  }
}     

function changeShippingFee(e) {
  if (this.checked && this.value > 0) {
    totalShippingFee.innerHTML = `$${this.value}`;
  } else {
    totalShippingFee.innerHTML = "免費";
  }  
  shippingFee = Number(this.value);
  checkoutTotalAmount();
}

function checkoutTotalAmount(e) {
  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].quantity * cartItems[i].price;
  }
  checkoutAmount = sum + shippingFee;
  totalAmount.innerHTML = `$${checkoutAmount.toLocaleString("en-US")}`;
}

function btnPanelClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  if (e.target.matches(".btn-next")) {
    const nextStep = steps[step + 1];
    nowStep.classList.remove("active");
    nowStep.classList.add("checked");
    nextStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (e.target.matches(".btn-previous")) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("active");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step - 1].classList.toggle("d-none");
    step -= 1;
  }
  setBtnDisabled();
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
  }

  if (step === 2) {
    nextBtn.setAttribute("disabled", "disabled");
    finishBtn.removeAttribute("disabled");
  } else {
    nextBtn.removeAttribute("disabled");
    finishBtn.setAttribute("disabled", "disabled");
  }
}

renderCartItems();
checkoutTotalAmount();

cartItemsWrapper.addEventListener("click", cartItemsClicked);
form.addEventListener("click", shippingChosen);
btnPanel.addEventListener("click", btnPanelClicked);
