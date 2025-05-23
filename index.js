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
  return "напитков";
}

function getBeverageCount() {
  const count = document.querySelectorAll("fieldset.beverage").length;
  return count;
}

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const tableContainer = document.querySelector(".modal__table-container");
const timeInput = document.querySelector(".order-time");
const confirmButton = document.querySelector(".confirm-button");

const close = document.querySelector(".modal__close");
close.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  modal.style.display = "none";
});

const submitButtons = document.querySelectorAll(".submit-button");
for (const button of submitButtons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modalOverlay.style.display = "block";
    modalOverlay.style.height = "1000vh";
    modal.style.display = "flex";

    const drinkCount = getBeverageCount();
    modalText.textContent = `Вы заказали ${drinkCount} ${getCorrectDeclension(
      drinkCount
    )}`;

    buildOrderTable();
  });
}

function buildOrderTable() {
  const beverages = document.querySelectorAll("fieldset.beverage");

  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
      <thead>
        <tr>
          <th>Напиток</th>
          <th>Молоко</th>
          <th>Дополнительно</th>
          <th>Пожелания</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
  const tbody = table.querySelector("tbody");

  beverages.forEach((bev) => {
    const drinkName =
      bev.querySelector("select").selectedOptions[0].textContent;

    const milkRadio = bev.querySelector('input[type="radio"]:checked');
    const milkText = milkRadio ? milkRadio.nextElementSibling.textContent : "";

    const opts = Array.from(
      bev.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.nextElementSibling.textContent);
    const optionsText = opts.join(", ");

    const wishText = bev.querySelector(".wish-text").value;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${drinkName}</td>
        <td>${milkText}</td>
        <td>${optionsText}</td>
        <td>${wishText}</td>
      `;
    tbody.appendChild(row);
  });

  tableContainer.appendChild(table);
}

confirmButton.addEventListener("click", () => {
  const timeVal = timeInput.value;
  if (!timeVal) {
    timeInput.style.border = "2px solid red";
    alert("Пожалуйста, выберите время.");
    return;
  }
  const [h, m] = timeVal.split(":").map(Number);
  const now = new Date();
  const orderTime = new Date();
  orderTime.setHours(h, m, 0, 0);

  if (orderTime < now) {
    timeInput.style.border = "2px solid red";
    alert(
      "Мы не умеем перемещаться во времени. Выберите время позже, чем текущее"
    );
  } else {
    modalOverlay.style.display = "none";
    modal.style.display = "none";

    timeInput.style.border = "";
  }
});

const beverage_form = document.querySelector("fieldset.beverage");
const addButton = document.querySelector(".add-button");

function attachWishListener(bev) {
  const textarea = bev.querySelector(".wish-text");
  const preview = bev.querySelector(".wish-preview");
  const array = [
    "срочно",
    "быстрее",
    "побыстрее",
    "скорее",
    "поскорее",
    "очень нужно",
  ];

  textarea.addEventListener("input", () => {
    const txt = textarea.value;

    let processed = txt;
    const f = array.filter((word) => txt.includes(word));
    if (f.length != 0) {
      processed = txt.replace(f[0], `<b>${f}</b>`);
    }
    preview.innerHTML = processed;
  });
}

attachWishListener(beverage_form);

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

  const submitWrapper = document.querySelector(".submit-button").parentNode;
  submitWrapper.parentNode.insertBefore(beverage, submitWrapper);

  attachWishListener(beverage);
}

addButton.addEventListener("click", listener);
