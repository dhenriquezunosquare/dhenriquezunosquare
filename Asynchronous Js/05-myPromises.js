'use strict';

// let a = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve(true);
//         reject(false);
//     }, 3000);
// });

// a.then((d) => {
//     console.log(d);
// },
//     (error) => {
//         console.log(error);
//     }
// );


// let b = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             //resolve(true);
//             reject(false);
//         }, 3000);
//     });
// }

// b().then((d) => {
//     console.log(d);
// },
//     (error) => {
//         console.log(error);
//     }
// )


let setTimeoutP=(time)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(true);
        },time)
    })
}

setTimeoutP(2000).then((d) => {console.log(d);})