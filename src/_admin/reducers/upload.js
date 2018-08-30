export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

const initialState = {
  isUploadingImage: false,
  isUploadingImageSuccess: true,
  imageLink: ''
};

const upload = (state=initialState, action) => {
  switch(action.type) {
    case `${UPLOAD_IMAGE}_LOADING`:
      return {
        ...state,
        isUploadingImage: true
      };
    case `${UPLOAD_IMAGE}_SUCCESS`:
      return {
        ...state,
        isUploadingImage: false,
        isUploadingImageSuccess: true,
        imageLink: action.payload.data.imageLink
      };
    case `${UPLOAD_IMAGE}_ERROR`:
      return {
        ...state,
        isUploadingImage: false,
        isUploadingImageSuccess: false
      };
    default:
      return state;
  }
}

export default upload;
