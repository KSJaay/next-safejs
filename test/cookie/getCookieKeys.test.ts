import { createRequest } from '../requests';
import { getCookieKeys, Utils } from '../../src';

jest.mock('../../src/cookie/utils.ts');

describe('getCookie', () => {
  describe('Server Side', () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return an empty array if no cookie header is present', () => {
      const request = createRequest();

      const result = getCookieKeys(request);

      expect(result).toEqual([]);
    });

    it('should return an array of cookie keys', () => {
      const request = createRequest();
      request.headers.cookie = 'test=panda;panda=test';

      const result = getCookieKeys(request);

      expect(result).toEqual(['test', 'panda']);
    });
  });

  describe('Client Side', () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return an empty array if no cookie header is present', () => {
      const result = getCookieKeys();

      expect(result).toEqual([]);
    });

    it('should return an array of cookie keys', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'test=panda; panda=test',
      });

      const result = getCookieKeys();

      expect(result).toEqual(['test', 'panda']);
    });
  });
});
