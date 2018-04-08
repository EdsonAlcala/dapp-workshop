import { ADD_MEMBER,
    MEMBER_ADDED,
    ADD_PROPOSAL,
    PROPOSAL_ADDED,
    VOTE,
    VOTE_ADDED,
    VIEW_RESULTS, 
    PROPOSALS_RECEIVED, 
    PROPOSAL_RECEIVED,
    USER_LOGGED_IN} from './types';
import { contract } from '../utils/connector'; 

// export function addMember(address, callback) {
//     return (dispatch) => {
//         callback();
//         dispatch({
//             type: USER_LOGGED_IN,
//             data: address
//         })
//     }
// }

export function addMember(address, callback) {
    return (dispatch) => {
        contract.then(organizationInstance => {
            organizationInstance.addMember(address, { from: address}).then((result) => {
                console.log(result);
                callback();
                dispatch({
                    type: USER_LOGGED_IN,
                    data: address
                })
            });
        });
    }
}

export function addProposal(title, description, callback) {
    return (dispatch, getState) => {
        contract.then(organizationInstance => {
            debugger;
            //need to persist the address in the state or any reducer
            const { address } = getState().mainReducer; 
            organizationInstance.addProposal(title, description, { from: address}).then((result) => {
                console.log(result);
                callback();
            });
        });
    }
}

export function getProposal(proposalId) {
    return (dispatch) => {
        contract.then(organizationInstance => {
            organizationInstance.proposals(proposalId)
            .then((item) => {
                let proposal = { 
                    header: item[0], 
                    description: item[1],
                    proposalId: proposalId
                } 
                dispatch({
                    type: PROPOSAL_RECEIVED,
                    data: proposal
                })
            })
        })
    }
}

export function getProposals() {
    return (dispatch, getState) => {
        contract.then(organizationInstance => {
            organizationInstance.numProposals().then((numProposals) => {
                //get the proposal ids by index    
                debugger;
                const { address } = getState().mainReducer; 
                let indexes = [];
                for (let i = 1; i <= numProposals.toNumber(); i++) {
                    indexes.push(i);
                }
                let actions = indexes.map((i) => {
                    return new Promise((resolve, reject) => {
                        organizationInstance.proposals(i)
                            .then((result) => {
                                result.proposalId = i;
                                resolve(result);
                            })
                        })
                });

                let results = Promise.all(actions);
                results.then(data => {
                    debugger;
                    let proposals = data.map((item) => { 
                        return { 
                            header: item[0], 
                            description: item[1],
                            proposalId: item.proposalId 
                        } 
                    });
                    dispatch({
                        type: PROPOSALS_RECEIVED,
                        data: proposals
                    });
                });
            });
        });
    }
}

export function vote(proposalId, callback) {
    return (dispatch, getState) => {
        const { address } = getState().mainReducer; 
        contract.then(organizationInstance => {
            organizationInstance.vote(proposalId, { from : address }).then((numProposals) => {
                callback();
            })
        })
    }
}

export function getResults(address) {
    return (dispatch) => {
        
    }
}