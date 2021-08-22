import { getPage } from 'next-page-tester';
import { screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import loginMachine from '../../stateMachines/loginStateMachine'
import { supabase } from '../../utils/superbase'
import { interpret } from 'xstate';



//mock router
jest.mock('next/router', () => ({ push: jest.fn() }))

// mock react
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe("Index", () => {
  test('should render without crashing', async () => {
    const { render } = await getPage({ route: '/' });
    render();
    // expect(render).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  })

  test('should login successfully', async () => {      
    const { render } = await getPage({ route: '/' });
    render();
  
    // mock user session
    const email = 'andy.poke94@gmail.com'  

    const input = screen.getByPlaceholderText('Email')
    fireEvent.change(input, { target: { value: email } })
    fireEvent.click(screen.getByTestId('loginButton'))
    await screen.findByTestId('loadingIcon')

    interpret(loginMachine).onTransition(async(state) => {
      expect(state.matches('succes')).toBeTruthy()
    
      await waitForElementToBeRemoved(() => screen.getByTestId('loadingIcon'))
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });
});
