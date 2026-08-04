import { fetchUser } from './apiClient';
import { User } from './types.js';
describe('Api client', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('Should return a correctly typed object', async () => {
    const mockUser: User = { id: 100, name: 'amal' };
    global.fetch = jest.fn().mockImplementationOnce((args) => {
      return {
        ok: true,
        json: async () => mockUser,
      };
    });
    const res = await fetchUser(200);
    expect(res).toEqual(mockUser);
  });
  test('Should throw error when response is not ok', async () => {
    const mockUser: User = { id: 100, name: 'amal' };
    global.fetch = jest.fn().mockImplementationOnce((args) => {
      return {
        ok: false,
        json: async () => mockUser,
      };
    });
    await expect(fetchUser(100)).rejects.toThrow();
  });
});
