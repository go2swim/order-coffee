const beverage_form = document.querySelector("fieldset.beverage");
const button = document.querySelector(".add-button");

function listener() {
    const beverage = beverage_form.cloneNode(true);

    const counts = document.querySelectorAll(".beverage-count");
    let maxNumber = 0;

    counts.forEach(el => {
        const match = el.textContent.match(/\d+/);
        if (match) {
            const num = parseInt(match[0]);
            if (num > maxNumber) maxNumber = num;
        }
    });

    const newNumber = maxNumber + 1;
    beverage.querySelector(".beverage-count").textContent = "Напиток №" + newNumber;

    beverage.querySelector("select").value = "capuccino";

    const radioName = "milk" + newNumber;
    beverage.querySelectorAll('input[type="radio"]').forEach(input => {
        input.name = radioName;
    });

    const closeBtn = document.createElement('img');
    closeBtn.src = 'https://www.svgrepo.com/show/505858/cross.svg';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.width = '20px';
    closeBtn.style.height = '60px';
    closeBtn.style.float = 'right';
    closeBtn.style.marginTop = '-30px';

    closeBtn.addEventListener('click', () => {
        beverage.remove();
    });

    const header = beverage.querySelector(".beverage-count");
    header.appendChild(closeBtn);

    const submitButton = document.querySelector(".submit-button").parentNode;
    submitButton.parentNode.insertBefore(beverage, submitButton);
}

button.addEventListener("click", listener);
