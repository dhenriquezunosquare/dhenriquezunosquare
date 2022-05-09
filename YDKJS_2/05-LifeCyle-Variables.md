
# When can i use a variable?

consider
````
greeting();

// Hello!
function greeting() {
    console.log("Hello!");
}
````

this code works because of  every identifier is created at the beginning of the scope it belongs to, every time that scope is entered(**HOISTING**).

### HOISTING: DECLARATION VS EXPRESSION

- Function Expression

```
greeting();

// TypeError
var greeting = function greeting() {
    console.log("Hello!");
};
```

this is a Hoisting example with some comments

```
var greeting; // hoisted declaration

greeting = "Hello!"; // the original line 1

console.log(greeting); // Hello!

greeting = "Howdy!"; // `var` is gone!
```

a more obvios example of hoisting is this (personally dont like work in this way)

```
studentName = "Suzy";

greeting();
// Hello Suzy!

function greeting() {
    console.log(`Hello ${ studentName }!`);
}
var studentName;
```

### Re Declaration

What do you think happens when a variable is declared more
than once in the same scope? Consider:

```
var studentName = "Frank";
console.log(studentName);
// Frank
var studentName;
console.log(studentName); // ???.....  answer: Frank
```

consider how hoisting "metaphorically" works ... the variable doesnt re declared... because they "turn the code into":

```
var studentName;
var studentName; // clearly a pointless no-op!
studentName = "Frank";
console.log(studentName);
// Frank
console.log(studentName);
// Frank
```

the preview examples works with "var" but with **let** is diffetent

```
let studentName = "Frank";
console.log(studentName);
let studentName = "Suzy"; //SyntaxError: Identifier 'studentName' has already been declared
```

### Const

The const keyword is more constrained than let. Like let,
const cannot be repeated with the same identifier in the same
scope. 

And the const variables require to be initialized . Example:

```
const empty; // SyntaxError

const studentName = "Frank";
console.log(studentName);
// Frank
studentName = "Suzy"; // TypeError cannot be reasigned
```

**Let and Const dont hoist at all**
The actual difference is that let/const declarations do not
automatically initialize at the beginning of the scope.
and var is declared and initialized

example
```
console.log(studentName);
// ReferenceError
let studentName = "Suzy";

correct code:

let studentName = "Suzy";
console.log(studentName); // Suzy

OR

let studentName;
// or:
// let studentName = undefined;
// ..
studentName = "Suzy";
console.log(studentName);
// Suzy

```

TDZ: Temporal Dead Zone -> The TDZ is the time window where a variable exists but is still
uninitialized,

# FOR AVOID LET/CONST TDZ ERROR ... initialized the const/let variables at the beginning of the scope

