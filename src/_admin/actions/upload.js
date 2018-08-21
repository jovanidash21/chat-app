import axios from 'axios';
import { UPLOAD_IMAGE } from '../constants/upload';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Upload image
 * @param {Object} image
 */
export function uploadImage(image) {
  let data = new FormData();
  data.append('image', image);

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };

  return dispatch => {
    return dispatch({
      type: UPLOAD_IMAGE,
      payload: axios.post(baseURL + '/api/upload/image', data, config)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
