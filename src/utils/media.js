/**
 * Get media
 *
 * @param {function} callback
 * @param {function} err
 */
export function getMedia(callback, err) {
  const constraints = {
    video: {
      facingMode: 'user',
      height: {
        min: 360,
        ideal: 720,
        max: 1080,
      },
    },
    audio: true,
  };

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        callback(stream);
      })
      .catch((error) => {
        err( error );
      });
  }

  return navigator.getUserMedia(constraints, callback,  err);
}
