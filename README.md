# Lock
Asynchronous, promise-based locking in TypeScript and JavaScript (ES2016).

```ts
let shared = 0;

function do() {
    const temp = shared;
    return new Promise<void>(
        resolve => setImmediate(
            () => {
                shared = temp + 1;
                resolve();
            }
        )
    );
}

(async function run() {
    const workers = new Array<Promise<void>>();
    for (let n = 0; n < 32; n++) {
        workers.push(do());
    }

    await Promise.all(workers);

    // what is the value of "shared"?
    console.log(shared);
})();
```

Fixing code with race condition:
```ts
const lock = new Lock();

async function do() {
    const release = await lock.acquire();
    const temp = shared;
    return new Promise<void>(
        resolve => setImmediate(
            () => {
                shared = temp + 1;
                release();
                resolve();
            }
        )
    );
}
```

General pattern for using lock:
```ts
const lock = new Lock();
...
const release = await lock.acquire();
try {
    ...
} finally {
    release();
}
```
