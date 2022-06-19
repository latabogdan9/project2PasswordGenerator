const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", //25
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", //51
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", //61
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]; //80

let options = document.querySelector(".options");
let optionsState = 0;
let allowNumbersCheckbox = document.querySelector("#allowNumbers");
let allowSymbolsCheckbox = document.querySelector("#allowSymbols"); //sectiunea cu variabile ce se ocupa cu optiunile
let allowNumbers = true;
let allowSymbols = true;
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".sliderValue");


let passFields = document.getElementsByClassName("passButtonLeft");
let passFields2 = document.getElementsByClassName("passButtonRight");       //sectiunea cu variabile pentru generarea parolelor
let pass = [passFields[0], passFields2[0], passFields[1], passFields2[1]];
let passLength = 16;
let genState = 0;
let id = 0

let container = document.querySelector(".container");
let separator1 = document.querySelector(".separator1");
let separator2 = document.querySelector(".separator2");



for (let i = 0; i < 4; i++) {
    console.log(pass[i].innerHTML)
}
function generatePasswords() {
    genState = 1;
    passLength = parseInt(sliderValue.innerHTML);
    if (allowNumbersCheckbox.checked)
        allowNumbers = true;
    else allowNumbers = false;
    if (allowSymbolsCheckbox.checked == true)
        allowSymbols = true;
    else allowSymbols = false;
    for (let i = 0; i < 4; i++) {
        pass[i].innerHTML = "";

        if (allowNumbers == true && allowSymbols==true)
            for (let j = 0; j < passLength; j++) {
                id = Math.floor(Math.random() * characters.length);
                pass[i].innerHTML += characters[id];
            }
        if (allowNumbers == true && allowSymbols == false)
            for (let j = 0; j < passLength; j++) {
                id = Math.floor(Math.random() * 61);
                pass[i].innerHTML += characters[id];
            }
        if (allowNumbers == false && allowSymbols == true)
            for (let j = 0; j < passLength; j++) {
                id = Math.floor(Math.random() * characters.length);
                while (id > 51 && id < 62)
                    id = Math.floor(Math.random() * characters.length);
                pass[i].innerHTML += characters[id];
            }
        if (allowNumbers == false && allowSymbols == false)
            for (let j = 0; j < passLength; j++) {
                id = Math.floor(Math.random() * 51);
                pass[i].innerHTML += characters[id];
            }

        if (optionsState == 0)
            container.style.height = 550;
        else if (optionsState == 1)
            container.style.height = 700;
        separator2.style.display = "inherit";
        pass[i].style.display = "inline";
    }
}

function copyPassword(buttonId) {
    navigator.clipboard.writeText(pass[buttonId].textContent);

}

function showOptions() {

    switch(optionsState){
        case 0:
            if (genState == 0) {
                container.style.height = 550;
            }
            else if (genState == 1) {
                container.style.height = 700;
            }
            separator1.style.display = "inherit";
            options.style.display = "flex";
            optionsState = 1;

            break;
        case 1:
            if (genState == 0) {
                container.style.height = 400;
            }
            else if (genState == 1) {
                container.style.height = 550;
            }
            separator1.style.display = "none";
            options.style.display = "none";
            optionsState = 0;
            break;
    }
   
}

slider.oninput = function () {
    sliderValue.innerHTML = this.value;
}