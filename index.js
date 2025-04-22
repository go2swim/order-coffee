// --- 3, 4, 5 ------------
function getCorrectDeclension(number) {
  let strNumber = String(number);
  if (
    ["11", "12", "13", "14"].includes(
      strNumber.slice(strNumber.length - 2, strNumber.length)
    )
  ) {
    return "напитков";
  }
  if (["2", "3", "4"].includes(strNumber.slice(-1))) {
    return "напитка";
  }

  if (["1"].includes(strNumber.slice(-1))) {
    return "напиток";
  }

  //   if (["5", "6", "7", "8", "9", "0"].includes(strNumber.slice(-1))) {
  //     return "напитков";
  //   }

  return "напитков";
}

function getBeverageCount() {
  const count = document.querySelectorAll("fieldset.beverage").length;
  return count;
}

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");

const close = document.querySelector(".modal__close");
close.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  modal.style.display = "none";
});

const buttons = document.querySelectorAll(".submit-button");
for (const button of buttons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modalOverlay.style.display = "block";
    modalOverlay.style.height = "1000vh";
    modal.style.display = "flex";

    const drinkCount = getBeverageCount();
    modalText.textContent = `Вы заказали ${drinkCount} ${getCorrectDeclension(
      drinkCount
    )}`;
  });
}

// ---------------------------------------------
const beverage_form = document.querySelector("fieldset.beverage");
const button = document.querySelector(".add-button");

function listener() {
  const beverage = beverage_form.cloneNode(true);

  const counts = document.querySelectorAll(".beverage-count");
  let maxNumber = 0;

  counts.forEach((el) => {
    const match = el.textContent.match(/\d+/);
    if (match) {
      const num = parseInt(match[0]);
      if (num > maxNumber) maxNumber = num;
    }
  });

  const newNumber = maxNumber + 1;
  beverage.querySelector(".beverage-count").textContent =
    "Напиток №" + newNumber;

  beverage.querySelector("select").value = "capuccino";

  const radioName = "milk" + newNumber;
  beverage.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.name = radioName;
  });

  const closeBtn = document.createElement("img");
  closeBtn.src = "https://www.svgrepo.com/show/505858/cross.svg";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.width = "20px";
  closeBtn.style.height = "60px";
  closeBtn.style.float = "right";
  closeBtn.style.marginTop = "-30px";

  closeBtn.addEventListener("click", () => {
    beverage.remove();
  });

  const header = beverage.querySelector(".beverage-count");
  header.appendChild(closeBtn);

  const submitButton = document.querySelector(".submit-button").parentNode;
  submitButton.parentNode.insertBefore(beverage, submitButton);
}

button.addEventListener("click", listener);
