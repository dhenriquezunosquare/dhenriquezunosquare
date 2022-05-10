### Implied Scope

a new scope is created an maybe dont looks like a scope (Blue)
```
// outer/global scope: RED(1)
function getStudentName(/*BLUE(2)*/ studentID = 0) {
    // function scope: GREEN(3)
    // ..
}
```

another examples can be :

```

function whatsTheDealHere(id,defaultID = () => id) {
    id = 5;
    console.log( defaultID() );
}
whatsTheDealHere(3);
// 5



function whatsTheDealHere(id,defaultID = () => id) {
    var id = 5;
    console.log( defaultID() );
}
whatsTheDealHere(3);
// 3
```

in these examples we can notice the different in the scope of id in de defaultID function

lets "debug" the 2nd exaample withs consoles.logs

```
function whatsTheDealHere(id, defaultID = () => id) {
    var id;
    console.log(`local variable 'id': ${id}`);
    console.log(
        `parameter 'id' (closure): ${defaultID()}`
    );
    console.log("reassigning 'id' to 5");
    id = 5;
    console.log(`local variable 'id': ${id}`);
    console.log(
        `parameter 'id' (closure): ${defaultID()}`
    );
}
whatsTheDealHere(3);
    // local variable 'id': 3 <--- Huh!? Weird!
    // parameter 'id' (closure): 3
    // reassigning 'id' to 5
    // local variable 'id': 5
    // parameter 'id' (closure): 3
```
we can notice how in the last console.log() we have a closure with the defaultID function respect the id value of the function

### Arrow Functions are alwas anonymous

Kyle Simpson doesnt recommend to use arrow functions or anonymous functions... but, i think they can be easier than named functions....

### Dont Throw out Var

Kyle Simpsons says that var is fine, but you should use carefully. But as me.. Kyle says that he uses more let than var xD so...

### constanly confused

**IMPORTANT** const arent reassigned but CAN BE MUTATED

EXAMPLE:

```
const studentIDs = [14, 73, 112];
// later
studentIDs.push(6); // whoa, wait... what!?

BUT....

const studentIDs = [1,2,3,4,5,6,7,8,9];

const studentIDs = [10,11]; ///ERROR 
```

### var and let 

So where should we still use var? Under what circumstances
is it a better choice than let?

For one, I always use var in the top-level scope of any function, regardless of whether that’s at the beginning, middle, or end of the function. I also use var in the global scope, though I try to minimize usage of the global scope.

my conclusions is: 
Use Var in global scope and the beginning of function scopes, and use lets in blocks {}

example:

```
function getStudents(data) {
    var studentRecords = [];
    for (let record of data.records) {
        let id = `student-${record.id}`;
        studentRecords.push({
            id,
            record.name
        });
    }
    return studentRecords;
}
```

### TDZ (time dead zone)

is the window time while a variable is declared and has no value...

### CALLBACK

i would say callback is a function passed as parameter to another function
