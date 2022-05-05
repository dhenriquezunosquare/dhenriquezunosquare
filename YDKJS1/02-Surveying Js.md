
### Each File is a program

In Js eacht StandAlone file is its own separate program

we can noticed that when we have an application with 5 Js files and one of them has an error, could be the another 4 works correctly and the aplication works partially.

the only way multiples js files act as a single program is sharing their states (global scope)

---

### Values

its comes in 2 forms

- primitive ->boolean,number,strings,null,undefined,symbol
- object ->{}   []

how work with strings and templates strings(interpolation)

```
console.log("My name is ${ firstName }.");
// My name is ${ firstName }.
console.log('My name is ${ firstName }.');
// My name is ${ firstName }.
console.log(`My name is${firstName}.`);
// My name is Kyle.
```

how work with objects

```
name={
first:"Kyle",
last:"Simpson",
age:39,
specialties:["JS","Table Tennis"]
};
console.log(`My name is ${name.first}.`);
///my name is Kyle
```

---

### Value type determination

type of methods return if value is primitive or object

```
typeof (variable) 
```

**Null validation return object take care about it**

---

 **Coercion**
 : Converting from one value type to another, such as fromstring to number, is referred to in JS as “coercion”

---

### Declaring and using variables

var : declares variable to be used in that part of the program can be initialized or not;

let : declare variable to be used in that part of the program can be initialized or not **has "block scoping" (just exist in the closest scope)**

const: declare variable to be used in that part of the program can be initialized or not **has "block scoping" (just exist in the closest scope) AND CANNOT BE RE-ASSIGNED**

```
var adult=true;
if(adult) {
    var name = "Kyle";
    let age = 39;
    console.log("Shhh, this is a secret!");
}
    console.log(name);
    // Kyle
    console.log(age);
    // Error!

```

**IMPORTANT CONST VARIABLES CANNOT RE-ASSINGED BUT CAN CHANGE HIS VALUES (MUTATION)**

```
const actors = [
"Morgan Freeman", "Jennifer Aniston"
];
actors[2] = "Tom Cruise"; // OK :(
actors = []; // Error!
```

### FUNCTIONS

is a collection of statements that can be invoked one or more times and can or not return something

there are different ways to create an function

1. function declaration

```
function awesomeFunction(coolThings) {
// ..
return amazingStuff;
}
```

2. function declaration expression

```
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function(coolThings) {
// ..
return amazingStuff;
};
```

declaring function as variables helps to support the functional programming pattern

### COMPARISOSN

1. Equal…ish

famous "====" triple igual

```
3 === 3.0;  // true
"yes" === "yes";    // true
null === null;  // true
false === false;    // true
42 === "42";    // false
"hello" === "Hello";     // false
true === 1;     // false
0 === null;     // false
"" === null;    // false
null === undefined; // false
```

But "triple igual" has a little bit "bug" for example

```
NaN === NaN; // false
0 === -0; // true
```

in that cases you should use
Object.is(..) as the “quadruple-equals” .

**With objects values is worse**

```
[ 1, 2, 3 ] === [ 1, 2, 3 ]; // false
{ a: 42 } === { a: 42 } // false
(x => x * 2) === (x => x * 2) // false
```

2. Coercive comparisions

the difference of  "==" doble iguls vs triple igual is that == allow you coercion before the comparison so we can have these results

```
42 == "42"; // true
```

---

### How we Organize in Js

usually we use Classes and modules

1. Clases:
abstraction of a thing withs his properties and behaviors.
to use a class , the class must have be instantiated
ejemplo

```
    class Page {
    constructor(text) {
        this.text = text;
        }
        print() {
        console.log(this.text);
        }
    }
    class Notebook {
        constructor() {
        this.pages = [];
        }
        addPage(text) {
        var page = new Page(text);
        this.pages.push(page);
        }
        print() {
        for (let page of this.pages) {
        page.print();
        }
        }
    }

    var mathNotes = new Notebook();
    mathNotes.addPage("Arithmetic: + - * / ...");
    mathNotes.addPage("Trigonometry: sin cos tan ...");
    mathNotes.print();
// ..
```

**by other hand we have the inheritance**
having these class

```
class Publication {
    constructor(title,author,pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
    }
    print() {
    console.log(`
    Title: ${ this.title }
    By: ${ this.author }
    ${ this.pubDate }
    `);
    }
}
```

Publication class works for any kind of publication. If i need a specific publication class i ll do something like this...

```
class Book extends Publication {
    constructor(bookDetails) {
        super(
            bookDetails.title,
            bookDetails.author,
            bookDetails.publishedOn
        );
        this.publisher = bookDetails.publisher;
        this.ISBN = bookDetails.ISBN;
    }
    print() {
        super.print();
        console.log(`
        You Don’t Know JS Yet: Get Started
        Chapter 2: Surveying JS 68
        Publisher: ${ this.publisher }
        ISBN: ${ this.ISBN }
        `);
    }
}
class BlogPost extends Publication {
    constructor(title,author,pubDate,URL) {
        super(title,author,pubDate);
        this.URL = URL;
    }
    print() {
        super.print();
        console.log(this.URL);
    }
}
```

and you use it in that way

```
var YDKJS = new Book({
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    publishedOn: "June 2014",
    publisher: "O'Reilly",
    ISBN: "123456-789"
});
YDKJS.print();

// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789

var forAgainstLet = new BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();

    // Title: For and against let
    // By: Kyle Simpson
    // October 27, 2014
    // https://davidwalsh.name/for-and-against-let
```

Inheritance is a powerful tool for organizing data/behavior in
separate logical units (classes)

2. Modules
the module pattern has the same goal than the class pattern, grouping data and behaviors of "thing".
But the sintax is different

for example:

```
function Publication(title,author,pubDate) {
var publicAPI = {
    print() {
        console.log(`
        Title: ${ title }
        By: ${ author }
        ${ pubDate }
        `);
    }
    };
    return publicAPI;
}
function Book(bookDetails) {
    var pub = Publication(
        bookDetails.title,
        bookDetails.author,
        bookDetails.publishedOn
    );
    var publicAPI = {
        print() {
            pub.print();
            console.log(`
            Publisher: ${ bookDetails.publisher }
            ISBN: ${ bookDetails.ISBN }
        `);
        }
    };
    return publicAPI;
}
function BlogPost(title,author,pubDate,URL) {
    var pub = Publication(title,author,pubDate);
    var publicAPI = {
        print() {
            pub.print();
            console.log(URL);
        }
    };
    return publicAPI;
}
```

and the way you implement modules factories is something like this.

```
var YDKJS = Book({
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    publishedOn: "June 2014",
    publisher: "O'Reilly",
    ISBN: "123456-789"
});
YDKJS.print();
    // Title: You Don't Know JS
    // By: Kyle Simpson
    // June 2014
    // Publisher: O'Reilly
    // ISBN: 123456-789
var forAgainstLet = BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
    // Title: For and against let
    // By: Kyle Simpson
    // October 27, 2014
    // https://davidwalsh.name/for-and-against-let


```

The only observable difference here is the lack of using new,
calling the module factories as normal functions.

3. ES Modules

it works like a singleton pattern .

you can use it with the famous "import" "export"

having pub.js file
```
function printDetails(title,author,pubDate) {
    console.log(`
        Title: ${ title }
        By: ${ author }
        ${ pubDate }
    `);
}
export function create(title,author,pubDate) {
    var publicAPI = {
        print() {
            printDetails(title,author,pubDate);
        }
    };
    return publicAPI;
}
```

and having blog.js file you can import pub.js

```
import { create as createPub } from "pub.js";
function printDetails(pub,URL) {
pub.print();
console.log(URL);
}
export function create(title,author,pubDate,URL) {
    var pub = createPub(title,author,pubDate);
    var publicAPI = {
        print() {
            printDetails(pub,URL);
        }
    };
    return publicAPI;
}
```

and the implementation looks like this

```
import { create as newBlogPost } from "blogpost.js";
var forAgainstLet = newBlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);
```