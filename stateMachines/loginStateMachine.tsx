import { createMachine } from 'xstate'

const loginMachine = createMachine({
  id: 'login',
  initial: 'initial',
  states: {
    initial: {
      on: {
        LOAD: 'loading'
      }
    },
    loading: {
      on: {
        SUCCESS: 'success',
        FAIL: 'failure'
      }
    },
    success: {},
    failure: {
      on: {
        START: 'initial',
        RETRY: 'loading'
      }
    }
  }
})

export default loginMachine
