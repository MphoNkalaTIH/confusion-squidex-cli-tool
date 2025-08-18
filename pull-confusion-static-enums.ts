import axios from 'axios';
import  'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

interface DataFields {
  brand?: { iv: string };
  route?: { iv: string };
  name?: {iv: string},
  baseRoute?: { iv: string };
  environmentId?: { iv: string };
  [key: string]: any;
}


async function getComponentsData(token: string): Promise<any[] | null> {
  //get qoute sections from squidex
  const QOUTE_SECTIONS_URL = `${(process.env.ENVIRONMENT ?? 'DEV')}_ENUMS_URL`;

  return await axios.get<any>(
    process.env[QOUTE_SECTIONS_URL] ?? '',
    {
      headers: 
      { 
        Authorization: `Bearer ${token}`,
      }
    }
  ).then((resp) =>{
    console.log("[#] Done doing fetch components from squidex [#]");
    return resp.data.items;
  }).catch((err)=> {
    console.log({error_fetching: err})
    return null
  })
}

function buildFilePath(id: string, outDir: string): string {  
  return path.join(outDir, `${id}.json`);
}


async function writeDataFiles(items: any[], outDir: string) {
  for (const item of items) {
    const filePath = buildFilePath(item.id, outDir);
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    try {
      //file exists?
      await fs.access(filePath);

      //if no error file exists
      console.log(`Updating existing file: ${filePath}`);
    } catch {
      //if error file does not exist
      console.log(`Creating new file: ${filePath}`);
    }

    //create or update the file
    await fs.writeFile(filePath, JSON.stringify(item, null, 2), 'utf-8');
  }
}

(async () => {
  try {
    const ACCESS_TOKEN = process.env.TOKEN //await getUserAccessToken();
    if(!ACCESS_TOKEN) return;

    const items = await getComponentsData(ACCESS_TOKEN);
    if(items) await writeDataFiles(items, './static-enums');
    
    console.log('Data files written to ./output');
  } catch (err) {
    console.error('Error fetching Squidex data:', err);
  }
})();