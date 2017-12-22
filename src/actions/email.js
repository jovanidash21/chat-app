import axios from 'axios';
import { SEND_EMAIL } from '../constants/email';

export function sendEmail(data) {
  return dispatch => {
    return dispatch({
      type: SEND_EMAIL,
      payload: axios.post('/api/email', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
