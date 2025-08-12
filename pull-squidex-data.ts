import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SquidexComponentItem {
  id: string;
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  data: Record<string, any>;
}

interface SquidexListResponse<T> {
  total: number;
  items: T[];
}

interface DataFields {
  brand?: { iv: string };
  route?: { iv: string };
  baseRoute?: { iv: string };
  environmentId?: { iv: string };
  [key: string]: any;
}

async function getComponentsData(token: string): Promise<SquidexComponentItem[] | null> {
  return await axios.get<SquidexListResponse<SquidexComponentItem>>(
    process.env.QOUTE_SECTIONS_URL ?? '',
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).then((resp) =>{
    console.log("[#] Done doing fetch components from squidex [#]");
    return resp.data.items;
  }).catch((err)=> {
    console.log({error_fetching: err})
    return null
  })
}

function buildFilePath(data: DataFields, id: string, outDir: string): string {
  const env = data.environmentId?.iv ?? '';
  const brand = data.brand?.iv ?? '';
  const route = data.route?.iv ?? '';
  const baseRoute = data.baseRoute?.iv ?? '';
  // folders: output/env/brand/
  // file: route-baseRoute-id.json
  const folderPath = path.join(outDir, env, brand);
  const fileName = `${route}-${baseRoute}-${id}.json`;
  return path.join(folderPath, fileName);
}

async function writeDataFiles(items: SquidexComponentItem[], outDir: string) {
  for (const item of items) {
    const filePath = buildFilePath(item.data, item.id, outDir);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(item.data, null, 2), 'utf-8');
  }
}

(async () => {
  try {
    const items = await getComponentsData(process.env.ACCESS_TOKEN ?? '');
    
    if(items){
      await writeDataFiles(items, './output');
    }
    
    console.log('Data files written to ./output');
  } catch (err) {
    console.error('Error fetching Squidex data:', err);
  }
})();