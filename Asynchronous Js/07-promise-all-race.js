"use strict";

let fn1= function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
            //reject(false);
        }, 3000);
    });
}


let fn2= function () {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            reject("Done");
            //resolve("Done");
        },100)
    })
}

// Promise.all([fn1(),fn2()])
// .then((data) => {
//     const [f1,f2] = data
//     console.log(f1)
//     console.log(f2);
// }).catch((err) => {
//     console.error(err);
// })


Promise.race([fn1(),fn2()])
.then((data) => {
 console.log(data);
}).catch((err) => {
    console.error("error "+err);
})
