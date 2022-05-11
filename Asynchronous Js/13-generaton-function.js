"use strict";

function *getTest(){

    let x=0;
    console.log("starting test");

    x++;
    yield;
    console.log(x);

    x++;
    yield
    console.log(x);

    console.log("Ending test");

    return x;

}


let step= getTest()

console.log(step.next());
console.log(step.next());
console.log(step.next());