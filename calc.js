let a = "";
let b = "";
let sign = "";
let negA = false;
let negB = false;
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];

const out = document.querySelector(".total p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  negA = false;
  negB = false;
  finish = false;
  out.textContent = 0;
}

document.querySelector(".c").onclick = clearAll;

document.querySelector(".buttons").onclick = (event) => {
  if (!event.target.classList.contains("item")) return; //нажата не кнопка
  if (event.target.classList.contains("c")) return; //нажата c

  out.textContent = "";
  const key = event.target.textContent; //получаем текст нажатой кнопки

  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
      negB = b < 0 ? true : false;
    } else {
      b += key;
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  if (key === "+/-") {
    if (b === "" && !negA && sign === "") {
      a = "-" + a;
      negA = true;
      out.textContent = a;
    } else if (a !== "" && b === "" && negA && sign === "") {
      a = a.substring(1);
      negA = false;
      out.textContent = a;
    } else if (a !== "" && b !== "" && !negA && finish) {
      a = "-" + a;
      negA = true;
      out.textContent = a;
    } else if (a !== "" && b !== "" && negA && finish) {
      a = String(a).substring(1);
      //   a = a.substring(1);
      negA = false;
      out.textContent = a;
    } else if (!negB && sign !== "") {
      b = "-" + b;
      negB = true;
      out.textContent = b;
    } else if (b !== "" && negB && sign !== "") {
      b = b.substring(1);
      negB = false;
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  if (key === "%") {
    // console.log(a, b, sign);
    // return;
  }

  if (action.includes(key)) {
    sign = key;
    console.log(a, b, sign);
    out.textContent = sign;
    return;
  }

  if (key === "=") {
    if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "X":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    negA = a < 0 ? true : false;
    out.textContent = a;
    console.log(a, b, sign);
  }
};
