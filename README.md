This is the repository of the DApp Workshop

To run the demo, please change the utils/connector with your uport information

It is also required to deploy your contract to the Rinkeby network and replace your contract address in
the utils/connector file. Remember to deploy your contract with Remix.

> npm install 
> npm start

Notes: When you sign in with your uport application, please wait until you receive a notification
to approve the transaction, as the first step we are adding us as members, it means we are calling the addMember method
in the smart contract.

Unfortunately we don't have a loader in the first page, I'll add it asap.
