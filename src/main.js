import "./scss_dir/main.scss";

// const shippingWrapper = document.querySelectorAll(".shipping-wrapper");
const shippingRadio = document.querySelectorAll(".shipping-radio");
const stepperPanel = document.querySelector(".stepper-panel");
const steps = stepperPanel.querySelectorAll(".step");
const form = document.querySelector(".form");
const formParts = form.querySelectorAll(".part");
const btnPanel = document.querySelector(".button-panel");
const nextBtn = btnPanel.querySelector(".btn-next");
const prevBtn = btnPanel.querySelector(".btn-previous");
const finishBtn = btnPanel.querySelector(".btn-finish");

let step = 0;

function shippingMethodClicked(e) {
  console.log(e.target);
  // shippingRadio[0].classList.add("checked");
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

form.addEventListener("click", shippingMethodClicked);
btnPanel.addEventListener("click", btnPanelClicked);
