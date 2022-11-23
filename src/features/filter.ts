import { FilterTypes } from '../types/Filter';

type SetFilterAction = {
  type: 'filterTodo/SETFILTER',
  payload: FilterTypes,
};

type SetQueryAction = {
  type: 'filterTodo/SETQUERY',
  payload: string,
};

const setFilter = (filterBy: FilterTypes): SetFilterAction => ({
  type: 'filterTodo/SETFILTER',
  payload: filterBy,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filterTodo/SETQUERY',
  payload: query,
});

export const actions = { setFilter, setQuery };

type State = {
  query: string,
  filterBy: FilterTypes,
};

type Action = SetFilterAction
| SetQueryAction;

const defaultState: State = {
  query: '',
  filterBy: 'all',
};

const filterReducer = (
  state: State = defaultState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filterTodo/SETFILTER':
      return { ...state, filterBy: action.payload };
      break;
    case 'filterTodo/SETQUERY':
      return { ...state, query: action.payload };
      break;
    default:
      return state;
  }
};

export default filterReducer;
