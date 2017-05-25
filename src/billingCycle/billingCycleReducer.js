const INITIAL_STATE = { list: [], nameFilter: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BILLING_CYCLE_FETCHED':
            return { ...state, nameFilter: state.nameFilter, list: action.payload.data }
        case 'BILLING_CYCLE_NAME_FILTER':
            return { ...state, nameFilter: action.payload, list: state.list }            
        default:
            return state
    }
}