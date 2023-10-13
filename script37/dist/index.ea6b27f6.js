// Написати функцію яка залогінює користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
var e=new class{constructor(){this.url="https://api-nodejs-todolist.herokuapp.com/",this.headers={"Content-Type":"application/json"}}async register(){let e=await fetch(`${this.url}user/register`,{method:"POST",headers:this.headers,// Тут потрібно використовувати ваш name, email, age та password відповідно до прикладу у документації
body:JSON.stringify({name:"Muhammad Nur Ali",email:"muh.nurali43@gmail.com",password:"12345678",age:20})}),o=await e.json();this.headers.Authorization=`Bearer ${o.token}`}async login(){let e=await fetch(`${this.url}user/login`,{method:"POST",headers:this.headers,// Тут потрібно використовувати ваш email та password відповідно до прикладу у документації
body:JSON.stringify({email:"muh.nurali43@gmail.com",password:"12345678"})}),o=await e.json();this.headers.Authorization=`Bearer ${o.token}`}// Написати функцію яка повертає масив ToDo елементів із API
async fetchAllTodoItems(){}// Написати функцію яка відсилає ToDo елемент до API та повертає результат
async addTodoItem(e){}// Написати функцію яка видаляє ToDo елемент з API
async removeTodoItem(e){}// Написати функцію яка оновляє ToDo елемент у API
async updateTodoItem(e,o){}};window.login=()=>new e.login,// Написати функцію яка реєструє користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.register=()=>{// Писати код тут
},// Написати функцію яка добавляє ToDo елемент до API та фронта
window.addTodo=()=>{let e=document.getElementById("descriptionInput");e.value,// Писати код тут
// Очищає інпут
e.value=""},// Написати функцію(приймає id та completed - поточний стан ToDo елемента) яка модифікує Todo елемента на API та фронті.
window.modifyTodo=(e,o)=>{// Писати код тут
},// Написати функцію(приймає id ) яка видаляє ToDo елемент із API та фронта.
window.removeTodo=e=>{// Писати код тут
};//# sourceMappingURL=index.ea6b27f6.js.map

//# sourceMappingURL=index.ea6b27f6.js.map
