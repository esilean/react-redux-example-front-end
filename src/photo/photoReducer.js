const INITIAL_STATE = { images: [], selectedItem: 0 }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FETCHED_IMAGES':
            return { ...state, images: action.payload.data }
        case 'SELECT_IMAGE':
            return { ...state, selectedItem: action.payload }
        default:
            return state
    }
}