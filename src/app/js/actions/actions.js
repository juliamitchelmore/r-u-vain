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

var mediaItems = []
var ownLikes = 0

export function fetchMedia(username) {
    //ONLY WORKS for authenticated users currently because of sandbox mode, and only for one page of results.
    return function (dispatch) {
        dispatch(requestMedia(username))

        return invokeLambda("https://4y2p8124pb.execute-api.eu-west-1.amazonaws.com/prod/userdetails", { username })
            .then(userResponse => {
                const userId = userResponse.data[0].id
                return invokeLambda("https://4y2p8124pb.execute-api.eu-west-1.amazonaws.com/prod/uservanity", { id: userId })
                    .then(response => {
                        mediaItems = response.mediaItems
                        const totalItems = response.totalItems

                        mediaLoop(mediaItems[0], 0, totalItems, userId)
                        .then(() => {
                            dispatch(receiveMedia(ownLikes, totalItems, userResponse.data[0].username, userResponse.data[0].profile_picture))
                        })
                    })
                    .catch(error => dispatch(handleError()))
            })
            .catch(error => dispatch(handleError()))
    }
}

function mediaLoop(mediaId, index, totalItems, userId) {
    var promise = new Promise(function(resolve, reject) {
        return invokeLambda("https://4y2p8124pb.execute-api.eu-west-1.amazonaws.com/prod/usermedialikes", { mediaId, userId })
        .then(response => {
            ownLikes += response.hasLiked ? 1 : 0
            if (index + 1 < totalItems) {
                mediaLoop(mediaItems[index + 1], index + 1, totalItems, userId)
                .then(() => resolve())
            } else {
                resolve({ result: ownLikes })
            }
        })
    })
    return promise
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