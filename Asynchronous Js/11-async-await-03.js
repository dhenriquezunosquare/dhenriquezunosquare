"use strict";

let url = "https://jsonplaceholder.typicode.com/todos/";


let todo={
    completed:false,
    userId:1,
    title: "Learn asyn-await2 Javascript",

};

let addTodo= async(todo) => {

    try {
        let resp = await fetch(url,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        });
    
        let data = await resp.json();
        console.log(data);
    } catch (error) {
        console.error(error);   
    }
   

}

addTodo(todo);