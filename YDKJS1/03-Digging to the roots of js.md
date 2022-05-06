
### Iterations

loops can use next() methods that return next data

one way of usign is with **for of loop** example

```
var it = [a,b,c,d,e,f,g,h,i,j];

for(let val of it) {
    console.log(val);
}
or 

for(let [index,val] of it) { ///using destructuring
    console.log(val);
}

```

we have another way of consume iterator call spread operator example:

```
var spreadvar= [...it];
```

---

### Closures

Closure is when a function remembers and continues to access variables from outside of its scope, even when the function is executed in a different scope.

closures only affect the functions.

```
function greeting(msg) {
    return function who(name) {
        console.log(`${msg}, ${name}!`);
    };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

console.log(hello);

hello("Kyle");
// Hello, Kyle!
hello("Sarah");
// Hello, Sarah!
howdy("Grant");
// Howdy, Grant!
```

this is a perfect example of a closure

```
function counter(step = 1) {
    var count = 0;
    return function increaseCount() {
        count = count + step;
        console.log(count);
        return count;
    };
}
var incBy1 = counter(1);
var incBy3 = counter(3);
incBy1(); // 1
incBy1(); // 2
incBy3(); // 3
incBy3(); // 6
incBy3(); // 9
```

i will do another example because of its no clear at all

```
function getSomeData(url) {
    ajax(url,function onResponse(resp){
        console.log(
        `Response (from ${ url }): ${ resp }`
        );
    });
}
getSomeData("https://some.url/wherever");
// Response (from https://some.url/wherever): ...
```

The inner function onResponse(..) is closed over url,
and thus preserves and remembers it until the Ajax call returns and executes onResponse(..). Even though getSomeData(..) finishes right away, the url parameter variable is
kept alive in the closure for as long as needed.

---

### This KeyWord

this is used for the excecution context

this a good example for "this"

```
function classroom(teacher) {
    return function study() {
        console.log(
            `${teacher} says to study ${this.topic}`
        );
    };
}
var assignment = classroom("Kyle");

assignment();
// Kyle says to study undefined

    var homework = {
        topic: "JS",
        assignment: assignment
    };
    homework.assignment();
    // Kyle says to study JS

    var otherHomework = {
    topic: "Math"
};
    assignment.call(otherHomework); // OtherHomework object "is created inside asignment scope"
    // Kyle says to study Math
```

---

### Prototypes

objects characteristics that links two objects, This prototype linkage occurs when an object is created; it’s linked to another object that already exists.

("is like an herency of properties/methods")

for example anyobject.toString()

```

var homework = {
    topic: "JS",
    fecha:"hoy"
};
var otherHomework = Object.create(homework);

otherHomework.topic = "Math";

console.log(homework);
console.log(otherHomework);

```

