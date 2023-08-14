import { TransactionBlock } from '@mysten/sui.js'
import { signer } from './signer'

async function main() {
  const pkgId = '0xe18ce20fb35bfbfafedfeef2039770b4822e5022d72645f5d466d80d129d3816';
  const poolId = '0x04e06be580488ee5c068650b8dba18ae6e73bf772bc3baa9d176ab61bc82aebb';
  
  const tx = new TransactionBlock();
  
  // Now I have 100 coinA
  const [coinA, loanA] = tx.moveCall({
    target: `${pkgId}::dex::borrow_a`,
    arguments: [tx.object(poolId), tx.pure(100)]
  });
  
  // swap 100 coinA to 200 coinB
  const coinB_200 = tx.moveCall({
    target: `${pkgId}::dex::a_to_b`,
    arguments: [tx.object(poolId), coinA]
  })
  // swap 200 coinB to 200 coinC
  const coinC_200 = tx.moveCall({
    target: `${pkgId}::dex::b_to_c`,
    arguments: [tx.object(poolId), coinB_200]
  });
  // swap 200 coinC to 200 coinA
  const coinA_back = tx.moveCall({
    target: `${pkgId}::dex::c_to_a`,
    arguments: [tx.object(poolId), coinC_200]
  });
  // split 100 coinA from 200 coinA
  const [coinA_100] = tx.splitCoins(coinA_back, [tx.pure(100)])
  // repay 100 coinA
  tx.moveCall({
    target: `${pkgId}::dex::repay_a`,
    arguments: [tx.object(poolId), coinA_100, loanA]
  })
  // transfer the rest 100 coinA to my address
  const myAddress = await signer.getAddress();
  tx.transferObjects([coinA_back], tx.pure(myAddress));
  
  // sign and execute
  return signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
}

main().then(console.log).catch(console.error);
