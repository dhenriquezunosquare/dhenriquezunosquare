
const add = (x, y) => x + y

// const toPair = f =>
//     ([x, y]) => f(x, y);

// const FromPair = f =>
//     (x, y) => f([x, y]);

// const result = toPair(add)([1, 2]);
// const result2 = FromPair(toPair(add))(1,2)

const curry = f => x => y => f(x, y);

const curriedAdd = curry(add)

const increment = curriedAdd(1);

const result = increment(4);

console.log(result);


/////////////// another way easy to understand 

const addCurry = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(addCurry(2)(3)(5))


