import { CREATE } from '../constants/roomCreateConstants'

const initialState = {
    name: '',
    room: ''
}

const roomCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE: return {
      ...state,
        name: action.name_payload,
        room: action.room_payload
    }

    default: return state
  }
}

export default roomCreateReducer;