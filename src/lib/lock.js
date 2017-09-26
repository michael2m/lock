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
const util = require("./util");
class Lock {
    constructor() {
        this.tip = Promise.resolve(undefined);
    }
    acquire() {
        return __awaiter(this, void 0, void 0, function* () {
            const oldTip = this.tip;
            let resolver = util.nop;
            const promise = new Promise(resolve => { resolver = resolve; });
            this.tip = oldTip.then(() => promise);
            return oldTip.then(() => resolver);
        });
    }
}
exports.Lock = Lock;
//# sourceMappingURL=lock.js.map