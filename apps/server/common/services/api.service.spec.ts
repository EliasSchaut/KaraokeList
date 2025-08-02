import { ApiService } from '@/common/services/api.service';
import { DangerException } from '@/common/exceptions/danger.exception';
import { I18nContext } from 'nestjs-i18n';

describe('ApiService', () => {
  let fetchMock: jest.SpyInstance;
  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch');
    jest.spyOn(I18nContext, 'current').mockReturnValue({
      t: jest.fn().mockReturnValue('test'),
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls the API and returns the response JSON', async () => {
    const mockResponse = { data: 'test' };
    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    } as any);

    const result = await ApiService.call_api('http://example.com');
    expect(result).toEqual(mockResponse);
  });

  it('throws a DangerException on fetch error', async () => {
    fetchMock.mockRejectedValue(new Error('Fetch error'));

    await expect(ApiService.call_api('http://example.com')).rejects.toThrow(
      DangerException,
    );
  });

  it('throws a DangerException on timeout', async () => {
    const timeout_in_ms = 10;
    jest.useFakeTimers();
    fetchMock.mockImplementation(() => new Promise(() => {}));

    const callApiPromise = ApiService.call_api('http://example.com', {
      timeout_in_ms: timeout_in_ms,
    });
    jest.advanceTimersByTime(timeout_in_ms);

    await expect(callApiPromise).rejects.toThrow(DangerException);
    jest.useRealTimers();
  });
});
