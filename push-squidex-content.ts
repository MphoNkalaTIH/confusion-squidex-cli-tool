import axios from "axios";
import fs from 'fs/promises';
import 'dotenv/config';

async function pushUpdatedContent(file: string): Promise<void | null> {  
  const environment = process.env.ENVIRONMENT;
  const ACCESS_TOKEN = process.env[`${environment}_TOKEN`];

  if (!ACCESS_TOKEN) {
    console.error('[#] No access token found. Please set the TOKEN environment variable [#]');
    return;
  }

  const fileContent = await fs.readFile(file, 'utf8');
  const fileContentJson = JSON.parse(fileContent);
  const fileContentData = fileContentJson.data;
  const PUSH_URL = fileContentJson._links.update.href;
  const BASE_URL = process.env[`${environment}_BASE_URL`];

  if (!BASE_URL) {
    console.error(`[#] No base URL found for environment: ${environment} [#]`);
    return;
  }

  return await axios.put<any>(
    `${BASE_URL}${PUSH_URL}`,
    fileContentData,
    {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    }
  ).then((resp) => {
    console.log(`[#] Done updating squidex content for ${environment} environment [#]`);
    return console.log({put_content_response: resp});
  }).catch((err) => {
    console.log({error_pushing: err.response});
    return null;
  });
}

(async () => {
  try {
    const file = process.argv[2];

    if (!file) {
      console.error("Usage: node push-squidex-data.js <file>");
      return;
    }
    
    console.log(`Pushing content to ${process.env.ENVIRONMENT} environment`);
    await pushUpdatedContent(file);
  } catch (err) {
    console.error('Error updating Squidex content with error:', err);
  }
})();