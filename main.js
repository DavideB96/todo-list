"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => createTodoElement(todo.text, todo.completed));

  document.getElementById("todoInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });
  document.getElementById("addBtn").addEventListener("click", addTodo);
});

function addTodo() {
  const input = document.getElementById("todoInput");
  const todoText = input.value.trim();

  if (todoText !== "") {
    createTodoElement(todoText, false);
    input.value = "";
    input.focus();
    saveTodos();
  }
}

function createTodoElement(text, completed) {
  const todoList = document.getElementById("todoList");
  const newTodo = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const todoSpan = document.createElement("span");
  todoSpan.textContent = text;
  if (completed) todoSpan.classList.add("completed");

  checkbox.addEventListener("change", () => {
    todoSpan.classList.toggle("completed", checkbox.checked);
    saveTodos();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Rimuovi";
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(newTodo);
    saveTodos();
  });

  newTodo.appendChild(checkbox);
  newTodo.appendChild(todoSpan);
  newTodo.appendChild(deleteButton);

  todoList.appendChild(newTodo);
}

function saveTodos() {
  const todoList = document.getElementById("todoList");
  const todos = [];

  todoList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input").checked;
    todos.push({ text, completed });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}