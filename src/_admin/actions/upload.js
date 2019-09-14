import axios from 'axios';
import { UPLOAD_IMAGE } from '../constants/upload';

/**
 * Upload image
 *
 * @param {Object} image
 */
export function uploadImage(image) {
  const data = new FormData();
  data.append('image', image);

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  return dispatch => {
    return dispatch({
      type: UPLOAD_IMAGE,
      payload: axios.post('/upload/image', data, config),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
