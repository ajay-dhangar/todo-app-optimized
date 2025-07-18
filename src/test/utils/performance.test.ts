import { debounce, throttle } from '../../utils/performance';

describe('Performance Utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('debounce delays function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    expect(mockFn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(100);
    
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('throttle limits function execution', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);
    
    throttledFn();
    throttledFn();
    throttledFn();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    vi.advanceTimersByTime(100);
    
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});