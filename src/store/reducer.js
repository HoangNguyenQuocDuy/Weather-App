import { SEARCH_CITY, INPUT_VALUE } from "./constants";

const initState = {
  searchValue: '',
  value: {},
  label: {},
};

let city 

function reducer(state, action) {
  switch (action.type) {
    case SEARCH_CITY:
        city = {
            value: action.payload.value,
            label: action.payload.label
        }
        return {
            value: action.payload.value,
            label: action.payload.label
        }
    case INPUT_VALUE: 
        return {
          searchValue: action.payload
        }
    
    default: throw new Error('Invalid data!')
  }
}


export { initState, city };
export default reducer;
