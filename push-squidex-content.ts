import axios from "axios";
import fs from 'fs/promises';
import 'dotenv/config';

function getEnvironmentUrl(app: string, schema: string): string {
  const key = `${app} ${schema}`;

  switch(key) {
    case "con-fusion qoute-sections":
      return 'DEV_QOUTE_SECTIONS_URL';

    case "con-fusion qoute-flow":
      return 'DEV_QOUTE_FLOW_URL';

    case "con-fusion-static static-data":
      return 'DEV_STATIC_DATA_URL';

    case "con-fusion-static enums":
      return 'DEV_ENUMS_URL';
    default:
      return '';
  }
}

async function pushUpdatedContent(app: string, schema: string, file: string, contentId: string): Promise<void | null> {
  const fileContent = await fs.readFile(file, 'utf8');
  const fileContentData = JSON.parse(fileContent).data;

  const ENVIRONMENT_URL = getEnvironmentUrl(app, schema);
  const UPDATE_SECTION = `${ENVIRONMENT_URL}/${contentId}`;

  return await axios.put<any>(
    UPDATE_SECTION,
    fileContentData,
    {
      headers: 
      { 
        Authorization: `Bearer ${process.env.TOKEN}`,
      }
    }
  ).then((resp) =>{
    return console.log({put_content_response: resp.data});
  }).catch((err)=> {
    console.log({error_fetching: err.response.data});
    return null
  })
}

(async () => {
  try {
    const app = process.argv[2];
    const schema = process.argv[3];
    const file =  process.argv[4];
    const contentId = process.argv[5];

    if (!app || !schema || !file || !contentId) {
      console.error("Usage: node push-squidex-data.js <app> <schema> <file> <contentId>");
      return;
    }

    console.log(`[#] Updating squidex content in ${schema} of ${app} for content with Id ${contentId} [#]`); 
    
    await pushUpdatedContent(app, schema, file, contentId);
    console.log(`[#] Done updating squidex content with Id ${contentId} [#]`);
  } catch (err) {
    console.error('Error updating Squidex content with error:', err);
  }
})();