
### Values vs references

- Between primitive values the assigned/passed is always a copy (NO AT MEMORY REFERENCE - DIFERENTE ESPACIO EN MEMORIA)

```
var myName = "Kyle";
var yourName = myName;
myName = "Frank";
console.log(myName);
// Frank
console.log(yourName);
// Kyle
```

- Working with objects or functions is different its works with references

```
var myAddress = {
    street: "123 JS Blvd",
    city: "Austin",
    state: "TX"
};
    var yourAddress = myAddress;
    // I've got to move to a new house!
    myAddress.street = "456 TS Ave";
    console.log(yourAddress.street);
    // 456 TS Ave
```

---

### SO MANY FUNCIONS FORMS

```
var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff;
};
// generator function declaration
function *two() { .. }
// async function declaration
async function three() { .. }
// async generator function declaration
async function *four() { .. }
// named function export declaration (ES6 modules)
export function five() { .. }


```

---

### COERCIVE CONDITIONAL COMPARISON

```

var x = 1;
if (x) {
    // will run!
}
while (x) {
    // will run, once!
    x = false;
}

var x = "hello";
if (x) {
    // will run!
}
if (x == true) {
    // won't run 
}

```

---

### PROTOTYPAL CLASSES

```

var Classroom = {
    welcome() {
        console.log("Welcome, students!");
    }
};
var mathClass = Object.create(Classroom);
mathClass.welcome();
// Welcome, students!


class Classroom {
    constructor() {
        // ..
    }
    welcome() {
    console.log("Welcome, students!");
    }
}
var mathClass = new Classroom();
mathClass.welcome();
// Welcome, students!

```
