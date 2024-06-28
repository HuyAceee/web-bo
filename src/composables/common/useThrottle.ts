export function useThrottle<T>() {
  function createThrottle(fnc: (arg?: T) => void, delay = 500) {
    let timeoutId: any
    let lastExecutedTime = 0

    return function (arg: T) {
      const currentTime = Date.now()
      const execute = () => {
        lastExecutedTime = currentTime
        fnc(arg)
      }

      if (currentTime - lastExecutedTime > delay) {
        execute()
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(execute, delay)
      }
    }
  }

  return {
    throttle: createThrottle
  }
}
