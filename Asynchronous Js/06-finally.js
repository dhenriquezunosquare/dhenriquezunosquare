"use strict";

let b = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
            //reject(false);
        }, 3000);
    });
}

b().then((d) => {
    console.log(d);
})
.catch((err) => {console.log(err);})
.finally(() => {
    console.log("Terminado")
})