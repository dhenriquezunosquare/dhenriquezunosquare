## Lexical scope
One metaphor I’ve found effective in understanding scope is
sorting colored marbles into buckets of their matching color.

you already know the green bucket is where to go to get it and so on...

![Scope Imagee](../scope.png)

this image can show u how scope work.

another metaphor can be:

A conversation among friends

---

### Nested scope

The function scope for getStudentName(..) is nested inside
the global scope. The block scope of the for-loop is similarly
nested inside that function scope.

is basically a scope inside another scope.


If the engine doesn't resolve variable in any scope... return error

if the variable is a source, an unresolved identifier lookup
is considered an undeclared (unknown, missing) variable,
which always results in a ReferenceError being thrown.

if the variable is a target, and the code at that moment is
running in strict-mode, the variable is considered undeclared
and similarly throws a ReferenceError.