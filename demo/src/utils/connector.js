import { Connect, SimpleSigner } from 'uport-connect'
import OrganizationContract from '../build/Organization.json';

export const uport = new Connect('dapp-workshop', {
    clientId: '2onBp3mzTkqL6yYScbJdAj1BmyNXarWX5sT',
    network: 'rinkeby',
    signer: SimpleSigner('f8ee568811f011ba93b5cd7105dbdd25d9de2d34ace72ffd6c909ea79a4ff2e2')
  });

export const web3 = uport.getWeb3()

const Contract = require('truffle-contract');

const organization = Contract(OrganizationContract);

organization.setProvider(web3.currentProvider);

const CONTRACT_ADDRESS = "0x68931f7b876e20dfbce5389b658046852395ad75";

export const contract = organization.at(CONTRACT_ADDRESS);