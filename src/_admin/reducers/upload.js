export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

const initialState = {
  image: {
    loading: false,
    success: false,
    error: false,
    message: ''
  },
  imageLink: ''
};

const upload = (state=initialState, action) => {
  switch(action.type) {
    case `${UPLOAD_IMAGE}_LOADING`:
      return {
        ...state,
        image: {
          ...state.image,
          loading: true
        }
      };
    case `${UPLOAD_IMAGE}_SUCCESS`:
      return {
        ...state,
        image: {
          ...state.image,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        imageLink: action.payload.data.imageLink
      };
    case `${UPLOAD_IMAGE}_ERROR`:
      return {
        ...state,
        image: {
          ...state.image,
          loading: false,
          success: false,
          error: true,
          message: action.payload.data.message
        }
      };
    default:
      return state;
  }
}

export default upload;
