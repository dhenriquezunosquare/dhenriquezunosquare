# Scope Expusure

 When variables used by one part of the program are exposed to another part of the program, via scope, there are three main problems that can appear

 1. Naming Collisions: obviously two different parts of the program like 2 functions with the same name gonna thrown an error or the same "i" for all the loops 

 2. Unexpected Behavior: For example, if your part of the program assumes an array contains all numbers, but someone else’s code accesses and modifies the array to include booleans andstrings, your code may then misbehave in unexpected ways.

 3. Unintended Dependency: For example, if your code relies on an array of numbers, and you later decide it’s better to use some other data structure instead of an array, you now must take on the liability of adjusting other affected parts of the software.

 ### Invoking Function expression inmediatly
alllow call a function inmediatly was declared (LIKE ANGULARJS controller you have used in saludsystem)
```
// outer scope

(function(){
    // inner hidden scope
})();

// more outer scope
```

### Var - Let

theorically var and parameters are function-scoped, and let/const signal block-scoped declarations. (prefiero quitar var de la ecuacion);

### Funcion Declaration in blocks

We typically think of function declarations like they’re the
equivalent of a var declaration. So are they function-scoped
like var is?
No and yes. I know… that’s confusing.

```
if (false) {
    function ask() {
        console.log("Does this run?");
    }
}
ask();
```
What do you expect for this program to do? Three reasonable
outcomes:
1. The ask() call might fail with a ReferenceError exception, because the ask identifier is block-scoped to the
if block scope and thus isn’t available in the outer/-
global scope.
2. The ask() call might fail with a TypeError exception,
because the ask identifier exists, but it’s undefined
(since the if statement doesn’t run) and thus not a
callable function.
3. The ask() call might run correctly, printing out the
“Does it run?” message.

depending on which Js environment you try the asnwe can be 1 or 2.


One of the most common use cases for placing a function
declaration in a block is to conditionally define a function one
way or another (like with an if..else statement) depending
on some environment state. For example:

```
if (typeof Array.isArray != "undefined") {
    function isArray(a) {
        return Array.isArray(a);
    }
}
else {
    function isArray(a) {
        return Object.prototype.toString.call(a) == "[object Array]";
    }
}
```

(personnally i prefer work with the function in other ways xD)

### Blocked Over

The point of lexical scoping rules in a programming language
is so we can appropriately organize our program’s variables,
both for operational as well as semantic code communication
purposes.
And one of the most important organizational techniques is to
ensure that no variable is over-exposed to unnecessary scopes
(POLE).
