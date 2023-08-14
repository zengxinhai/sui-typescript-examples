### Simple Transfer

```typescript
/** Import the SDK **/
import { TransactionBlock } from '@mysten/sui.js';

/** Compose the transaction block **/
const tx = new TransactionBlock();
tx.transferObjects([tx.object('objectId')], tx.pure('sender'));

/** Sign and send the transaction block **/
signer.signAndExecuteTransactionBlock({ transactionBlock: tx }).then();
```
