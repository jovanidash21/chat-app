import axios from 'axios';
import { SEND_EMAIL } from '../constants/email';

/**
 * Send email
 * @param {string} username
 * @param {string} email
 */
export function sendEmail(email, name) {
  let data = {
    email,
    name,
  };

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
