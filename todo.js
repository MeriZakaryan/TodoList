let toDoData = localStorage.getItem("toDoList") ? JSON.parse(localStorage.getItem("toDoList")) : [];

const myFunction = (event) => {
    event.preventDefault()
    if (event.target.children[0].value) {
        toDoData.push({ text: event.target.children[0].value, id: Date.now(), checked: false })
        // console.log(toDoData);
        localStorage.setItem("toDoList", JSON.stringify(toDoData))
        render(toDoData)
        event.target.children[0].value = ''
    }
}

const removeItem = (event) => {
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
    toDoData = toDoData.filter((element) => +event.target.parentNode.previousElementSibling.dataset.id !== +element.id)

    localStorage.setItem("toDoList", JSON.stringify(toDoData))
}

const checkItem = (event) => {
    toDoData.forEach((element) => {
        if (+event.target.parentNode.previousElementSibling.dataset.id === +element.id) {
            element.checked = !element.checked
            // console.log(event.target);
            event.target.setAttribute('checked', element.checked)
        }
    })
    localStorage.setItem("toDoList", JSON.stringify(toDoData))
}


const render = (info) => {
    document.querySelector(".main-content").innerHTML = ""
    info.map((element) => {
        let listItem = document.createElement('div')
        listItem.classList.add('notes')
        listItem.innerHTML = `
        <span data-id=${element.id}>${element.text}</span>
        <div class='actions-block'>
            <input type="checkbox" class='check-btn' onchange="checkItem(event)">
            <button class="btn" onclick='removeItem(event)'>✗</button>
        </div>`

        document.querySelector(".main-content").appendChild(listItem)
        if (element.checked) {
            let note = document.querySelectorAll('.notes')
            note.forEach(el=>{
                if (element.id == el.firstElementChild.dataset.id) {
                    el.children[1].firstElementChild.setAttribute('checked', true)
                }
            })
        }
    })
}

const select = document.querySelector('select')
const selectNote = () => {
    if(select.value === 'Done'){
        let completed = toDoData.filter(el => el.checked)
        localStorage.setItem("doneNotes", JSON.stringify(completed))
        render(completed)
    }else if(select.value === 'Undone'){
        let uncompleted = toDoData.filter(el => !el.checked)
        localStorage.setItem("undoneNotes", JSON.stringify(uncompleted))
        render(uncompleted)
    }else{
        localStorage.setItem("toDoList", JSON.stringify(toDoData))
        render(toDoData)
    }
}

select.addEventListener('change', selectNote)


document.addEventListener('DOMContentLoaded', function () {
    selectNote()
})

