import { createRequest, createResponse } from '../requests';
import { setCookie, Utils } from '../../src';

jest.mock('../../src/cookie/utils.ts');

describe('setCookie', () => {
  describe('Server Side', () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should set cookie on headers and response', () => {
      const request = createRequest();
      const response = createResponse();
      request.headers.cookie = ' ';

      setCookie('dance', 'panda', {}, request, response);

      expect(request.headers.cookie).toEqual('dance=panda;');
      expect(response.getHeader('Set-Cookie')).toEqual(['dance=panda; Path=/']);
    });
  });

  describe('Client Side', () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should set cookie on headers and response', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '',
      });

      setCookie('dance', 'panda');

      expect(document.cookie).toEqual('dance=panda; Path=/');
    });
  });
});
