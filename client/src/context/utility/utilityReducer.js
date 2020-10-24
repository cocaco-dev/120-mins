import {
    UPDATE_SIZE,
    UPDATE_YPOS,
    CHANGE_BLOCK_SCROLL
} from '../../types'; 

export default (state, action) => {
    switch(action.type){
        case UPDATE_SIZE:
            return {
                ...state,
                width: action.payload.width,
                height: action.payload.height
            }
        case UPDATE_YPOS:
            return {
                ...state,
                yOffset: action.payload
                
            }
        case CHANGE_BLOCK_SCROLL:
            return {
                ...state,
                blockScroll: !state.blockScroll
            }
       default:
        return state;
    }
}