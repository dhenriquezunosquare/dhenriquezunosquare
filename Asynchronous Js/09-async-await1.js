"use strict";

const plainFunction=async ()=>{
    let p= await fn1();
    console.log(p)
    return 'done';
}


async function fn1(){
    console.log("function plainFunction")
    return 'async await';
}

plainFunction();