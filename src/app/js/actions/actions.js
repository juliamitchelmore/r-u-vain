import fetchJsonp from 'fetch-jsonp'
import fetch from 'isomorphic-fetch'

function receiveMedia(ownLikes, totalItems, username, profilePicture) {
    return {
        type: 'RECEIVE_MEDIA',
        ownLikes,
        totalItems,
        username,
        profilePicture
    }
}

function requestMedia(username) {
    return {
        type: 'REQUEST_MEDIA'
    }
}

function invokeLambda(url, body) {
    const settings = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch(url, settings)
        .then(response => response.json())
        .then(json => json)
}

export function fetchMedia(username) {
    //ONLY WORKS for authenticated users currently because of sandbox mode, and only for one page of results.
    return function (dispatch) {
        dispatch(requestMedia(username))

        return invokeLambda("https://4y2p8124pb.execute-api.eu-west-1.amazonaws.com/prod/userdetails", { username })
            .then(userResponse => {
                return invokeLambda("https://4y2p8124pb.execute-api.eu-west-1.amazonaws.com/prod/uservanity", { id: userResponse.data[0].id })
                    .then(response => dispatch(receiveMedia(response.ownLikes, response.totalItems, userResponse.data[0].username, userResponse.data[0].profile_picture)))
                    .catch(error => dispatch(handleError()))
            })
            .catch(error => dispatch(handleError()))
    }
}

export function resetResults() {
    return {
        type: 'RESET_RESULTS'
    }
}

export function handleError() {
    return {
        type: 'HANDLE_ERROR'
    }
}