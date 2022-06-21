# MultithreadJs

Repository of examples of MultithreadJs

> <https://github.com/MultithreadedJSBook/code-samples>

## What Are Threads?

A thread is just like a process, except that it shares memory space with the process that it belongs to. A process can have many threads, and each one has its own instruction pointer.

## Concurrency Vs Parallelism

- Concurrency
  Tasks are run in overlapping time. (Las tareas se ejecutan en tiempo superpuesto.)
- Parallelism
  Tasks are run at exactly the same time.

![concurrency-parallelism](/conurrency-paralelism.png "Concurrency Parallelism")

## Single Threaded Javascript

Js is a single threaded language itself, callbacks for example not running in paralel. whn code in a callbacks is running , thaths the only code thats currently running.
Another example could be

```
import fs from 'fs/promises';

async function getNum(filename) {

    returnparseInt(awaitfs.readFile(filename, 'utf8'), 10);
}
try {
    const numberPromises = [1, 2, 3].map(i => getNum(`${i}.txt`));
    const numbers = awaitPromise.all(numberPromises);
    console.log(numbers[0] + numbers[1] + numbers[2]);
} catch (err) {
    console.error('Something went wrong:'); console.error(err);
}
```

promise.all() doesn’t mean that the code resolving them runs atthe same time, it just means their time frames areoverlapping.

## Browsers

Javascript has many different implementations chrome, firefox, safari. v8 engine is also used in NodeJs

## Dedicated worker

creating file main.js

```javascript
console.log("hello from main.js");
const worker = new Worker("worker.js");
worker.onmessage = (msg) => {
  console.log("message received from worker", msg.data);
};
worker.postMessage("message sent to worker");
console.log("hello from end of main.js");
```

create file worker.js and add

```javascript
console.log("hello from worker.js");
self.onmessage = (msg) => {
  console.log("message from main", msg.data);
  postMessage("message sent from worker");
};
```

an link example of webWorker.js
<https://www.youtube.com/watch?v=Gcp7triXFjg>

## Shared worker

shared worker allows you use 1 web worker with different htmls , this is not supported in safari.

## Service Worker

a service worker functions as a sort of proxy between web pages(browser) and the server.
The service workes are primarly intended for performing cache management of a website.

## More about Service Worker

Service workers are intended to only be used for performing asynchronous operations. Because of that, the localStorage API, which technically blocks when reading and writing, isnt available.

- parsed
  This is the very first state of the service worker. At this point the JavaScript content of the file has been parsed.This is more of an internal state that you’ll probablynever encounter in your application.installingThe.
- installation has begun but is not yet complete. This happens once per worker version. This state is active after on install is called and before theevent.respondWith() promise has resolved.
- installed
  At this point the installation is complete. Theonactivate handler is going to be called next. In mytesting I find that the service workers jump from
  installing to activating so fast that I never see the installed state.
- activating
  This state happens when onactivate is called but theevent.respondWith() promise hasn’t yet resolved.
- activated
  The activation is complete, and the worker is ready to doits thing. At this point fetch events will get intercepted.
- redundant
  At this point, a newer version of the script has beenloaded, and the previous script is no longer necessary.This can also be triggered if the worker script downloadfails, if it contains a syntax error, or if an error isthrown.

> if you’re only looking to add multithreading capabilities to your application, then choose one of the other web workers instead.

## The RPC Patter

The RPC (Remote Procedure Call) pattern is a way to take a representation of a function and its arguments, serialize them, and pass them to a remote destination to have them get executed.

an example of RPC is

```javascript

worker.postMessage('square_sum|num:4');
worker.postMessage('fibonacci|num:33');
worker.onmessage=(result)=>{
    // Which result belongs to which message?
    // '3524578'
    // 4.1462643
};

//worker.postMessage
{"jsonrpc":"2.0","method":"square_sum","params":[4],"id":1}{"jsonrpc":"2.0","method":"fibonacci","params":[33],"id":2}
//worker.onmessage
{"jsonrpc":"2.0","result":"3524578","id":2}
{"jsonrpc":"2.0","result":4.1462643,"id":1}


const commands =
{
    square_sum(max) {
        letsum = 0;
        for (leti = 0; i < max; i++)sum += Math.sqrt(i);
        return sum;
    },
    fibonacci(limit) {
        letprev = 1n, next = 0n, swap;
        while (limit) {
            swap = prev;
            prev = prev + next;
            next = swap;
            limit--;
        }
        returnString(next);
    }
};
function dispatch(method, args) {
    if (commands.hasOwnProperty(method)) {
        return commands[method](...args);
    }
    throw new TypeError(`Command ${method} not defined!`);
}

```

## NodeJS

We have an basic example in the folder (./NodeJs/index1.js) where whe can see how create 4 workers procceses and create a web server in a worker processes

```javascript
const http = require("http");
const cluster = require("cluster");
if (cluster.isPrimary) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  http
    .createServer((req, res) => {
      res.end("Hello, World!\n");
    })
    .listen(3000);
}
```

by other hand you can also create workers in NodeJS for example

```javascript
const { Worker } = require("worker_threads");
const worker = new Worker("/path/to/worker-file-name.js");
```

We have a new example of happycoin , now in NodeJS and using Workers threads

```javascript
const { Worker, isMainThread, parentPort } = require("worker_threads");

const THREAD_COUNT = 4;
if (isMainThread) {
  let inFlight = THREAD_COUNT;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker(__filename);
    worker.on("message", (msg) => {
      if (msg === "done") {
        if (--inFlight === 0) {
          process.stdout.write("\ncount " + count + "\n");
        }
      } else if (typeof msg === "bigint") {
        process.stdout.write(msg.toString() + " ");
        count++;
      }
    });
  }
} else {
  for (let i = 1; i < 10_000_000 / THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      parentPort.postMessage(randomNum);
    }
  }
  parentPort.postMessage("done");
}
```

## Worker with pool Piscina

Another worker is with the module 'piscina' from NodeJs , it works with a promise, so you can use .then()

> You have to install the packages(modules) of piscina, with the command `npm install piscina`

```javascript
const Piscina = require("piscina");
if (!Piscina.isWorkerThread) {
  const piscina = new Piscina({ filename: __filename });
  piscina.run(9).then((squareRootOfNine) => {
    console.log("The square root of nine is", squareRootOfNine);
  });
}
module.exports = (num) => Math.sqrt(num);
```

## Shared Memory

two powerful tools available to your JavaScript applications: the Atomics object and the SharedArrayBuffer class. These allow you to share memory between two threads without depending on message passing.

### Shared memory in the browser

```html
<html>
  <head>
    <title>Shared Memory Hello World</title>
    <script src="main.js"></script>
  </head>
</html>
```

and the main.js

```javascript
if (!crossOriginIsolated) {
  throw new Error("Cannot use SharedArrayBuffer");
}
const worker = new Worker("worker.js");
const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);
console.log("now", view[0]);
worker.postMessage(buffer);
setTimeout(() => {
  console.log("later", view[0]);
  console.log("prop", buffer.foo);
}, 500);
```

and worker.js file ...

```javascript
self.onmessage = ({ data: buffer }) => {
  buffer.foo = 42;
  const view = new Uint8Array(buffer);
  view[0] = 2;
  console.log("updated in worker");
};
```

### Shared Memory in NodeJs

in the NodeJs the previous example looks like this:

in the main_node.js

```javascript
const { Worker } = require("worker_threads");
const worker = new Worker(__dirname + "/worker-node.js");
const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);
console.log("now", view[0]);
worker.postMessage(buffer);
setTimeout(() => {
  console.log("later", view[0]);
  console.log("prop", buffer.foo);
  worker.unref();
}, 500);
```

in the worker-node.js add this:

```javascript
const { parentPort } = require("worker_threads");
parentPort.on("message", (buffer) => {
  buffer.foo = 42;
  const view = new Uint8Array(buffer);
  view[0] = 2;
  console.log("updated in worker");
});
```

## Atomic Methods for data manipulation

>Atomicity means that while the overall operation may be composed of multiple smaller steps, the overall operation is guaranteed to either entirely succeed or entirely fail. For example, a single query sent to a database is going to be atomic, but three separate queries aren’t atomic.

### Atomics.add()

This method adds the provided value to the existing value in a typedArray that is located
at index. The old value is returned.

```javascript
 const old = Atomics.add(typedArray, index, value);
```

.Atomics.add() is like the nonatomic code:

```javascript
const old = typedArray[index];
typedArray[index] = old + value;
return old;
```

### Atomics.and()

This method performs a bitwise and using value with the existing value in typedArray
located at index. The old value is returned.

```javascript
const old = Atomics.and(typedArray, index, value)
```

Atomics.and() is like the nonatomic code:

```javascript
const old = typedArray[index];
typedArray[index] = old & value;
return old;
```

### Atomics.compareExchange()

This method checks typedArray to see if the value oldExpectedValue is located at index. If it is, then the value is replaced with value. If not, then nothing happens. The old value is always returned, so you can tell if the exchange succeeded if oldExpectedValue ===old

```javascript
const old = Atomics.compareExchange(typedArray, index, oldExpectedValue, value)
```

is similar to do this:

```javascript
const old = typedArray[index];
if (old === oldExpectedValue) {
 typedArray[index] = value;
}
return old;
```

### Atomics.exchange()

This method sets the value in typedArray located at index to value. The old value is
returned.

```javascript
const old = Atomics.exchange(typedArray, index, value);
```

not atomic code:

```javascript
const old = typedArray[index];
typedArray[index] = value;
return old;
```

### Atomics.load()

This method returns the value in typedArray located at index

```javascript
const value = Atomics.load(typedArray, index)
```

Not atomic code:
```javascript
const old = typedArray[index];
return old;
```

anoothers atomics methods...

![AtomicsMethod](/atomicMethods.png "Atomics Methods")

## Advanced shared Memory

there are anothees atomics methods advanced like 

### Atomics.wait()

This method first checks typedArray to see if the value at index is equal to value. If it is not, the function returns the value not-equal. If the value is equal, it will then freeze the thread for up to timeout milliseconds. If nothing happens during that time, the function returns the value timed-out. On the other hand, if another thread calls Atomics.notify() for that same index within the time period, the function then returns with a value of ok.

```javascript
const status = Atomics.wait(typedArray, index, value, timeout =
Infinity)
```

### Atomics.notify()

The Atomics.notify() method attempts to awaken other threads that have called Atomics.wait() on the same typedArray and at the same index. If any other threads are currently frozen, then they will wake up

```javascript
const awaken = Atomics.notify(typedArray, index, count = Infinity)
```

## Multithreaded Patterns

The JavaScript APIs that expose multithreading are, on their own, really quite basic with the functionality they provide. As you saw in Chapter 4, the purpose of the SharedArrayBuffer is to store a raw, binary representation of data. Even Chapter 5 continued this pattern with the Atomics object, exposing rather primitive methods for coordinating or modifying a handful of bytes at a time.

### Thread Pool

 thread pool is a collection of homogeneous worker threads that are each capable of carrying out CPU-intensive tasks that the application may depend on.
 The first question when creating a thread pool is how many threads should be in the pool?

#### Pool Size

Typically, the size of a thread pool won’t need to dynamically change throughout the lifetime of an application. Usually there’s a reason the number of workers is chosen, and that reason doesn’t often change. That’s why you’ll work with a thread pool with a fixed size, dynamically chosen when the application launches.

```javascript
// browser
cores = navigator.hardwareConcurrency;
// Node.js
cores = require('os').cpus().length;
```

> Another thing to keep in mind is that if an application makes a thread pool with four workers, then the minimum number of threads that application is using is five because the main thread of the application also comes into play

#### Dispatch Strategies

A few strategies are often employed by applications to dispatch tasks to workers in a worker pool. These strategies draw parallels to those used by reverse proxies for the purpose of sending requests to backend services. Here’s a list of the most common strategies:

- RoundRobin: Each task is given to the next worker in the pool, wrapping around to the beginning once the end has been hit. So, with a pool size of three, the first task goes to Worker 1, then Worker 2, then Worker 3, then back to Worker 1, and so on.

- Random: Each task is assigned to a random worker in the pool. Although this is the simplest to build, being entirely stateless, it can also mean that some of the workers are sometimes given too much work to perform, and others will sometimes be given too little work to perform.

- Least Busy(difficult): A count of the number of tasks being performed by each worker is maintained, and when a new task comes along it is given to the least busy worker

### Actor Model

The actor model is a programming pattern for performing concurrent computation. With this model an actor is a primitive container that
allows for executing code. An actor is capable of running logic, creating more actors, sending messages to other actors, and receiving messages.

> One draw of the actor model is that actors don’t need to be limited to a single machine. This means that processes can run on more than one machine and communicate over the network. We can implement this using Node.js processes, each communicating using JSON via the TCP protocol.

## Web Assembly

Web Assembly(WASM) is a binary-encoded instruction format that runs on a stackbased virtual machine. It’s designed with security in mind and runs in a sandbox where the only things it has access to are memory and functions provided by the host environment.

Since long before WebAssembly, Emscripten has been the go-to way to compile C and C++ programs for use in JavaScript environments. Today, it supports multithreaded C and C++ code using web workers in browsers and worker_threads in Node.js.

>this topic was a little difficult to me.

## Analysis

By and large the main reason to add workers to an application is to increase performance. But this trade-off comes with a cost of added complexity. The KISS principle, meaning “Keep It Simple, Stupid,” suggests that your applications should be so stupidly simple that anyone can quickly look at the code and get an understanding of it. Being able to read code after it has been written is of paramount importance and simply adding threads to a program without purpose is an absolute violation of KISS.

### When not to use Threading

- Low Memory Constraints: if you dont have enough memory ... DO NOT use threads

- Low Core Count: Your application will run slower in situations where it has
fewer cores. This is especially true if the machine has a single
core, and it can also be true if it has two cores.

### When to us Threading

- Heavy math:Another characteristic of problems that are a good fit for threads are those that involve a heavy use of math, aka CPU-intensive work.

- Embarrassingly parallel: his is a class of problems where a large task can be
broken down into smaller tasks and very little or no sharing of state is required

- MapReduce-friendly problems: MapReduce-friendly problems MapReduce is a programming model that is inspired by functional programming. This model is often used for largescale data processing that has been spread across many different machines.

- Graphics processing: A lot of graphics processing tasks also benefit from multiple threads. Much like the Game of Life problem, which operates on a grid of cells, images are represented as a grid of pixels. In both cases the value at each coordinate can be represented as a number, though Game of Life uses a single 1-bit number while images are more likely to use 3 or 4 bytes (red, green, blue, and optional alpha transparency).

### Summary of Caveats(advertencias)

- Complexity:Applications tend to be more complex when using shared memory. This is especially true if you are hand-writing calls with Atomics and manually working with SharedBufferArray instances.

- Memory overhead: There is additional memory overhead with each thread that is added to a program. This memory overhead is compounded if a lot of modules are being loaded in each thread.

- No DOM access: Only the main thread of a browser-based application has access to the DOM. This can make it difficult to offload UI rendering tasks to another thread.

- No shared objects: The inability to share objects between threads can make it difficult to easily convert a single-threaded application to a multithreaded one. Instead, when it comes to mutating objects, you’ll need to pass messages around that end up mutating an object that lives in a single location.
