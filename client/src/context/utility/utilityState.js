import React, {useReducer,useEffect} from 'react';

import utilityReducer from './utilityReducer';
import utilityContext from './utilityContext';

import {
    UPDATE_SIZE,
    UPDATE_YPOS,
    CHANGE_BLOCK_SCROLL
} from '../../types'; 

const UtilityState = props => {
    const initialState = {
        width: window.innerWidth,
        height: window.innerHeight,
        yOffset: window.pageYOffset,
        blockScroll: false
    }
    // crear dispatch y state
    const [state, dispatch] = useReducer(utilityReducer, initialState);
    // funciones
    const changeBlockScroll = () => {
        dispatch({
            type: CHANGE_BLOCK_SCROLL,
        })
    }
    useEffect(() => {
        const handleResize = () => {
            let size = {
                height:window.innerHeight,
                width: window.innerWidth
            }
            dispatch({
                type: UPDATE_SIZE,
                payload:size
            })
        };
        const handlescroll = () => {
            let yPos = window.pageYOffset;
            dispatch({
                type: UPDATE_YPOS,
                payload:yPos
            })
        }
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handlescroll, {passive: true})
        return () => {
            window.removeEventListener('resize', handleResize);
            window.addEventListener('scroll', handlescroll, {passive: true});
        };
    },[]);
    useEffect(() => {
        if(state.blockScroll){
            document.body.style.overflow = 'hidden'
            return () => {
              document.body.style.overflow = 'unset';
            }
        }

    },[state.blockScroll]);

    return (
        <utilityContext.Provider 
            value={{
                width: state.width,
                height: state.height,
                yOffset: state.yOffset,
                blockScroll: state.blockScroll,
                changeBlockScroll
            }}
        >
            {props.children}
        </utilityContext.Provider>

    )
}

export default UtilityState;