"use strict";

let fn1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
            //reject(false);
        }, 3000);
    });
}


let fn2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done");
            //resolve("Done");
        }, 100)
    })
}


var asynFunction = async () => {
    try {
        let [f1, f2] = await Promise.all([fn1(), fn2()]);
        console.log(f1);
        console.log(f2);
    } catch (error) {
        console.error(error);
    }

}

asynFunction();