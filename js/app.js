// CODE EXPLAINED channel
const clear = document.querySelectorAll(".clear")
const list = document.getElementById("list");
const dateELement = document.getElementById("date");
const input = document.getElementById("item");


const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";


let options = {weekday:'long', month:'short', day:'numeric'};
let today = new Date();
dateELement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST, id;

let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
}else{
    LIST = [];
    id=0;
}

//load items
function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

//clear the local storage
// clear.addEventListener("click", function(){
//     localStorage.clear();
//     location.reload();
// });

//add new todo - function
function addToDo(toDo, id, done, trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const text = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="de fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, text);
}
addToDo("coffee", 1, false, false)

//adding todo listener
document.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        console.log("enter")
        event.preventDefault()
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }
        input.value = "";
    }
});

//set complete/not complete - function
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//delete todo - function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//button listeners
list.addEventListener("click", function(event){
    let element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})








