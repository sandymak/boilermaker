import axios from 'axios';

// initial state
const initialState = [];

// action type
const GOT_STUDIOS = 'GOT_STUDIOS';
const NEW_STUDIO = 'NEW_STUDIO';
const REMOVED_STUDIO = 'REMOVED_STUDIO';
const EDITED_STUDIO = 'EDITED_STUDIO';

// action creator
const gotStudios = studios => {
  const action = {
    type: GOT_STUDIOS,
    studios
  };
  return action
};


const addedStudio = newStudio => {
  const action = {
    type: NEW_STUDIO,
    newStudio
  }
  return action
}

const removedStudio = (studios) => {
  const action = {
    type: REMOVED_STUDIO,
    studios

  }
  return action
}

const editedStudio = (updatedStudio) => {
  const action = {
    type: EDITED_STUDIO,
    updatedStudio
  }
  return action
}
// thunk action creator
export function fetchStudios () {
  return function thunkFunc (dispatch) {
    return axios.get('/api/studios')
    .then(res => res.data)
    .then(studios => dispatch(gotStudios(studios)))
    .catch(console.error)
  }
}

export function postStudio(newStudio) {
  return function thunkFunc(dispatch) {
    return axios.post('/api/studios', newStudio)
      .then(res => res.data)
      .then(studio => dispatch(addedStudent(studio)))
      .catch(console.error)
  }
}

export function deleteStudio(studioId) {
  return function thunkFunc(dispatch) {
    return axios.delete(`/api/studios/${studioId}`)
    .then(() => axios.get('/api/studios'))
    .then(res => res.data)
    .then(studios => dispatch(removedStudio(studios)))
    .catch(console.error)
  }
}

export function updateStudio(studioId, currentState) {
  return function thunkFunc(dispatch) {
    return axios.put(`/api/studios/${studioId}`, currentState)
    .then(res => res.data)
    .then(updated => dispatch(editedStudio(updated)))
    .catch(console.error)
  }
}

//reducer

const studioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDIOS:
      return action.studios;

    case NEW_STUDIO:
      return [...state, action.newStudio];

    case REMOVED_STUDIO:
      return action.studios;

    case EDITED_STUDIO:
      return [...state.filter(studio => studio.id !== action.updatedStudio.id), action.updatedStudio]

    default:
      return state
  }
}

export default studioReducer;
