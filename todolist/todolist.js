const lsVisistorsKey = '@visitorsCounter'

let localStorageMemory = [];

const defaultLsVisitors = {
    count: 0,
    lastVisit: getCurrentDateAndTime(),
}

function getCurrentDateAndTime() {
    const locale = 'pt-BR'
    const date = new Date()

    options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const time = new Intl.DateTimeFormat(locale, options).format(date)
    return time
}

function headerTitle() {

    const p = document.createElement('p');

    p.textContent = `To Do List`;

    const header = document.querySelector('header');

    header.appendChild(p);
}

function footerAd() {

    const p = document.createElement('p');

    p.textContent = `© 2024 To Do List`;

    const footer = document.querySelector('footer');

    footer.appendChild(p);
}

function countVisitors() {
    const lsVisitors =
        localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
    const lsVisitorsObj = JSON.parse(lsVisitors)

    lsVisitorsObj.count++
    lsVisitorsObj.lastVisit = getCurrentDateAndTime()

    localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

    const p = document.createElement('p')
    p.id = 'visitors-counter'
    p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

    const footer = document.querySelector('footer')

    footer.appendChild(p)
}

function taskRegistered(event) {

    event.preventDefault();

    const form = event.target;

    const taskForm = new FormData(form);

    let taskObj = { titulo: taskForm.get('titulo'), descricao: taskForm.get('descricao') };

    if (JSON.parse(localStorage.getItem('tasks'))?.length > 0) {

        localStorageMemory = JSON.parse(localStorage.getItem('tasks'));
    }

    localStorageMemory.push(taskObj);

    localStorage.setItem('tasks', JSON.stringify(localStorageMemory));

    const titleInput = document.getElementById('titulo');
    titleInput.value = "";

    const descriptionInput = document.getElementById('descricao');
    descriptionInput.value = "";

    alert(`Tarefa cadastrada`);

    showLastTask();
}

function showTasks() {

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach((task) => {

        const main = document.querySelector('main');

        const div = document.createElement('div');

        const h1 = document.createElement('h1');

        const p = document.createElement('p');

        h1.textContent = `${task.titulo}`;
        p.textContent = `${task.descricao}`;

        div.appendChild(h1);
        div.appendChild(p);

        main.appendChild(div);
    });
}

function showLastTask() {

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    const task = tasks[tasks.length - 1];

    const main = document.querySelector('main');

    const div = document.createElement('div');

    const h1 = document.createElement('h1');

    const p = document.createElement('p');

    h1.textContent = `${task.titulo}`;
    p.textContent = `${task.descricao}`;

    div.appendChild(h1);
    div.appendChild(p);

    main.appendChild(div);
}

document.addEventListener('DOMContentLoaded', function () {
    headerTitle();
    footerAd();
    countVisitors();
    showTasks();
})