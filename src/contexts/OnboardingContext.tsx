"use client";
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import type { UserAnswers } from '@/lib/types';
import { onboardingQuestions } from '@/lib/data/questions';

type State = {
  currentStep: number;
  answers: UserAnswers;
};

type Action = 
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_ANSWER', payload: { key: keyof UserAnswers, value: any } };

const initialState: State = {
  currentStep: 0,
  answers: {},
};

function onboardingReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, onboardingQuestions.length),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
}

type OnboardingContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
