import * as util from "./util";

export class Lock {
    private tip: Promise<void>;

    constructor() {
        this.tip = Promise.resolve<void>(undefined);
    }

    public async acquire(): Promise<() => void> {
        const oldTip = this.tip;
        let resolver = util.nop;
        const promise = new Promise<void>(resolve => { resolver = resolve; });
        this.tip = oldTip.then(() => promise);
        return oldTip.then(() => resolver);
    }
}

// const lock = new Lock();
// const releaser = await lock.acquire();
// try {
//     ...
// } finally {
//    releaser();
// }
