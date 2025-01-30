document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.querySelector('#task-input');
    const taskList = document.querySelector('.task-list');
    const addTaskBtn = document.getElementById('addTask');


    // Add Event Listener to addTaskBtn
    addTaskBtn.addEventListener('click',function(){
        

        addTask(taskInput.value)
        taskInput.value = "";
    })

    // addTask
    function addTask(title, isCompleted = false ) {
        
        // create li element 
        const li = document.createElement('li');
        // add the classes which required 
        li.className = 'task';

        // create checkbox
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className="task-check"

        // assign default Value it
        if (isCompleted) {
            checkBox.defaultChecked = isCompleted;
        }
        //  add EventListener for functionality checkbox element to change status
        checkBox.addEventListener('change',function(e){
            if (e.target.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTask();
        })



        // create paragraph tag
        const paragraph = document.createElement('p');
        // insert the text
        paragraph.innerText = title;

        // create action Container element for two button;
        const actionContainer = document.createElement('div');
        actionContainer.className = 'actions';

        // create two button for actions
        //  1.edit button
        const editButton = document.createElement('button');
        editButton.className = 'editTask';
        editButton.innerHTML = ` <i class="fa-solid fa-pen "></i>`;
        //Todo: add EventListener for functionality edit Element
        editButton.addEventListener('click', function () {
            const newTitle = prompt('Edit task:', paragraph.innerText);
            if (newTitle) {
                paragraph.innerText = newTitle;
                saveTask();
            }
        });

        // 2. delete button;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteTask';
        deleteButton.innerHTML = `<i class="fa-solid fa-trash "></i>`
        //  add EventListener for functionality delete element
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTask();
        })


        // add both button in actionContainer
        actionContainer.append(editButton);
        actionContainer.append(deleteButton);


        li.append(checkBox);
        li.append(paragraph);
        li.append(actionContainer)

        taskList.append(li);
        // save to localStorage
        saveTask();

    }
    function saveTask() {
        // get all tasks
        let tasks = document.getElementsByClassName('task');
        let taskArray = [];

        // iterate over each task
        for (let item of tasks) {
            let taskTitle = item.querySelector('p').innerText;
            let isCompleted = item.querySelector('input[type="checkbox"]').checked;

            // push task details to array
            taskArray.push({ title: taskTitle, isCompleted: isCompleted });
        }

        // save to localStorage
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
})