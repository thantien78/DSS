import { initialState } from "../store";
import { FETCH_USER_DATA,  FETCH_DRAINS_DATA_JSON, FETCH_WATERLEVEL_DATA_JSON, FETCH_RAINS_DATA_JSON
       , TOGGLE_DRAINS, TOGGLE_WATERLEVEL, TOGGLE_RAINS } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                countryCode: action.payload,
                isLoading: false,
            }
        case FETCH_DRAINS_DATA_JSON: 
            return {
                ...state,
                isLoading: false,
                drains: action.payload,
            }

        case FETCH_WATERLEVEL_DATA_JSON: 
            return {
                ...state,
                isLoading: false,
                waterlevel: action.payload,
            }

        case FETCH_RAINS_DATA_JSON: 
            return {
                ...state,
                isLoading: false,
                rains: action.payload,
            }
        
        case TOGGLE_DRAINS: 
            return {
                ...state,
                showDrains: !state.showDrains
            }

        case TOGGLE_WATERLEVEL: 
            return {
                ...state,
                showWaterLevel: !state.showWaterLevel
            }

        case TOGGLE_RAINS: 
            return {
                ...state,
                showRains: !state.showRains
            }
            
        default: {
            return {
                ...state
            }
        }
    }
}