import './index.css'

window.onload = function() {

    let taskField = document.querySelector('#taskField')
    let taskBtn= document.querySelector('#addTaskBtn')
    let allTasksParent = document.querySelector('#allTasks')

    taskField.addEventListener('keypress', function() {
      if(event.keyCode === 13)
      {
       createNewTask(allTasksParent, event.target.value)

       this.value = ''

      }

    })



}

function createNewTask(parent, task) {

  let col = create({'class': 'col-sm-3'})
  let singleTask = create({'class':'single-task d-flex'})
  let singleTaskP =  create('p')
  let span = create('span', {'class': 'ml-auto'})
   span.style.cursor = 'pointer'


  span.innerHTML = '<i class="fas fa-times-circle"></i>'
  singleTaskP.innerHTML = task
  singleTask.appendChild(singleTaskP)
  span.addEventListener('click', function() {
 parent.removeChild(col)

  })
  singleTask.appendChild(span)

  let taskController = createTaskController(singleTask)
  taskController.style.visibility ='hidden'
singleTask.appendChild(taskController)

singleTask.onmouseenter = function () {
 taskController.style.visibility ='visible'
 taskController.style.cursor ='pointer'

}

singleTask.onmouseleave = function () {
  taskController.style.visibility ='hidden'


 }



  col.appendChild(singleTask)
  parent.appendChild(col)
  function createTaskController(parent) {
   let controlPanel = create ({'class': 'task-control-panel d-flex align-items-center'})
   let colorPallete = createColorPallete(parent)
   controlPanel.appendChild(colorPallete)
   let editBtnController= createeditBtnController(parent)
  controlPanel.appendChild(editBtnController)
   return controlPanel

  }

  function createeditBtnController(parent){
      let span= create('span', {'class':'ml-auto'})
      span.innerHTML= '<i class="fas fa-edit"></i>'
      span.style.cursor = 'pointer'
      span.style.color = 'white'
      span.addEventListener('click', function() {
          let p = parent.querySelector('p')
          let  textArea = create('textarea', {'class': 'inner-textarea'})
          textArea.style.width = parent.offsetWidth + 'px'
          textArea.style.height = parent.offsetHeight + 'px'
          textArea.innerHTML = p.innerHTML
 textArea.addEventListener('keypress', function(event) {
     if(event.keyCode === 13) {

         event.stopPropagation()
         if(this.value) {
             p.innerHTML = this.value
             parent.removeChild(this)
         }

         else {
             console.log('please put some new word')
         }
     }

 })

        parent.appendChild(textArea)

      })

      return span
  }

function createColorPallete(parent) {
const colors =['palegreen','skyblue','powderblue', 'salmon', 'grey', 'red','white']
let colorDiv = create({'class': 'd-flex'})

colors.forEach(color => {
  let div = create({'class': 'color-circle ml-1'})
  div.style.background=color
  div.addEventListener('click', function () {
      parent.style.background = color

  })
 colorDiv.appendChild(div)
})


return colorDiv




}




}



window.create = function () {

  if (arguments.length === 0) {
      return document.createElement('div');
  }

  if (arguments.length === 1 && typeof arguments[0] != 'object') {
      return document.createElement(arguments[0]);
  }

  var tag = arguments[0];
  var attr = arguments[1] || arguments[0];

  if (arguments.length === 1 && typeof arguments[0] === 'object') {
      tag = 'div';
  }

  var element = document.createElement(tag);

  for (var i in attr) {
      element.setAttribute(i, attr[i]);
  }

  return element;
}

