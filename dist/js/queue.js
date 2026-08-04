export class Queue {
    queue;
    constructor() {
        this.queue = [];
    }
    enqueue(arg) {
        this.queue.push(arg);
    }
    dequeue() {
        if (this.isEmpty())
            throw new Error('Queue is empty');
        return this.queue.shift();
    }
    peek() {
        if (this.isEmpty())
            throw new Error('Queue is empty');
        return this.queue[0];
    }
    isEmpty() {
        return this.queue.length === 0;
    }
}
