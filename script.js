let btn = document.getElementById('btn')
let box = document.getElementById('box_I')

let arr = []
btn.addEventListener('click', funcadd)
function funcadd(e) {
    let Exp = document.getElementById('Exp').textContent=""
    

    let inp_1 = document.getElementById('inp-1')
    let inp_2 = document.getElementById('inp-2')
    if (inp_1.value == "" || inp_1.value == null || inp_2.value == null || inp_2.value == "") {
        return false;
    } else {

        //set Item in local storage

        let obj = {
            Title: inp_1.value,
            Todo: inp_2.value
        }
        arr.push(obj)
        localStorage.setItem("todo", JSON.stringify(arr))

        //Display Item in innerHTML
        box.innerHTML += `  <div id="ti_to" class="bor">
<h1 id="title">${inp_1.value}</h1>
<p id="todo" class="todo">${inp_2.value}</p>
<button id="ed_btn" onclick="edfunc(this)">Edit</button>
<button id="De_btn" onclick="defunc(this)">Delete</button>

</div>
`

        inp_1.value = ""
        inp_2.value = ""
       
    }
}
//Remove Todo
function defunc(e, element) {

    let a = confirm("Do you want to delete todo");
    if (a == true) {
        //remove data from localStorage
        let data = localStorage.getItem("todo")
        let arrData = JSON.parse(data)
        arrData.splice(element, 1)
        localStorage.setItem("todo", JSON.stringify(arrData))
        //remove data from display
        let elem = e;
        elem.parentElement.remove()
    }


}
//Get Item to local storage
function loadData() {
    let data = localStorage.getItem("todo")
    let arrData = JSON.parse(data)
    console.log(arrData)
    arrData.forEach(element => {
        
        box.innerHTML += `  <div id="ti_to" class="bor">
<h1 id="title">${element.Title}</h1>
<p id="todo" class='todo'>${element.Todo}</p>
<button id="ed_btn" onclick="edfunc(this,${arrData.indexOf(element)})">Edit</button>
<button id="De_btn" onclick="defunc(this,${arrData.indexOf(element)})">Delete</button>

</div>
`
        let obj2 = {
            Title: element.Title,
            Todo: element.Todo
        }
        arr.push(obj2)
    });
}
loadData()





//Edit btn
function edfunc(ed,element) {
if(ed.textContent == "Done"){
ed.textContent = "Edit"
ed.style.backgroundColor = " rgb(237, 195, 7)"
let editedtext = ed.previousElementSibling.textContent
let currp = document.createElement('p')
currp.contentEditable = "false";
 currp.classList.add('todo')
currp.textContent = editedtext;
ed.parentElement.replaceChild(currp,ed.previousElementSibling)

//Edit on localStorage
let data = localStorage.getItem("todo")
let arrData = JSON.parse(data)
arrData.forEach((ele,index) => {
if(index == element){
ele.Todo = editedtext
}
});
localStorage.setItem("todo",JSON.stringify(arrData))
}

else{  
      ed.textContent = "Done"
ed.style.backgroundColor = "rgb(145, 120, 9)"
    let oldptext = ed.previousElementSibling.textContent
    let newp = document.createElement('p');
    newp.textContent = oldptext
  newp.contentEditable = "true"
  newp.style.border = "1px solid";
  newp.style.marginBottom = "10px";
  newp.style.fontSize = "20px"
  newp.style.padding = "5px"

ed.parentElement.replaceChild(newp,ed.previousElementSibling)
  

}
}