

export function useDebounce () {
  
    function createDebounce() {
        let timeout: NodeJS.Timeout;
        return function (fnc: Function, delayMs?: number) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            fnc();
          }, delayMs || 500);
        };
      }
  
  return {
    debounce: createDebounce()
  }
}
