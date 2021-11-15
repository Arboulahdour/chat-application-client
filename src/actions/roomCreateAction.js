import { CREATE } from '../constants/roomCreateConstants';

export const roomCreateAction = (name, room) => {
  return {
    type: CREATE,
    name_payload: name,
    room_payload: room
  }
}