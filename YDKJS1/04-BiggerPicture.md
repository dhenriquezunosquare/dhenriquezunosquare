
### 3 Pillars of Js Organization   

1. Scope and Closure

- JS is lexically scoped

- hoisting: variable declared anywhere in a scope are treated as if they are declared at the beginning of the scope

- var-declared variables are function scoped, even if they appear inside a block.

2. Prototypes

 behavior delegation : dont uses clases and let objects cooperate through the prototype chain

3. Types and coercion

this pillar is more important than the other two,
in the sense that no JS program will do anything useful if
it doesn’t properly leverage JS’s value types, as well as the
conversion (coercion) of values between types.