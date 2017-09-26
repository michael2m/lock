"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nop() { }
exports.nop = nop;
class Resolver {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolver = resolve;
            this.rejecter = reject;
        });
    }
    get resolve() { return this.resolver; }
    get reject() { return this.rejecter; }
}
exports.Resolver = Resolver;
//# sourceMappingURL=util.js.map