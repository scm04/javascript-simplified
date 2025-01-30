/**
 * Add Todo: User clicks "Add Todo" button (submits the form) and the todo
 * is added to the list.
 */
const form = document.querySelector("#new-todo-form") as HTMLFormElement
const todoInput = document.querySelector("#todo-input") as HTMLInputElement
const list = document.querySelector("#list") as HTMLUListElement
const todoTemplate = document.querySelector("#list-item-template") as HTMLTemplateElement
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`

type TODO = {
	name: string
	complete: boolean
	id: string
}

let todos: TODO[] = loadTodos()
todos.forEach(renderTodo)

form.addEventListener("submit", e => {
	e.preventDefault()

	const todoName = todoInput.value
	if (todoName === "") return

	const newTodo: TODO = {
		name: todoName,
		complete: false,
		id: new Date().valueOf().toString()
	}
	todos.push(newTodo)
	renderTodo(newTodo)
	saveTodos()
	todoInput.value = ""
})

function renderTodo(todo: TODO) {
	const todoElement = todoTemplate.content.cloneNode(true) as DocumentFragment

	const listItem = todoElement.querySelector(".list-item") as HTMLLIElement
	listItem.dataset.todoId = todo.id

	const textElement = todoElement.querySelector(
		"[data-list-item-text]"
	) as HTMLSpanElement
	textElement.innerText = todo.name

	const checkbox = todoElement.querySelector(
		"[data-list-item-checkbox]"
	) as HTMLInputElement
	checkbox.checked = todo.complete

	list.appendChild(todoElement)
}

/**
 * Save Todo: Save the todos to Local Storage.
 */
function saveTodos() {
	localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

/**
 * Load Todo: Load the todos from Local Storage.
 */
function loadTodos(): TODO[] {
	let storedValue: unknown = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY) ?? "")
	return (storedValue ?? []) as TODO[]
}

/**
 * Complete Todo: When a checkbox is clicked, determine which item was completed,
 * update that item in the list, and save the update to Local Storage.
 */
list.addEventListener("change", e => {
	if (e.target == null) return
	const target = e.target as HTMLInputElement
	if (!target.matches("[data-list-item-checkbox]")) return

	const parent = target.closest(".list-item") as HTMLLIElement
	const todoId = parent.dataset.todoId
	const todo = todos.find(t => t.id === todoId) as TODO

	todo.complete = target.checked

	saveTodos()
})

/**
 * Delete Todo: When a delete button is clicked, determine which item was deleted,
 * remove it from the list, and update Local Storage.
 */
list.addEventListener("click", e => {
	if (e.target == null) return
	const target = e.target as HTMLButtonElement
	if (!target.matches("[data-button-delete]")) return

	const parent = target.closest(".list-item") as HTMLLIElement
	const todoId = parent.dataset.todoId
	parent.remove()

	todos = todos.filter(t => t.id !== todoId)
	saveTodos()
})
