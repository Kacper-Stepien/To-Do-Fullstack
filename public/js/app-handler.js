const pageErrorModal = document.querySelector('.page-error');
// const addTaskTitle = document.querySelector('.modal-title');
// const addTaskDescription = document.querySelector('.modal-textarea');
// const addTaskBtn = document.querySelector('.modal-add-task');
// const addTaskEmptyTitleError = document.querySelector('.emptyTitleError');
const logoutBtn = document.getElementById('logout-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const deleteAllTasksBtn = document.getElementById('delete-all-tasks-btn');

const userLogin = document.querySelector('.user-login')
const userName = document.querySelector('.user-name');
const tasksDone = document.querySelector('.completed');
const tasksUncompleted = document.querySelector('.uncomplited');
const tasksAll = document.querySelector('.all');
const progressBarLevel = document.querySelector('.progress-bar');

const tasksFinishedList = document.querySelector('.tasks-finished')
const tasksUnfinishedList = document.querySelector('.tasks-unfinished');

const deleteAllUncompletedTaskBtn = document.querySelector('.deleteAllTaskBtn');

const allUnfinishedTaskShowedOnPage = document.getElementsByClassName('.task-unfinished');
const allFinishedTasksShowedOnPage = document.getElementsByClassName('.task-finished');

const taskInfoSection = document.querySelector('.task-info-section');
const taskInfoSectionTitle = document.querySelector('.task-info-section-title');
const taskInfoSectioDate = document.querySelector('.task-info-section-date');
const taskInfoSectionDescription = document.querySelector('.task-info-section-description');

const linkToAuthorPage = document.getElementById('link-to-contact');


// Modals
const errorModal = document.getElementById('error-modal');
const errorModalCloseBtn = document.getElementById('close-error-modal');
const errorModalTitle = document.getElementById('error-modal-title');
const errorModalDescription = document.getElementById('error-modal-text');

const addTaskModal = document.getElementById('add-task-modal');
const addTaskModalCloseBtn = document.getElementById('close-add-task-modal');
const addTaskModalError = document.getElementById('add-task-modal--empty-title-error');
const addTaskModalTitle = document.getElementById('add-task-modal--title');
const addTaskModalDescription = document.getElementById('add-task-modal--text');
const addTaskModalPriority = document.getElementById('add-task-modal--priority');
const addTaskModalConfirmBtn = document.getElementById('add-task-modal--btn');

const modifyTaskModal = document.getElementById('modify-task-modal');
const modifyTaskModalCloseBtn = document.getElementById('close-modify-task-modal');
const modifyTaskModalError = document.getElementById('modify-task-modal--empty-title-error');
const modifyTaskModalTitle = document.getElementById('modify-task-modal--title');
const modifyTaskModalDescription = document.getElementById('modify-task-modal--text');
const modifyTaskModalPriority = document.getElementById('modify-task-modal--priority');
const modifyTaskModalConfirmBtn = document.getElementById('modify-task-modal--btn');
const overflow = document.querySelector('.overflow');

// Animations
let goLeft = [
    { background: 'linear-gradient(to right bottom, #780000, #d90429)' },
    { transform: 'rotate(0) scale(0.9)', background: 'linear-gradient(to right bottom, #780000, #d90429)' },
    { transform: 'translateX(-2000px)', background: 'linear-gradient(to right bottom, #780000, #d90429)' }
];

let goDown = [
    { background: 'linear-gradient(to right bottom,#008000, #38b000)' },
    { transform: 'rotate(0) scale(0.9)', background: 'linear-gradient(to right bottom, #008000, #38b000)' },
    { transform: 'translateY(500px)', background: 'linear-gradient(to right bottom, #008000, #38b000)' }
];

let Timing = {
    duration: 1200,
    iterations: 1,
}

function addDate() {
    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 25} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return date;
}

function formatDateFromDataBase(date) {
    let dateObject = new Date(date);
    let year = dateObject.getFullYear();
    let month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    let day = ('0' + dateObject.getDate()).slice(-2);
    let hours = ('0' + dateObject.getHours()).slice(-2);
    let minutes = ('0' + dateObject.getMinutes()).slice(-2);
    let seconds = ('0' + dateObject.getSeconds()).slice(-2);
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

function openErrorModal(title, description) {
    errorModalTitle.innerText = title;
    errorModalDescription.innerText = description;
    errorModal.classList.remove('hidden');
    overflow.classList.remove('hidden');
    document.body.style.overflow = "hidden";
}

// Function get data about user and his tasks from database - return object with user data and tasks data
const getUserData = async () => {
    const result = await fetch("http://localhost:8000/user-info", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await result.json();
    return data;
}

// Function display user data and tasks data on page - it takes object with user data and tasks data as argument
const displayInfoAboutUser = (data) => {
    let user = data.user[0];
    let tasksFinished = data.tasksFinished;
    let tasksUnfinished = data.tasksUnfinished;
    console.log(user);
    console.log(tasksFinished);
    console.log(tasksUnfinished);
    userLogin.innerText = user.login;
    userName.innerText = user.name + " " + user.surname;
    tasksDone.innerText = tasksFinished.length;
    tasksUncompleted.innerText = tasksUnfinished.length;
    tasksAll.innerText = tasksFinished.length + tasksUnfinished.length;

    let progress = parseInt(parseInt(tasksDone.innerHTML) / parseInt(tasksAll.innerHTML) * 100);
    progress === NaN ? progressBarLevel.setAttribute("style", `width: 0%`) : progressBarLevel.setAttribute("style", `width: ${progress}%`);
}

const displayTasksUncompleted = (data) => {
    tasksUnfinishedList.innerHTML = "";
    let tasks = data.tasksUnfinished;
    if (tasks.length === 0) {
        tasksUnfinishedList.innerHTML = "<h2>Brak zadań</h2>"
    }
    else {
        for (let i = 0; i < tasks.length; i++) {
            let priority = tasks[i].priority;
            let addedDate = formatDateFromDataBase(tasks[i].added_date);
            let modifyDate = tasks[i].last_modify_date ? formatDateFromDataBase(tasks[i].last_modify_date) : "";

            let task = `<div class="task task-unfinished ${priority}" data-taskid="${tasks[i].idtask}" data-description="${tasks[i].description}" data-priority="${tasks[i].priority}">` +
                `<button class="btn taskBtn addBtn"> <i class="fa-solid fa-check"></i></button>` +
                `<button class="btn taskBtn modifyBtn"> <i class="fa-solid fa-gear"></i></button >` +
                `<button class="btn taskBtn deleteBtn"> <i class="fa-solid fa-trash-can"></i></button>` +
                `<div class="task-info"> ` +
                `<div class="task-title">${tasks[i].title}</div > ` +
                `<div class="task-dates"> ` +
                `<div class="task-date">${addedDate}</div > ` +
                `<div class="task-last-edit">${modifyDate}</div > </div ></div ></div >`;

            tasksUnfinishedList.innerHTML += task.trim();
        }
    }
}

const displayTaskCompleted = (data) => {
    tasksFinishedList.innerHTML = "";
    let tasks = data.tasksFinished;
    if (tasks.length === 0) {
        tasksFinishedList.innerHTML = "<h2>Brak zadań ukończonych</h2>"
    }
    else {
        for (let i = 0; i < tasks.length; i++) {
            let addedDate = formatDateFromDataBase(tasks[i].added_date);
            let modifyDate = tasks[i].last_modify_date ? formatDateFromDataBase(tasks[i].last_modify_date) : "";

            let task = `<div class="task task-finished" data-taskid="${tasks[i].idtask}" data-description="${tasks[i].description}">` +
                `<button class="btn taskBtn deleteBtn"> <i class="fa-solid fa-trash-can"></i></button>` +
                `<div class="task-info"> ` +
                `<div class="task-title">${tasks[i].title}</div > ` +
                `<div class="task-dates"> ` +
                `<div class="task-date">${addedDate}</div > ` +
                `<div class="task-last-edit">${modifyDate}</div > </div ></div ></div >`;

            tasksFinishedList.innerHTML += task.trim();
        }
    }
};

const addTask = async () => {

    let title = addTaskModalTitle.value;
    if (title === "") {
        addTaskModalError.innerText = "Tytuł zadania nie może być pusty";
    }
    else {
        addTaskModalError.innerText = "";
        let date = addDate();

        let task = {
            title: addTaskModalTitle.value,
            description: addTaskModalDescription.value || "Brak opisu",
            priority: addTaskModalPriority.value,
            finished: "0",
            date_added: date
        }

        const result = await fetch("http://localhost:8000/add-task", {
            method: "post",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await result.json();
        console.log(data);
        if (data.status === "ok") {
            addTaskModal.classList.add("hidden");
            overflow.classList.add("hidden");
            const data = await getUserData();
            displayTasksUncompleted(data);
        }
        else {
            openErrorModal("Błąd", "Nie udało się dodać zadania");
        }
    }
}

const checkTaskAsDone = async (taskId) => {
    try {
        let task = {
            idtask: taskId,
            modifyDate: addDate()
        }
        console.log(task);
        const result = await fetch("http://localhost:8000/check-task-as-done", {
            method: "post",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await result.json();
        if (data.status === "ok") {
            let dataUser = await getUserData();
            displayTasksUncompleted(dataUser);
            displayTaskCompleted(dataUser);
        }
        else {
            openErrorModal("Błąd", "Nie udało się oznaczyć zadania jako ukończone");
        }
    }
    catch (err) {
        openErrorModal("Błąd", "Nie udało się oznaczyć zadania jako ukończone");
    }
}

const deleteTask = async (taskId) => {
    try {
        const result = await fetch("http://localhost:8000/delete-task", {
            method: "post",
            body: JSON.stringify({ idtask: taskId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await result.json();
        if (data.status === "ok") {
            let dataUser = await getUserData();
            displayTasksUncompleted(dataUser);
            displayTaskCompleted(dataUser);
        }
        else {
            openErrorModal("Błąd", "Nie udało się usunąć zadania");
        }
    }
    catch (error) {
        openErrorModal("Błąd", "Nie udało się usunąć zadania");
    }
}

const openModifyTaskModal = (div) => {
    let taskId = div.dataset.taskid;
    let title = div.querySelector(".task-title").innerText;
    let description = div.dataset.description;
    let priority = div.dataset.priority;

    modifyTaskModalTitle.value = title;
    if (description === "" || description === "null")
        modifyTaskModalDescription.value = "";
    else
        modifyTaskModalDescription.value = description;
    modifyTaskModalPriority.value = priority;
    modifyTaskModal.classList.remove('hidden');
    overflow.classList.remove('hidden');
    document.body.style.overflow = "hidden";

    modifyTaskModalConfirmBtn.addEventListener('click', async () => {
        let newTitle = modifyTaskModalTitle.value;
        let newDescription = modifyTaskModalDescription.value;
        let newPriority = modifyTaskModalPriority.value;
        let dateModified = addDate();

        if (newTitle === "") {
            modifyTaskModalError.innerText = "Tytuł zadania nie może być pusty";
        }
        else if (newTitle === title && newDescription === description && newPriority === priority) {
            modifyTaskModalError.innerText = "Nie wprowadzono żadnych zmian";
        }
        else {
            try {
                let task = {
                    idtask: taskId,
                    title: newTitle,
                    description: newDescription,
                    priority: newPriority,
                    modifyDate: dateModified
                }
                const result = await fetch("http://localhost:8000/modify-task", {
                    method: "post",
                    body: JSON.stringify(task),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === "ok") {
                    modifyTaskModal.innerText = "Zmodyfikowano zadanie";
                    setTimeout(() => {
                        modifyTaskModal.classList.add('hidden');
                        overflow.classList.add('hidden');
                        window.location.reload();
                    }, 1000);
                }
            }
            catch (err) {
                openErrorModal("Błąd", "Nie udało się zmodyfikować zadania");
            }
        }
    });

}

const showeDescription = (div) => {
    let title = div.querySelector(".task-title").innerText;
    let description = div.dataset.description;
    taskInfoSectionTitle.innerText = title;
    taskInfoSectionDescription.innerText = description;
    if (description === "" || description === "null") {
        taskInfoSectionDescription.innerText = "Brak opisu";
    }
    taskInfoSectionDescription.classList.remove('hidden');
}




// Main program - checking if user is logged in
const checkIfUserIsLoggedIn = async () => {
    const response = await fetch("http://localhost:8000/user-logged-in", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (data.status === "error") {
        window.location.href = "http://localhost:8000/login";
    } else {
        const data = await getUserData();
        displayInfoAboutUser(data);
        displayTasksUncompleted(data);
        displayTaskCompleted(data);
        addDate();
    }
}


// Event listeners
logoutBtn.addEventListener('click', async () => {
    const response = await fetch("http://localhost:8000/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (data.status === "ok") {
        window.location.href = "http://localhost:8000/login";
    }
    else {
        console.log("Error");
        window.alert("Błąd serwera, nie udało się wylogować");
    }
});

addTaskBtn.addEventListener('click', () => {
    addTaskModal.classList.remove("hidden");
    addTaskModalTitle.value = "";
    addTaskModalDescription.value = "";
    overflow.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

addTaskModalCloseBtn.addEventListener('click', () => {
    addTaskModal.classList.add("hidden");
    overflow.classList.add("hidden");
    document.body.style.overflow = "auto";
});

overflow.addEventListener('click', () => {
    errorModal.classList.add("hidden");
    addTaskModal.classList.add("hidden");
    modifyTaskModal.classList.add("hidden");
    overflow.classList.add("hidden");
    document.body.style.overflow = "auto";
});


addTaskModalConfirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

modifyTaskModalConfirmBtn.addEventListener('click', (e) => { });

modifyTaskModalCloseBtn.addEventListener('click', () => {
    modifyTaskModal.classList.add("hidden");
    overflow.classList.add("hidden");
    document.body.style.overflow = "auto";
});

errorModalCloseBtn.addEventListener('click', () => {
    errorModal.classList.add("hidden");
    overflow.classList.add("hidden");
    document.body.style.overflow = "auto";
});


tasksUnfinishedList.addEventListener('click', function (e) {
    let target = e.target;

    // Check if we click the div with task - but not buttons on this div
    if (target.classList.contains("task-unfinished")) {
        showeDescription(target);
    }

    // Check if we click delete button on the div
    else if (target.classList.contains("deleteBtn")) {
        let div = target.parentElement;
        let idTask = div.dataset.taskid;
        div.animate(goLeft, Timing);
        setTimeout(function () {
            deleteTask(idTask);
        }, 900);
    }

    // Check if we click add to finished button on the div
    else if (target.classList.contains("addBtn")) {
        let div = target.parentElement;
        let idTask = div.dataset.taskid;
        div.animate(goDown, Timing);
        setTimeout(function () {
            checkTaskAsDone(idTask);
        }, 900);

    }

    // Check if we click modify button on the div
    else if (target.classList.contains("modifyBtn")) {
        let div = target.parentElement;
        let idTask = div.dataset.taskid;
        openModifyTaskModal(div);
    }
});

tasksFinishedList.addEventListener('click', function (e) {
    let target = e.target;
    // Check if we click the div with task - but not buttons on this div
    if (target.classList.contains("task-finished")) {
        showeDescription(target);
    }
    // Check if we click delete button on the div
    else if (target.classList.contains("deleteBtn")) {
        let div = target.parentElement;
        let idTask = div.dataset.taskid;
        div.animate(goLeft, Timing);
        setTimeout(function () {
            deleteTask(idTask);
        }, 900);
    }
});

linkToAuthorPage.addEventListener('click', () => {
    window.location.href = "http://localhost:8000/author";
});

checkIfUserIsLoggedIn();