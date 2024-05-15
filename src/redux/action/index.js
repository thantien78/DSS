export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const FETCH_NETWORKS = 'FETCH_NETWORKS'
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const TOGGLE_MODE = 'TOGGLE_MODE'

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

export const fetchNetworks = () => {
    return async (dispatch) => {
        try {
            let response = await fetch('http://api.citybik.es/v2/networks')
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_NETWORKS,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

export const fetchBikeStations = (networkId) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`http://api.citybik.es${networkId}`)
            if(response.ok) {
                let data = await response.json()
                console.log(data)
                dispatch({
                    type: FETCH_STATIONS,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}



export const toggleMode = () => {
    return {
        type: TOGGLE_MODE,
    }
}