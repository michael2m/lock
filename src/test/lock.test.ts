import * as assert from "assert";

import * as lock from "../lib/lock";

describe("lock", () => {
    it("supports non-concurrent acquire-release", async () => {
        const lck = new lock.Lock();

        const release = await lck.acquire();
        release();
    });

    it("supports concurrent acquire-release", async () => {
        const lck = new lock.Lock();
        const workers = 128;
        let shared = 0;

        async function go() {
            const release = await lck.acquire();
            const temp = shared;

            await new Promise<void>(resolve => setImmediate(() => {
                shared = temp + 1;
                resolve();
            }));

            release();
        }

        const parallelism = new Array<Promise<void>>();
        for (let n = 0; n < workers; n++) {
            parallelism.push(go());
        }

        await Promise.all(parallelism);

        // tslint:disable-next-line:no-console
        assert.strictEqual(shared, workers);
    });
});
