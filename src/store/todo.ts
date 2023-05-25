import { makeAutoObservable } from "mobx";

const STORAGE_KEY = '@todos'

export interface ITodos {
    id: number
    title: string
    completed: boolean
}



export type IFilters = "all" | "completed" | "notCompleted"


class TodoStore {
    language = "ru"

    todos: ITodos[] = [];

    activeId = 0

    filters: IFilters = "all"

    show = false

    constructor() {
        this.set()
        this.fetch()
        makeAutoObservable(this);
    }

    set() {
        if(localStorage[STORAGE_KEY]) {
            return
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
            localStorage.setItem("language", this.language);
        }
    }

    fetch() {
        this.todos = JSON.parse(localStorage[STORAGE_KEY])
        this.language = localStorage.getItem("language") || '';
    }

    sync() {
        localStorage[STORAGE_KEY] = JSON.stringify(this.todos)
        localStorage["language"] = this.language
    }

    generateId(): number {
        let rand = Math.random()

        while(this.todos.find(todo => todo.id === rand)) {
            rand = Math.random()
        }

        return rand
    }

    find(id: ITodos['id'], callback: (todo: ITodos, index: number) => void) {
        const index = this.todos.findIndex((todo) => todo.id === id)

        if (index !== -1) {
            callback(this.todos[index], index)
        }
    }

    addTodo(todo: ITodos["title"]) {
        this.todos.push({
            id: this.generateId(),
            title: todo,
            completed: false,
        });
        this.sync()
      }

    removeTodo(id: ITodos["id"]) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.sync()
    }
  
    toggleTodo(id: ITodos["id"]) {
        const todo = this.todos.find(todo => todo.id === id)
        if(!todo) return
        todo.completed = !todo.completed
        this.sync()
    }

    updateTodo(title: string) {
        this.find(this.activeId, (todo, i) => {
            this.todos[i] = {
                ...todo,
                title,
            }

            this.sync()
        })
    }

    toogleShow() {
        this.show = !this.show
    }

    changeFilters(filters: IFilters) {
        this.filters = filters
    }

    changeActiveId(id: ITodos["id"]) {
        this.activeId =  id
    }

    changeLanguage(lang: string) {
        this.language = lang
        this.sync()
    }

    get completedTasks() {
        return this.todos.filter((todo) => todo.completed)
    }

    get notCompletedTasks() {
        return this.todos.filter((todo) => !todo.completed)
    }

  }
  
  export const todoStore = new TodoStore();