import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-88007-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")






const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

    //or you can use appendItemToShoppingListEl(inputValue)
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
            let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let ItemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.tabIndex = 0

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${ItemId}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}





/* 
an easier way of printing out the list

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()

    appendItemToShoppingListEl(inputValue)
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

*/