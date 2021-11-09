let todos = localStorage.getItem("todos")

try {
    todos=JSON.parse(todos)
    todos=todos.length ? todos : null
}catch (e) {
    todos=null
}
if (!todos){
    todos=[
        {content : "task1", status : true},
        {content : "task2" ,status : true},
        {content : "task3" , status: true},
            ]
    localStorage.setItem("todos",JSON.stringify(todos))
}

function createTodos() {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML=""
    todos.forEach((todo,index)=>{
        let li = document.createElement("li")
        li.className="list-group-item d-flex justify-content-between align-items-center mt-2"
        li.style="  color: #fff;\n" +
            "  background: rgba( 255, 255, 255, 0.5 );\n" +
            "  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );\n" +
            "  backdrop-filter: blur( 13px );\n" +
            "  -webkit-backdrop-filter: blur( 13px );\n" +
            "  border-radius: 10px;\n" +
            "  border: 1px solid rgba( 255, 255, 255, 0.18 )"
        li.textContent=todo.content
        li.style.textDecoration=todo.status ?  "initial" : "line-through"
        let content1=document.createElement("span")
        let doneBtn = document.createElement("i")
        doneBtn.className="bi bi-check-circle p-3"
        doneBtn.style="color:#37862c;"
        let deleteBtn=document.createElement("i")
        deleteBtn.className="bi bi-x-circle"
        deleteBtn.style="color:#d6000d;"
        li.append(content1)
        content1.append(doneBtn)
        content1.append(deleteBtn)
        todosList.append(li)
        deleteBtn.addEventListener("click",e=>{
            todos.splice(index,1)
            localStorage.setItem("todos",JSON.stringify(todos))
            createTodos(todos)
        })
        doneBtn.addEventListener("click",e=>{
            todos[index].status =!todos[index].status
            localStorage.setItem("todos",JSON.stringify(todos))
            createTodos(todos)
        })

    })

}
createTodos(todos)
let actions = document.querySelector("#actions")
let formWrapper=document.querySelector("#form-wrapper")
Array.from(actions.children).forEach(action =>{
if(action.dataset.action=="add"){
action.addEventListener("click",e=>{
    formWrapper.innerHTML=`        <form id="add">
                <input  class=" form-control  w-75 m-auto " type="text" name="add" id=input  placeholder="write here . . . "/>
        </form>`
    let add =document.querySelector("#add")
    createTodos(todos)
    add.addEventListener("submit",e=>{
        e.preventDefault()
        if(add.add.value){
            todos.push({content :add.add.value,status : true})
            localStorage.setItem("todos",JSON.stringify(todos))
            createTodos(todos)
        }
    })

})
}
else if (action.dataset.action=="search"){
    action.addEventListener("click",e=>{
        formWrapper.innerHTML=`
        <form id="search">
              <input  class=" form-control  w-75 m-auto " type="text" name="search" id=input  placeholder="search . . .  "/>
        </form>`
        let search =document.querySelector("#search")
        search.addEventListener("keyup",e=>{
            e.preventDefault()
            if(search.search.value){
               let filterTodos=todos.filter(
                   todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
               )
                createTodos(filterTodos)
            }
            else{
                createTodos(todos)
            }

        })
    })
}
})
