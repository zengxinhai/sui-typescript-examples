import { TransactionBlock } from '@mysten/sui.js';
import { signer } from './signer';

const tx = new TransactionBlock();
tx.transferObjects([tx.object('objectId')], tx.pure('sender'));

signer.signAndExecuteTransactionBlock({ transactionBlock: tx }).then();


