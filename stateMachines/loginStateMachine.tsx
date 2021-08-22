import { assign, createMachine } from 'xstate'


const loginMachine = createMachine(
  {
    id: 'login',
    initial: 'initial',
    context: {
      message: ''
    },
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
  }
)

export default loginMachine
