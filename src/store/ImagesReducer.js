export const IMAGE_LOAD = 'IMAGE_LOAD';
export const IMAGE_SUCCESS = 'IMAGE_SUCCESS';
export const IMAGE_FAIL = 'IMAGE_FAIL';

type State = {
  imageUrls: { id: number, url: string },
  loading: boolean,
  error: boolean,
  imageData: any
}

const INITIAL_STATE: State = {
  imageUrls: {},
  loading: false,
  error: false,
  imageData: false
};

const startImageLoad = () => {
  return {
    type: IMAGE_LOAD
  }
};

const imageLoadFailed = (error) => {
  return {
    type: IMAGE_FAIL,
    error
  }
};

const imageLoadSuccess = (data: string, id: number) => {
  return {
    type: IMAGE_SUCCESS,
    data: {data, id}
  }
};

export const imagesReducer = (state: State = INITIAL_STATE, action): State => {
  switch (action.type) {
    case IMAGE_LOAD:
      return {...state, loading: true, error: false, imageData: false};
    case IMAGE_SUCCESS:
      return {
        ...state, loading: false, error: false,
        imageUrls: {...state.imageUrls, [action.data.id]: action.data.data}
      };
    case IMAGE_FAIL:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export const loadImage = (id: number) => dispatch => {
  console.log(`fetching image for: ${id}.................`);
  dispatch(startImageLoad());
  try {
    // console.log("making another request.........................");
    fetch(`https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${id}&type=card`)
      .then((response) => {
        response.blob().then((blob) => {
          const fileReaderInstance = new FileReader();
          fileReaderInstance.readAsDataURL(blob);
          fileReaderInstance.onload = () => {
            dispatch(imageLoadSuccess(fileReaderInstance.result, id));
          };
        });
      })
  } catch (error) {
    dispatch(imageLoadFailed(error));
  }
};