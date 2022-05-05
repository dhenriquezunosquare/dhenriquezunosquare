# What is Js?

---

### Java -> focused principaly in catch the attention of java programmers

### Script -> was popular to refer lightweight programs

### Js is an implentation of ECMASCRIPT STANDARD

>Java is to JavaScript as ham is to hamster.

---

### TC39

TC39 Is a Commite for votes for changes and Choose where Js will go

---

### Environment of Js

You can learn *One JS* is the same in all browsers.

The developer console is not a JS Compiler, just an easy way to execute a few lines of code and see the result. But dont trust at all in the console.

---

### Paradigms-level

- Procedural -> use code top-down (c)
- ObjectOriented ->use classes (java)
- funcional -> uses functions (haskell)

Javascript is a multi-paradigm language.

---

### BackWard Forwards compatibility

Javascript has backwards compatibility ->Code made today will be valid tomorrow.

Javascript IS NOT forward-compatible ->  new features wont works in older js engine

---

### Jumping the gaps (Saltando la brecha)

knowing Js is not Forwards compatible we can think that we will have problems working with new features in old Js Engine.

**Traspiling is the Solucion**

traspiling is convert source code of a program from one form to another best examples (babeljs)

Question: Why Use new features instead old features than do the same?
Rta: latest version of Js keeps the code cleaner

### Filling the gast (llenando los huecos)

for Apis that doesnt work in older version , a good solution is pattern polyfull aka "shim" where u create your own code than work like the Api not supported

---

### Interpretation-Compilation

Js source code is parsed before it is executed

all compiler languages are parsed

Question: Is Javascript a parsed language ,but is it compiled?

Rta: The answer is closer to yes than no

the interpreted/complier between java an javascript are  similiars

The Flow behind scenes

1. after program leaves visual code get transpiled by babel , then packed in webpack an then arrive in a different form to Js engine
2. Js engine parses the code to AST ( abstract sintax tree)
3. the engine converts that AST to a kind of byte code, a binary intermadiate representation.
4. finally the Js Vm execute the program

---

### Strictly

Strict mode in Js is not the restriction on what you cant do, but rather as a guide to best way to do things

strict mode can be activated in a function

```
functionsomeOperations() {
    // whitespace and comments are fine here
    "use strict";
    // all this code will run in strict mode
}
```

but is better use it in the entire file/program

The Strict mode isnt activated by default in JavaScript because of backwards compatibility.

---

### Conclusion

JS is an implementation of the ECMAScript standard (versionES2019 as of this writing), which is guided by the TC39committee and hosted by ECMA. It runs in browsers andother JS environments such as Node.js.JS is a multi-paradigm language, meaning the syntax andcapabilities allow a developer to mix and match (and bendandreshape!)conceptsfromvariousmajorparadigms,suchasprocedural,object-oriented(OO/classes),andfunctional(FP).JS is a compiled language, meaning the tools (including the JSengine) process and verify a program (reporting any errors!)before it executes.With our language nowdefined, let’s start getting to know itsins and outs.
