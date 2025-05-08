const todoBox = document.getElementById("ToDo-Box");

const addList = document.getElementById("addList");
const addBtn = document.getElementById("addBtn");

const updateList = document.getElementById("updateList");
const updateBtn = document.getElementById("updateBtn");
const updateId = document.getElementById("updateId");

const modal = document.getElementById("modal");

num = 0;

// create

addBtn.addEventListener("click", () => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdId = document.createElement("td");
    const tdCheckBox = document.createElement("td");
    const tdUpdateBtn = document.createElement("td");
    const tdDeleteBtn = document.createElement("td");
    num += 1
    tdId.innerHTML = `<input type="hidden" value=${num} class="id"/>`;
    tdName.innerText = addList.value;
    tdName.className = "listName"
    tdCheckBox.innerHTML = '<input type="checkbox"/>';
    tdUpdateBtn.innerHTML = '<input type="button" class="update" />';
    tdDeleteBtn.innerHTML = '<input type="button" class="delete" />';

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCheckBox);
    tr.appendChild(tdUpdateBtn);
    tr.appendChild(tdDeleteBtn);
    todoBox.appendChild(tr);

    addList.value = "";


    // UPDATE
    tdUpdateBtn.addEventListener('click', (e) => {
        const tr = e.target.parentElement.parentElement;

        const targetText = tr.querySelector('.listName');

        updateId.value = tr.querySelector('.id').value;
        updateList.value = targetText.innerText;
        modal.style.display = "block";
    })

    // DELETE
    tdDeleteBtn.addEventListener('click', (e) => {
        const tr = e.target.parentElement.parentElement;

        tr.remove();
    })

})

updateBtn.addEventListener("click", () => {


    modal.style.display = "none";
    updateList.value = '';
})