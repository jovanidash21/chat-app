export default function (state = null, action) {
    switch (action.type) {
        case 'NAME_SELECTED':
            return action.payload;
            break;
    }
    return state;
}