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