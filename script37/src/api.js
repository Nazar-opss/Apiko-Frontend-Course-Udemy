class Api {
  constructor() {
    this.url = "https://api-nodejs-todolist.herokuapp.com/";
    this.headers = { "Content-Type": "application/json" };
  }

  async register() {
    const res = await fetch(`${this.url}user/register`, {
      method: "POST",
      headers: this.headers,
      // Тут потрібно використовувати ваш name, email, age та password відповідно до прикладу у документації
      body: JSON.stringify({
        "name": "Muhammad Nur Ali",
        "email": "muh.nurali43@gmail.com",
        "password": "12345678",
        "age": 20
      })
    });
    const data = await res.json();
    this.headers.Authorization = `Bearer ${data.token}`;
  }

  async login() {
    const res = await fetch(`${this.url}user/login`, {
      method: "POST",
      headers: this.headers,
      // Тут потрібно використовувати ваш email та password відповідно до прикладу у документації
      body: JSON.stringify({
        "email": "muh.nurali43@gmail.com",
        "password": "12345678"
      })
    });
    const data = await res.json();
    this.headers.Authorization = `Bearer ${data.token}`;
  }

  // Написати функцію яка повертає масив ToDo елементів із API
  async fetchAllTodoItems() {
    
  }

  // Написати функцію яка відсилає ToDo елемент до API та повертає результат
  async addTodoItem(todoDescription) {}

  // Написати функцію яка видаляє ToDo елемент з API
  async removeTodoItem(id) {}

  // Написати функцію яка оновляє ToDo елемент у API
  async updateTodoItem(id, completed) {}
}

export default new Api();
