"use strict";

// Uppgift 1
const successButton = document.getElementById("success")
const errorButton = document.getElementById("error")
const infoButton = document.getElementById("info")
const messageBox = document.getElementById("message-box")

successButton.addEventListener("click", () => {
    messageBox.className = successButton.id;
})
errorButton.addEventListener("click", () => {
    messageBox.className = errorButton.id;
})
infoButton.addEventListener("click", () => {
    messageBox.className = infoButton.id;
})

// Uppgift 2
const items = document.getElementById("items")
const addItem = document.getElementById("add-item")

addItem.addEventListener("click", () => {
    const itemName = window.prompt("Fill in item name")
    if (itemName) {
        const itemElement = document.createElement("li")
        itemElement.innerText = itemName;
        items.appendChild(itemElement)
    }
})

// Uppgift 3
const removeItem = document.getElementById("remove-item")

removeItem.addEventListener("click", () => {
    if (items.lastElementChild) {
        items.removeChild(items.lastElementChild)
    }
})

// Uppgift 4
const buttons = document.getElementsByClassName("remove-list-item")
for (const button of buttons) {
    button.addEventListener("click", (event) => {
        const button = event.target;
        const listItemElement = button.parentElement;
        const listElement = listItemElement.parentElement;s
        const hasConformed = window.confirm(`Do whant to delete list item with content '${listItemElement.innerText}'`)
        if (hasConformed) {
            listElement.removeChild(listItemElement)
        }
    })
}

// Uppgift 5
const form = document.getElementById("apply-for-pet");

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    
    const firstName = formData.get("firstname") ?? ""
    console.log("First name:", firstName)
    if (50 < firstName.length) {
        alert("Förstanamn är för stor måste var under 50 tecken!")
        return;
    }
    
    const lastName = formData.get("lastname") ?? ""
    console.log("Last name:", lastName)
    if (50 < lastName.length) {
        alert("Efternamn är för stor måste var under 50 tecken!")
        return;
    }
    
    const ageAsStr = formData.get("age") ?? ""
    console.log("age:", ageAsStr)
    const age = Number(ageAsStr)
    const isNumber = !isNaN(ageAsStr)
    if (ageAsStr === "" || (isNumber && age <= 0)) {
        alert("Åldern måste vara ett tall större än 0!")
        return;
    }

    const email = formData.get("email") ?? ""
    console.log("Email: ", email)
    if (50 < email.length) {
        alert("Email är för stor måste var under 50 tecken!")
        return;
    }

    const pet = formData.get("pet") ?? ""
    console.log("Pet: ", pet)
    if (pet === "") {
        alert("Du måste välja ett husdjur!")
        return;
    }

    event.target.submit()
})