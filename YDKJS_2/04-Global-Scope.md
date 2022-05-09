# Global Scope

 the global scope is located in the outermost portion of a file. not inside any function or other block.

for example  saludo.js file:

```
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
```

var studentName  and hello function are in the global scope.

That means if you access the global object (commonly, window in the browser), you’ll find properties of those same
names there:

```
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ window.studentName }!`);
}
window.hello();
// Hello, Kyle!
```

### Global shadowing Global

a global object property can be
shadowed by a global variable

```
window.something = 42;
let something = "Kyle";
console.log(something);
// Kyle
console.log(window.something);
// 42
```

### DOM Global

consider this example:

```
<ul id="my-todo-list">
    <li id="first">Write a book</li>
</ul>
And the JS for that page could include:

first;
// <li id="first">..</li>

window["my-todo-list"];
// <ul id="my-todo-list">..</ul>
```
If the id value is a valid lexical name (like first), the lexical variable is created. If not, the only way to access that global is through the global object (window[..]).

### Es Modules ( ESM)
using saludo2.js file
```
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
export hello;
```

Despite being declared at the top level of the (module) file,
in the outermost obvious scope, studentName and hello are
not global variables. Instead, they are module-wide, or if you
prefer, “module-global”

### Node 

node treats every single js file that is loads . Node programs is never actually the global scope. they use the ES Modules

for example:

```
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
module.exports.hello = hello;
```

The only way to do so is to add properties to another of Node’s
automatically provided “globals,” which is ironically called
global. global is a reference to the real global scope object,
somewhat like using window in a browser JS environment.

example:

```
global.studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
module.exports.hello = hello;
```

Remember, the identifier global is not defined by JS; it’s
specifically defined by Node.

### Global This

As of ES2020, JS has finally defined a standardized reference
to the global scope object, called "globalThis". So, subject to
the recency of the JS engines your code runs in, you can use
globalThis in place of any of those other approaches.