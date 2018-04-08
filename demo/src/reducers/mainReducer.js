import { USER_LOGGED_IN, PROPOSALS_RECEIVED, PROPOSAL_RECEIVED } from '../actions/types';

const initialState = {
    address: "",
    proposals: [],
    proposal: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return { ...state, ...{ address: action.data } };
        case PROPOSALS_RECEIVED:
            return { ...state, ...{ proposals: action.data } };
        case PROPOSAL_RECEIVED:
            return { ...state, ...{ proposal: action.data } };
        default:
            return state;
    }
}