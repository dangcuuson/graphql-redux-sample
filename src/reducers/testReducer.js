var initialState = {}
export const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REFERENCE_ID':
            return Object.assign({}, state, {reference_id: action.reference_id});
        default:
            return state;
    }
}