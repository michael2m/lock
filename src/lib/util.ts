// tslint:disable-next-line:no-empty
export function nop() { }

export class Resolver<T> {
    public readonly promise: Promise<T>;

    private resolver: (result?: T | PromiseLike<T>) => void;
    private rejecter: (reason: any | PromiseLike<any>) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolver = resolve;
            this.rejecter = reject;
        });
    }

    get resolve() { return this.resolver; }
    get reject() { return this.rejecter; }
}
