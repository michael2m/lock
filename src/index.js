"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const lock = require("./lib/lock");
const util = require("./lib/util");
__export(require("./lib/lock"));
const lck = new lock.Lock();
const workers = 200000;
const resolver = new util.Resolver();
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const release = yield lck.acquire();
        try {
            yield resolver.promise;
        }
        finally {
            release();
        }
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    console.log("...");
    for (let i = 0; i < workers; i++) {
        go();
    }
    const completer = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    completer.question("Press <ENTER> to complete", () => {
        resolver.resolve();
        completer.close();
        const collector = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        collector.question("Press <ENTER> to GC", () => {
            global.gc();
            collector.close();
            const ender = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            ender.question("Press <ENTER> to quit", () => {
                ender.close();
            });
        });
    });
}))();
//# sourceMappingURL=index.js.map