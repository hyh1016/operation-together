import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Operation, User } from '@/interfaces';
import { sendGetRequest } from '@/utils/request';

const initialState: User = {
  id: '',
  nickname: '',
  password: '',
  operations: [],
};

type Action =
  | { type: 'SET_USER'; user: User }
  | { type: 'SET_NICKNAME'; nickname: string }
  | { type: 'ADD_OPERATION'; operation: Operation }
  | { type: 'UPDATE_OPERATION'; operation: Operation }
  | { type: 'DELETE_OPERATION'; operationId: number };

const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.nickname,
      };
    case 'ADD_OPERATION':
      return {
        ...state,
        operations: state.operations?.concat(action.operation),
      };
    case 'UPDATE_OPERATION':
      return {
        ...state,
        operations: state.operations?.map((operation) => {
          if (operation.id === action.operation.id) return action.operation;
          return operation;
        }),
      };
    case 'DELETE_OPERATION':
      return {
        ...state,
        operations: state.operations?.filter(
          (operation) => operation.id !== action.operationId,
        ),
      };
    default:
      throw new Error('Unhandled action');
  }
};

const UserStateContext = createContext<User | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined,
);

const UserContextProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) history.replace('/login');
    const fetch = async () => {
      const { result, error } = await sendGetRequest('/users/me');
      if (error) return;
      dispatch({ type: 'SET_USER', user: result.me });
    };
    fetch();
  }, []);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={user}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

const useUser = (): User => {
  const user = useContext(UserStateContext);
  if (!user) throw new Error('UserStateContext Provider not found');
  return user;
};

const useUserDispatch = (): Dispatch<Action> => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('UserDispatchContext Provider not found');
  return dispatch;
};

export { useUser, useUserDispatch, UserContextProvider };
