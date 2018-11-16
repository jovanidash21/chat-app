import axios from 'axios';
import { SEND_EMAIL } from '../constants/email';
import { getBaseURL } from '../../utils/url';

const baseURL = getBaseURL();

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
      payload: axios.post(baseURL + '/api/email', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
