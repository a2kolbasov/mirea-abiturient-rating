/*
 * Copyright © 2020 Александр Колбасов
 */

// todo: добавить кнопки и автодобавление меня во все списки

// let rating = new function () { // нужен this или (  func(){}  )()
let table = document.getElementsByClassName("namesTable")[0].lastElementChild;//.children;

function load() {
    let students = [];

    for (let i = 0; i < table.children.length; i++) {
        students.push(table.children[i]);
    }

    return students;
}

let students = load();

function clean() {
    while (table.childElementCount > 0) {
        table.firstChild.remove();
    }
}

function cleanAndAppend(predicate) {
    clean();

    newNum = 1;
    for (const student of students) {
        if (predicate(student)) {
            student.getElementsByClassName("num")[0].textContent = String(newNum++);
            table.appendChild(student);
        }
    }
}

function all() {
    cleanAndAppend(student => true);
    console.log('all');
}

function notToAnother() {
    cleanAndAppend(student => student.getElementsByClassName("status")[0].textContent != "Согласие на др. конкурсе");
    console.log('notToAnother');
}

function accepted() {
    cleanAndAppend(student => student.getElementsByClassName("accepted")[0].textContent == "да");
    console.log('accepted');
}
// };

function init() {
    let buttons = {
        all: document.createElement("button"),
        notToAnother: document.createElement("button"),
        accepted: document.createElement("button"),
    }

    buttons.all.textContent = "Все";
    buttons.all.setAttribute('onclick', 'all();');

    buttons.notToAnother.textContent = "Сюда и не определевшиеся";
    buttons.notToAnother.setAttribute('onclick', 'notToAnother();');

    buttons.accepted.textContent = "С согласием на зачисление";
    buttons.accepted.setAttribute('onclick', 'accepted();');

    document.getElementById('filter').appendChild(document.createElement('br'));

    for (const button in buttons) {
        document.getElementById('filter').appendChild(buttons[button]);
    }
}

init();
