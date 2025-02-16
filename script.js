let listContainer=document.getElementById('list-container');
let input=document.getElementById('addInput');

function createTask(){
    if(input.value===''){
        alert("Write Something to add task...");
    }else{
        let li=document.createElement("li");
        let edit=document.createElement("span");
        let bin=document.createElement("span");
        let button=document.getElementById("addInputBtn");
        button.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Adding..';
        setTimeout(()=>{
            button.innerHTML='<i class="fa-solid fa-circle-plus"></i> Add';
            let textNode=document.createTextNode(input.value);
            li.classList.add("list-content");
            li.appendChild(textNode);
            edit.style.backgroundImage="url('images/edit.png')";
            edit.classList.add("edit");
            bin.style.backgroundImage="url('images/bin.png')";
            bin.classList.add("bin");
            li.appendChild(edit);
            li.appendChild(bin);
            listContainer.appendChild(li);
            input.value="";
            saveData();
            emptyList();
        },500)
    }
}

listContainer.addEventListener("click",(e)=>{
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    if(e.target.classList.contains("bin")){
        e.target.parentElement.remove();
        saveData();
        emptyList();
    }
    if(e.target.classList.contains("edit")){
        let item=e.target.parentElement;
        let newValue=prompt("Edit your task:",item.firstChild.textContent);
        if(newValue !== null && newValue.trim() !== ''){
            item.firstChild.textContent=newValue.trim();
        }
        saveData();
    }
});
function emptyList(){
    if(listContainer.childElementCount===1){
        document.querySelector('.empty').style.display='block';
    }
    if(listContainer.childElementCount>1){
        document.querySelector('.empty').style.display='none';
    }
}

let completed=document.getElementById('complete');
let incompleted=document.getElementById('incomplete');
let all=document.getElementById('all');

function complete(){
    showAll();
    completed.className='active';
    all.className='inactive';
    incompleted.className='inactive';
    let allTask=document.querySelectorAll('.list-content');
    allTask.forEach(task => {
        console.log(task.className);
        if(task.className!=='list-content checked'){
            task.style.display="none";
        }
    });
}
function inComplete(){
    showAll();
    completed.className='inactive';
    all.className='inactive';
    incompleted.className='active';
    let allTask=document.querySelectorAll('.list-content');
    allTask.forEach(task => {
        console.log(task.className);
        if(task.className==='list-content checked'){
            task.style.display="none";
        }
    });
}
function showAll(){
    completed.className='inactive';
    all.className='active';
    incompleted.className='inactive';
    let allTask=document.querySelectorAll('.list-content');
    allTask.forEach(task => {
        task.style.display="flex";
    });
}
function deleteAll(){
    let allTask=document.querySelectorAll('.list-content');
    allTask.forEach(task => {
        task.remove();
        emptyList();
    });
    saveData();
}

//Storing Data in Loacal Storage

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showData(){
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    }
    emptyList();
}
showData();