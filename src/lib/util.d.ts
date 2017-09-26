export declare function nop(): void;
export declare class Resolver<T> {
    readonly promise: Promise<T>;
    private resolver;
    private rejecter;
    constructor();
    readonly resolve: (result?: T | PromiseLike<T> | undefined) => void;
    readonly reject: (reason: any) => void;
}
