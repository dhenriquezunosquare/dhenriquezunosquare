# React Testing Library 

- Not just a library, also a philosophy("subjetivo")

- test your sofware the way users actually use it

- internal implementation (not care how sofware is written)

## React Tesing Library vs Jest

1. React-Testing Library
    - Provides a Virtual DOM for test

2. Jest 
    - Find test
    - Run Test
    - Determinates whether the test passed or fail

### Assertion

causes the test to succeed or fail. Example:

```
 expect(linkElement).toBeInTheDocument();
```

### TDD (Test Driven Development)

- Write tests before writing code

- then write the code according to the tests 

### Types of tests for React tesgin library

- Unit tests-> test a unit componet
- Integration tests-> test how multiples component works together
- Functional tests -> test a particular funcion pf sofware (enter data in form and click submit)

### Linter
analizes static text and marks syntax that breaks rules