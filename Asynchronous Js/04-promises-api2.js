
'use strict';

let url = "https://jsonplaceholder.typicode.com/todos/";

// const fn1=(url)=>{
//     fetch(url)
//     .then((result)=>{
//         return result.json();
//     })
//     .then((data)=>{
//         console.log(data)
//     })
// }

let todo={
    completed:false,
    userId:1,
    title: "Learn Promise Javascript",

};

fetch(url,{
    method:'POST',
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify(todo)
}).then((result)=>{
    return result.json();
})
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.log(error);
})

//fn1(url);