import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Operation } from '@/interfaces';
import { sendGetRequest } from '@/utils/request';

const initialState: Operation = {
  id: 0,
  title: '',
  code: '',
  startDate: '',
  endDate: '',
  color: '',
  adminId: '',
  users: [],
};

type Action = { type: 'SET_OPERATION'; operation: Operation };

const reducer = (state: Operation, action: Action): Operation => {
  switch (action.type) {
    case 'SET_OPERATION':
      return action.operation;
    default:
      throw new Error('Unhandled action');
  }
};

const OperationStateContext = createContext<Operation | undefined>(undefined);
const OperationDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined,
);

interface MatchParameter {
  id: string;
}

const OperationContextProvider: React.FC = ({ children }) => {
  const [operation, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const match = useRouteMatch<MatchParameter>();
  const { id } = match.params;

  useEffect(() => {
    const fetch = async () => {
      const { result, error } = await sendGetRequest(`/operations/${id}`);
      if (error) return;
      dispatch({ type: 'SET_OPERATION', operation: result.operation });
    };
    fetch();
  }, []);

  return (
    <OperationDispatchContext.Provider value={dispatch}>
      <OperationStateContext.Provider value={operation}>
        {children}
      </OperationStateContext.Provider>
    </OperationDispatchContext.Provider>
  );
};

const useOperation = (): Operation => {
  const operation = useContext(OperationStateContext);
  if (!operation) throw new Error('OperationStateContext Provider not found');
  return operation;
};

const useOperationDispatch = (): Dispatch<Action> => {
  const dispatch = useContext(OperationDispatchContext);
  if (!dispatch) throw new Error('OperationDispatchContext Provider not found');
  return dispatch;
};

export { useOperation, useOperationDispatch, OperationContextProvider };
