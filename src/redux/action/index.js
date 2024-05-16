export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const FETCH_DRAINS_DATA_JSON = 'FETCH_DRAINS_DATA_JSON'
export const FETCH_WATERLEVEL_DATA_JSON = 'FETCH_WATERLEVEL_DATA_JSON'
export const FETCH_RAINS_DATA_JSON = 'FETCH_RAINS_DATA_JSON'
export const TOGGLE_DRAINS = 'TOGGLE_DRAINS'
export const TOGGLE_WATERLEVEL = 'TOGGLE_WATERLEVEL'
export const TOGGLE_RAINS = 'TOGGLE_RAINS'

export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`https://ip.nf/me.json`)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_USER_DATA,
                    payload: data.ip.country_code
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchDrains = () => {
    return async (dispatch) => {
        try {
            let response = await fetch('../data/drains.json')
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_DRAINS_DATA_JSON,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

export const fetchWaterLevel = () => {
    return async (dispatch) => {
        try {
            let response = await fetch('../data/water-level.json')
            if(response.ok) {
                let data = await response.json()
                console.log(data)
                dispatch({
                    type: FETCH_WATERLEVEL_DATA_JSON,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchRains = () => {
    return async (dispatch) => {
        try {
            let response = await fetch('../data/rains.json')
            if(response.ok) {
                let data = await response.json()
                console.log(data)
                dispatch({
                    type: FETCH_RAINS_DATA_JSON,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const toggleDrains = () => {
    return {
        type: TOGGLE_DRAINS,
    }
}

export const toggleWaterLevel = () => {
    return {
        type: TOGGLE_WATERLEVEL,
    }
}

export const toggleRains = () => {
    return {
        type: TOGGLE_RAINS,
    }
}