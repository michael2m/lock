"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const lock = require("../lib/lock");
describe("lock", () => {
    it("supports non-concurrent acquire-release", () => __awaiter(this, void 0, void 0, function* () {
        const lck = new lock.Lock();
        const release = yield lck.acquire();
        release();
    }));
    it("supports concurrent acquire-release", () => __awaiter(this, void 0, void 0, function* () {
        const lck = new lock.Lock();
        const workers = 128;
        let shared = 0;
        function go() {
            return __awaiter(this, void 0, void 0, function* () {
                const release = yield lck.acquire();
                const temp = shared;
                yield new Promise(resolve => setImmediate(() => {
                    shared = temp + 1;
                    resolve();
                }));
                release();
            });
        }
        const parallelism = new Array();
        for (let n = 0; n < workers; n++) {
            parallelism.push(go());
        }
        yield Promise.all(parallelism);
        assert.strictEqual(shared, workers);
    }));
});
//# sourceMappingURL=lock.test.js.map