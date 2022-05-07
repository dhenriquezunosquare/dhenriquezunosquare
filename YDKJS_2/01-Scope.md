
-  JS is in fact parsed/compiled in a
separate phase before execution begins. (NOT AN INTERPRETED SCRIPTING LANGUAGE)

- Modules are a code organization pattern characterized by
public methods that have privileged access (via closure) to
hidden variables and functions in the internal scope of the
module.

---

### Compiled vs Interpreted

Code compilation : is
a set of steps that process the text of your code and turn
it into a list of instructions the computer can understand.

the difference between compiled and Interpreted is that compiled prceess all at once, and the iterpreted process line by line

---

### compling code
In classic compiler theory, a program is processed by a compiler in three basic stages:

1. tokenizing/lexing-> bassically sintax/writing erros like var, a,=,2,;

2. Parsing-> Abstract Syntax Tree (AST) BASICALLY HAS A GOOD ESTRUCTURE OF SINTAX

3. Code Generation-> taking the AST and turning it into executable code.

---

### Required : two phases

 importat: processing of JS programs is that is occurs in (at least) two phases: parsing/compilation first, then execution.

Syntax Errors from the Start
```
var greeting = "Hello";
console.log(greeting);
greeting = ."Hi";
// SyntaxError: unexpected token .
```

a compiled error will be this

```
console.log("Howdy");
saySomething("Hello","Hi");

// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting,greeting) {
    "use strict";
    console.log(greeting);
}
```

Hoisting 

```
function saySomething() {
var greeting = "Hello";
    {
        greeting = "Howdy"; // error comes from here
        let greeting = "Hi";
        console.log(greeting);
    }
}

```

--- 

### Compiler Speak

havins this code 

```
var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];
function getStudentName(studentID) {
    for (let student of students) {
        if (student.id == studentID) {
        return student.name;
        }
    }
}

var nextStudent = getStudentName(73);
console.log(nextStudent);
// Suzy

```

**We have 2 terms importants for the JsEngine**

- Targets
  Check if there is a value that is being assigned to it; if so, it’s a target. 
  
  for examples:

```
//the asignaments are targets
students = [ //... 

//the state,em assogms a value to student in each iteration
for (let student of students) {


```

- source

wheres is not assinging values, is a source referncs, for examlpe

```
if (student.id == studentID) //NO SE ASINGA VARIABLE
```

---

### Lexical Scope

when you declared a (let/const) variable then its associated with the nearest enclosin {..}

