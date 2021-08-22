/**
 * @jest-environment jsdom
 */

import loginMachine from '../../stateMachines/loginStateMachine'


//mock router
jest.mock('next/router', () => ({ push: jest.fn() }))
// mock react
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe("Index", () => {
  test('should go to "loading" state from "initial" state when the "LOAD" event occurs', () => {
    const expectedValue = 'loading'; // the expected state value
  
    const actualState = loginMachine.transition('initial', { type: 'LOAD' });
  
    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  
  test('should go to "success" state from "loading" state when the "SUCCESS" event occurs', () => {
    const expectedValue = 'success'; // the expected state value
  
    const actualState = loginMachine.transition('loading', { type: 'SUCCESS' });
  
    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  
  test('should go to "failure" state from "loading" state when the "FAIL" event occurs', () => {
    const expectedValue = 'failure'; // the expected state value
  
    const actualState = loginMachine.transition('loading', { type: 'FAIL' });
  
    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  
  test('should go to "initial" state from "failure" state when the "START" event occurs', () => {
    const expectedValue = 'initial'; // the expected state value
  
    const actualState = loginMachine.transition('failure', { type: 'START' });
  
    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  
  test('should go to "loading" state from "failure" state when the "RETRY" event occurs', () => {
    const expectedValue = 'loading'; // the expected state value
  
    const actualState = loginMachine.transition('failure', { type: 'RETRY' });
  
    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
});
