

const toUpper = (str) => (str.toUpperCase());

const exclaim = (str) => (str + "!");

const fisrt = (arr) => (arr[0]);

const compose = (f,g) => (x) =>  f(g(x)) ;

const shout = compose(toUpper,exclaim)

console.log(shout("David"));