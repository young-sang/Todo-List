const todoBox = document.getElementById("ToDo-Box");

const addList = document.getElementById("addList");
const addBtn = document.getElementById("addBtn");

const updateList = document.getElementById("updateList");
const updateSubmitBtn = document.getElementById("updateSubmitBtn");
const updateId = document.getElementById("updateId");

const modal = document.getElementById("modal");


// makeList
const make = (data) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdId = document.createElement("td");
    const tdCheckBox = document.createElement("td");
    const tdUpdateBtn = document.createElement("td");
    const tdDeleteBtn = document.createElement("td");
    const tdDate = document.createElement("td");

    tdId.innerHTML = `<input type="hidden" value=${data.id} class="id"/>`;
    tdName.innerText = data.value;
    tdName.className = "listName"
    tdCheckBox.innerHTML = `<input type="checkbox" value=${data.done}/>`;
    tdUpdateBtn.innerHTML = '<input type="button" class="update"  value="수정"/>';
    tdDeleteBtn.innerHTML = '<input type="button" class="delete" value="삭제" />';
    tdDate.innerText = data.date;

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCheckBox);
    tr.appendChild(tdUpdateBtn);
    tr.appendChild(tdDeleteBtn);
    tr.appendChild(tdDate);
    todoBox.appendChild(tr);


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
}

//Read
let list = JSON.parse(localStorage.getItem("list"));
console.log(list)
if(list == null){
    list = []  
}else{
    for(let i = 0; i < list.length; i++){
        make(list[i])
    }
}





//create
addBtn.addEventListener("click", () => {
    if(addList.value == ''){
        return;
    };
    let date = new Date()
    let data = {
        'id' : list == null ? 1 : list.length + 1,
        'value' : addList.value,
        'done' : false,
        'date' : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    }
    make(data);
    addList.value = "";
    list.push(data)
    localStorage.setItem("list", JSON.stringify(list))
});


//수정 버튼 제출
updateSubmitBtn.addEventListener("click", () => {
    const tr = document.querySelectorAll('.id');
    console.log(tr.length);
    for(i = 0; i < tr.length; i++ ){
        if(tr[i].value == updateId.value){
            const a = tr[i].parentElement.parentElement.querySelector('.listName');
            a.innerText = updateList.value;
        }
    }
    modal.style.display = "none";
    updateList.value = '';
})