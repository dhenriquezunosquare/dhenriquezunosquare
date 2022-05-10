# Module Pattern

### Encapsulation

If we bundle everything that powers a list of search results into a single file called “search-list.js”, we’re encapsulating that part of the program

### Module

a module is a collection of related dataand functions

#### Namespaces

if u group functions but not data, then you dont have an module. you have a Namespaces

Examle

```
var Utils = {
    cancelEvt(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    },
    wait(ms) {
        return new Promise(function c(res) {
            setTimeout(res, ms);
        });
    },
    isValidEmail(email) {
        return /[^@]+@[^@.]+\.[^@.]+/.test(email);
    }
};
```

#### Data Structures
if have data and statful functions is not necessary meaans that u have a module

example:

```
// data structure, not module
var Student = {
    records: [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ],
    getName(studentID) {
        var student = this.records.find(
            student => student.id == studentID
        );
        return student.name;
    }
};
Student.getName(73);
    // Suzy
```


A Module needs more control ... it will be something like this.

```
var Student = (function defineStudent() {
    var records = [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ];
    var publicAPI = {
        getName
    };
    return publicAPI;
    // ************************
    function getName(studentID) {
        var student = records.find(
            student => student.id == studentID
        );
        return student.name;
    }
})();
Student.getName(73);
```

in this example, Only properties added to the
public API object returned from the function will be exported
for external public use.

### Node CommonJS Modules

in node the modules are file-bases, one module per file.

example:
```
module.exports.getName = getName; // i USUALLY WRITE THIS AT THE FINAL OF THE MODULE
// ************************
var records = [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 }
];
function getName(studentID) {
    var student = records.find(
        student => student.id == studentID
    );
    return student.name;
}

// defining a new object for the API. I USUALLY DO IN THIS WAY
module.exports = {
    // ..exports..
};

```

And the implementation of the previous module would be something like this.

```
var Student = require("/path/to/student.js");
or 
var { getName } = require("/path/to/student.js");

Student.getName(73);
// Suzy
```

now we have default exportation 
for example:

```
export default function getName(studentID) {
// ..
}

AND ITS IMPLEMENTED :
import getName from "/path/to/students.js";
getName(73);
```


Non-default exports are referred to as “named exports.”

EXAMLPE:
````
export function getName(studentID) {
// ..
}

AND ITS IMPLEMENTATION:

import { getName } from "/path/to/students.js";
getName(73); // Suzy
```