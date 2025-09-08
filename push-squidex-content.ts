import axios from "axios";
import fs from 'fs/promises';
import 'dotenv/config';

async function pushUpdatedContent( file: string): Promise<void | null> {  
  const fileContent = await fs.readFile(file, 'utf8');
  
  const fileContentJson = JSON.parse(fileContent);
  const fileContentData = fileContentJson.data;

  const PUSH_URL = fileContentJson._links.update.href;

  return await axios.put<any>(
    `${process.env.DEV_BASE_URL}${PUSH_URL}`,
    fileContentData,
    {
      headers: 
      { 
        Authorization: `Bearer ${process.env.DEV_TOKEN}`,
      }
    }
  ).then((resp) =>{
    console.log(`[#] Done updating squidex content [#]`);

    return console.log({put_content_response: resp});
  }).catch((err)=> {
    console.log({error_fetching: err.response});
    return null
  })
}

(async () => {
  try {
    const file =  process.argv[2];

    if (!file) {
      console.error("Usage: node push-squidex-data.js <file>");
      return;
    }
    
    await pushUpdatedContent(file);
  } catch (err) {
    console.error('Error updating Squidex content with error:', err);
  }
})();