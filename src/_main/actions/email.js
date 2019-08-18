import axios from 'axios';
import { SEND_EMAIL } from '../constants/email';

/**
 * Send email
 *
 * @param {string} email
 * @param {string} name
 */
export function sendEmail(email, name) {
  const data = {
    email,
    name,
  };

  return dispatch => {
    return dispatch({
      type: SEND_EMAIL,
      payload: axios.post('/email', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
