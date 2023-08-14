import * as dotenv from 'dotenv';
import { RawSigner, Ed25519Keypair, JsonRpcProvider, testnetConnection } from '@mysten/sui.js';
dotenv.config();

const secretKey = process.env.SECRET_KEY as string; // base64密钥
const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
const provider = new JsonRpcProvider(testnetConnection);
export const signer = new RawSigner(keyPair, provider);

