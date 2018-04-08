pragma solidity ^0.4.18;

contract Organization {

    mapping (address => bool) public members;
    
    mapping (uint => Proposal) public proposals;

    mapping(uint => bool) public proposalExist;

    address public owner = msg.sender;
        
    //rules
    uint minimumQuorum; 
    
    uint maximumNumberOfMembers;

    uint public numProposals;

    event ProposalAdded(uint ProposalAdded);

    struct Proposal {
        //address owner; do we care?
        string title;
        string description;
        bool executed;
        uint numberOfVotes;
        mapping (address => bool) voted;
    }
    
    modifier onlyMembers {
        require(members[msg.sender]);
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Organization(uint minQuorum, uint maxNumOfMembers) public {
        minimumQuorum = minQuorum;
        maximumNumberOfMembers = maxNumOfMembers;
    }

    /// @dev maybe onlyOwner?
    function addMember(address newMember) public returns(bool result){ 
        members[newMember] = true;
        result = true;
        return result;
    }

    /// @dev validate minimum quorum?
    function addProposal(string title, string description) onlyMembers public returns(bool result) {       
        numProposals++;
        proposals[numProposals] = Proposal(title, description, false, 0);
        proposalExist[numProposals] = true;
        result = true;
        //emit ProposalAdded(numProposals);    
        return result;
    }

    function vote(uint proposalId) onlyMembers public returns(bool result){
        require(proposalExist[proposalId]);        
        Proposal storage p = proposals[proposalId];
        require(!p.voted[msg.sender]);
        p.numberOfVotes++;
        p.voted[msg.sender] = true;
        result = true;
        return result;
    }

    function getWinnerProposal() onlyMembers public view returns (uint winnerProposalId){
        //TODO: Validate minimum quorum?
        uint winningVoteCount = 0;
        for (uint p = 1; p <= numProposals; p++) {
            if (proposals[p].numberOfVotes > winningVoteCount) {
                winningVoteCount = proposals[p].numberOfVotes;
                winnerProposalId = p;
            }
        }
        return winnerProposalId;
    }
}