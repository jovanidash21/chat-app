import { UPLOAD_IMAGE } from '../constants/upload';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  image: {...commonStateFlags},
  imageLink: '',
};

const upload = (state = initialState, action) => {
  switch(action.type) {
    case `${UPLOAD_IMAGE}_LOADING`: {
      return {
        ...state,
        image: {
          ...state.image,
          loading: true,
        }
      };
    }
    case `${UPLOAD_IMAGE}_SUCCESS`: {
      return {
        ...state,
        image: {
          ...state.image,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        imageLink: action.payload.data.imageLink,
      };
    }
    case `${UPLOAD_IMAGE}_ERROR`: {
      return {
        ...state,
        image: {
          ...state.image,
          loading: false,
          success: false,
          error: true,
          message: action.payload.data.message,
        },
      };
    }
    default:
      return state;
  }
}

export default upload;
