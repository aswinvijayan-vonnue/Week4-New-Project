import { Queue } from './queue';
import { User } from './types.js';
describe('Testing queue class', () => {
  const num = new Queue<number>();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const pushSpy = jest.spyOn(num.queue, 'push');
  test('Testing queue with elements are numbers', () => {
    num.enqueue(10);
    expect(pushSpy).toHaveBeenCalledWith(10);
  });
  test('Testing deque when queue is not empty', () => {
    expect(num.dequeue()).toBe(10);
  });
  test('Testing dequeue when queue is empty ', () => {
    expect(() => num.dequeue()).toThrow();
  });
  test('Testing peek element when queue is empty and not', () => {
    expect(() => num.peek()).toThrow();
    num.enqueue(20);
    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith(20);
    expect(num.peek()).toBe(20);
  });
});
describe('String and object queue testing', () => {
  test('Testing string queue', () => {
    const str = new Queue<string>();
    const strPushSpy = jest.spyOn(str.queue, 'push');
    str.enqueue('Hello');
    expect(strPushSpy).toHaveBeenCalledTimes(1);
    expect(strPushSpy).toHaveBeenCalledWith('Hello');
    expect(str.dequeue()).toBe('Hello');
    expect(() => str.dequeue()).toThrow();
  });
  test('Testing Object queue', () => {
    // type User = {
    //   id: number;
    //   name: string;
    // };
    const user1: User = { id: 100, name: 'amal' };
    const userObj = new Queue<User>();
    const userPushSpy = jest.spyOn(userObj.queue, 'push');
    userObj.enqueue(user1);
    expect(userPushSpy).toHaveBeenCalledTimes(1);
    expect(userPushSpy).toHaveBeenCalledWith(user1);
    expect(userObj.dequeue()).toEqual(user1);
    expect(() => userObj.dequeue()).toThrow();
  });
});
