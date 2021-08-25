const generate = document.getElementById("generate");
const palette = document.getElementById("palette");
const delIcon = document.getElementsByClassName("delete");
const editIcon = document.getElementsByClassName("edit");
const addColor = document.getElementById("addColor");
const saveBtn = document.getElementById("saveBtn");
const color = document.getElementsByClassName("color");
const paletteSaved = document.getElementById("paletteSaved");

// to generate random colors
const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

//local Storage
var paletteLocal;
if (localStorage.getItem("palette") == null) {
    var paletteLocal = []
} else {
    paletteLocal = JSON.parse(localStorage.getItem("palette"));
}

generate.addEventListener("click", function () {
    while (palette.firstChild) {
        palette.removeChild(palette.firstChild);
    }
    generatePalette();
});

function generatePalette() {
    for (let j = 0; j < 6; j++) {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
        }
        paletteDiv(hexColor)
    }

    // adding event listeners
    for (let i = 0; i < editIcon.length; i++) {
        addingEventEdit(i)
    }

    for (let i = 0; i < delIcon.length; i++) {
        addingEventDel(i)
    }
}
generatePalette();

function paletteDiv(hexColor) {
    let element = document.createElement('div');
    element.className = 'color'
    element.style.backgroundColor = hexColor;
    palette.appendChild(element)

    let span = document.createElement('span');
    span.innerHTML = hexColor
    element.appendChild(span)

    let del = document.createElement('i');
    del.classList = "fas fa-trash delete"
    del.style.color = "red"
    element.appendChild(del)

    let edit = document.createElement('i');
    edit.classList = "fas fa-edit edit"
    edit.style.color = "#1d44f5"
    element.appendChild(edit);

    let input = document.createElement('input');
    input.classList = "hide"
    input.type = "color"
    input.value = hexColor
    element.appendChild(input);
}

function addingEventEdit(i) {
    editIcon[i].addEventListener('click', () => {
        if (editIcon[i].classList.contains("fa-edit")) {
            editIcon[i].classList.remove("fa-edit")
            editIcon[i].classList.add("fa-save")
        } else {
            editIcon[i].classList.add("fa-edit")
            editIcon[i].classList.remove("fa-save")
            editIcon[i].parentElement.childNodes[0].innerHTML = editIcon[i].parentElement.childNodes[3].value
            editIcon[i].parentElement.style.backgroundColor = editIcon[i].parentElement.childNodes[3].value
        }
        editIcon[i].parentElement.childNodes[3].classList.toggle("hide")
    })
}

function addingEventDel(i) {
    delIcon[i].addEventListener('click', () => {
        // console.log(delIcon[i].parentElement)
        let parentElement = delIcon[i].parentElement
        parentElement.classList.remove("color")
        parentElement.classList.add("hide")
    })
}

addColor.addEventListener('click', () => {
    paletteDiv(addColor.parentElement.childNodes[1].value);
    // console.log(editIcon[editIcon.length - 1])
    addingEventEdit(editIcon.length - 1)
    addingEventDel(editIcon.length - 1)
})

saveBtn.addEventListener('click', () => {
    var colorsLocal = []
    for (let i = 0; i < color.length; i++) {
        // console.log(color[i].firstElementChild.innerHTML)
        colorsLocal.push(color[i].firstElementChild.innerHTML)
    }
    paletteLocal.push(colorsLocal)
    localStorage.setItem("palette", JSON.stringify(paletteLocal))
    loadLocalStorage();
})

function loadLocalStorage() {
    while (paletteSaved.firstChild) {
        paletteSaved.removeChild(paletteSaved.firstChild);
    }
    for (let i = paletteLocal.length - 1; i >= 0; i--) {
        let div = document.createElement('div')
        div.classList = "palette"
        let span = document.createElement('span')
        div.appendChild(span)
        span.innerHTML = "Palette - " + (i+1)
        for (let j = 0; j < paletteLocal[i].length; j++) {
            let element = document.createElement('div')
            element.className = 'colorPalette'
            element.style.backgroundColor = paletteLocal[i][j];
            div.appendChild(element)

            let span = document.createElement('span');
            span.innerHTML = paletteLocal[i][j]
            element.appendChild(span)

            let del = document.createElement('i');
            del.classList = "fas fa-trash deletePalette"
            del.style.color = "red"
            element.appendChild(del)
            del.addEventListener('click', () => {
                paletteLocal[i].splice(j, 1)
                localStorage.setItem("palette", JSON.stringify(paletteLocal))
                loadLocalStorage();
            })

            let edit = document.createElement('i');
            edit.classList = "fas fa-edit editPalette"
            edit.style.color = "#1d44f5"
            element.appendChild(edit);
            edit.addEventListener('click', () => {
                if (edit.classList.contains("fa-edit")) {
                    edit.classList.remove("fa-edit")
                    edit.classList.add("fa-save")
                } else {
                    edit.parentElement.style.backgroundColor = input.value
                    paletteLocal[i].splice(j, 1, input.value)
                    localStorage.setItem("palette", JSON.stringify(paletteLocal))
                    loadLocalStorage();
                }
                input.classList.toggle("hide")
            })

            let input = document.createElement('input');
            input.classList = "hide"
            input.type = "color"
            input.value = paletteLocal[i][j]
            element.appendChild(input);
            div.appendChild(element)
        }
        paletteSaved.appendChild(div)
    }
}
loadLocalStorage();