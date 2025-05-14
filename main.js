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
    todoBox.insertBefore(tr, todoBox.firstChild)


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
        let tr = e.target.parentElement.parentElement;
        let idTd = tr.querySelector(".id");
        console.log(idTd);
        let id = idTd.value;

        // 프론트엔드 삭제
        tr.remove();
        console.log(id);
        // DB 삭제
        list = list.filter((e) => e.id !== Number(id));
        localStorage.setItem("list", JSON.stringify(list));
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

    // 데이터 가공
    let date = new Date();
    let data = {
        'id' : list == null || list.length == 0 ? 1 : list[list.length -1].id + 1,
        'value' : addList.value,
        'done' : false,
        'date' : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    }

    // 프론트엔드 추가
    make(data);
    addList.value = "";

    // DB 작성
    list.push(data)
    localStorage.setItem("list", JSON.stringify(list))
});


//수정 버튼 제출
updateSubmitBtn.addEventListener("click", () => {
    const idInputTag = document.querySelectorAll('.id');
    
    for(i = 0; i < idInputTag.length; i++ ){
        if(idInputTag[i].value == updateId.value){
            // 화면 변경
            const tr = idInputTag[i].parentElement.parentElement.querySelector('.listName');
            let id = idInputTag[i].value;
            tr.innerText = updateList.value;
            
            // DB 수정
            list = list.map(item => {
                if(item && item.id === Number(id)){
                    return {
                        ...item,
                        value: updateList.value
                    };
                }
                return item;
            });
            localStorage.setItem("list", JSON.stringify(list));
        }
    }
    modal.style.display = "none";
    updateList.value = '';
})