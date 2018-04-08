const Organization = artifacts.require("Organization");

contract('Organization', (accounts) => {
    let contractInstance;
    const creator = accounts[0];    

    beforeEach(async function () {        
        contractInstance = await Organization.new(4, 4, { from: creator });
    });

    describe("# addMember()", () => {
        it("should add a new member", async () => {
            //arrange
            let memberToAdd = accounts[1];
            let transactionCall;
            let memberExist;

            //act
            transactionCall = await contractInstance.addMember.call(memberToAdd);
            await contractInstance.addMember(memberToAdd);            
            memberExist = await contractInstance.members(memberToAdd);
            
            //assert
            assert.equal(transactionCall, true);
            assert.equal(memberExist, true);            
        })       
    })
    
    describe("# addProposal()", () => {
        it("should add a new proposal", async () => {
            //arrange
            let proposalTitle = "title";
            let proposalDescription = "description";
            let proposalId = 1;            
            let proposalExistResult;
            let memberToAdd = accounts[1];

            //act
            await contractInstance.addMember(memberToAdd);
            let proposalCall = await contractInstance.addProposal.call(proposalTitle, proposalDescription, { from: memberToAdd});            
            await contractInstance.addProposal(proposalTitle, proposalDescription, { from: memberToAdd});
            proposalExistResult = await contractInstance.proposalExist(proposalId);

            //assert
            assert.equal(proposalCall, true)
            assert.equal(proposalExistResult, true)
        })       
    })  

    describe("# vote()", () => {
        it("should vote for a proposal", async () => {
            //arrange
            let numberOfVotes;
            let memberToAdd = accounts[1];
            let proposalTitle = "title";
            let proposalDescription = "description";
            let proposalId = 1;            
            let proposal;

            //act          
            await contractInstance.addMember(memberToAdd);
            await contractInstance.addProposal(proposalTitle, proposalDescription, { from: memberToAdd});
            await contractInstance.vote(proposalId, { from: memberToAdd});
            proposal = await contractInstance.proposals(proposalId);            
            numberOfVotes = proposal[3].toNumber();

            //assert
            assert.equal(numberOfVotes, proposalId);
        })       
    })  

    describe("# getWinnerProposal()", () => {
        it("should get the winner proposal", async () => {
            //arrange
            let winnerProposal;
            let memberToAdd = accounts[1];
            let proposalTitle = "title";
            let proposalDescription = "description";
            let proposalId = 1;            
            let proposal;

            //act
            await contractInstance.addMember(memberToAdd);
            await contractInstance.addProposal(proposalTitle, proposalDescription, { from: memberToAdd});
            await contractInstance.vote(proposalId, { from: memberToAdd});
            winnerProposal = await contractInstance.getWinnerProposal({ from: memberToAdd});

            //assert
            assert.equal(winnerProposal.toNumber(), proposalId);
        })       
    })  

});

//For more information about Mocha test suites
//https://gist.github.com/samwize/8877226#file-mocha-guide-to-testing-js-L53