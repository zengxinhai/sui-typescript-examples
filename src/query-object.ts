import {
  JsonRpcProvider,
  testnetConnection,
} from "@mysten/sui.js";

async function main() {

  const objId = '0x04e06be580488ee5c068650b8dba18ae6e73bf772bc3baa9d176ab61bc82aebb';
  const provider = new JsonRpcProvider(testnetConnection);
  const res = await provider.getObject({
    id: objId,
    options: {
      showDisplay: true,
      showContent: true,
      showOwner: true,
      showType: true
    }
  });
  return res;
}

main().then(console.log).catch(console.error);
