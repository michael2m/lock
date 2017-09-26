export declare class Lock {
    private tip;
    constructor();
    acquire(): Promise<() => void>;
}
