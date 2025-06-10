import { Web3Storage, File } from 'web3.storage';

const token = process.env.WEB3_STORAGE_TOKEN;

let client: Web3Storage | null = null;
if (token) {
  client = new Web3Storage({ token });
}

export async function publishToIpfs(data: unknown): Promise<string> {
  if (!client) {
    throw new Error('WEB3_STORAGE_TOKEN not configured');
  }
  const blob = Buffer.from(JSON.stringify(data));
  const files = [new File([blob], 'data.json')];
  const cid = await client.put(files, { wrapWithDirectory: false });
  return cid;
}
