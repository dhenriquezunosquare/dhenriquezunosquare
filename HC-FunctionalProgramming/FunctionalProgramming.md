# Functional Programming

its programing with functions xD

La programación funcional es un paradigma de programación o un estilo de programación que se basa en gran medida en el uso de funciones puras y aisladas.

Tal como puede haber adivinado por el nombre, el uso de funciones es el componente principal de la programación funcional.

## pure Function is 

single valued collection of pairs (colección de pares de valor único)

### Knowing if we are writing a pure function or no....

1. Total-> always has an output 
2. Deterministic-> should have the same output for the same input
3. No Observable Side-Effects -> not affect any other block of code 

### curryng

In other terms, currying is when a function — instead of taking all arguments at one time — takes the first one and returns a new function, which takes the second one and returns a new function, which takes the third one, etc. until all arguments are completed.

### Composition

Function composition is an approach where the result of one function is passed on to the next function, which is passed to another until the final function is executed for the final result. Function compositions can be composed of any number of functions.

### Functors

 In other words, is any object we can map and apply a function generating another object instance of the same type and connections


 ### Tasks

  Task monad is the functional equivalent of promise. Similarly to promise, Task takes resolve and reject functions, but in reversed order. A Task monad only starts running once it reaches the fork method, and this way avoids race conditions.