import axios from "axios";
import fs from 'fs/promises';
import 'dotenv/config';

async function pushUpdatedContent(file) {
  const fileContent = await fs.readFile(file, 'utf8');
  
  const fileContentJson = JSON.parse(fileContent);
  const fileContentData = fileContentJson.data;

  const PUSH_URL = fileContentJson._links.update.href;

  return await axios.put<any>(
    `${process.env.BASE_URL}${PUSH_URL}`,
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

export async function pushSquidexData(file) {
  try {
    const file =  process.argv[2];

    if (!file) {
      console.error("Usage: node push-squidex-data.js <file>");
      return;
    }
    
    await pushUpdatedContent(file);
    console.log(`[#] Done updating squidex content [#]`);
  } catch (err) {
    console.error('Error updating Squidex content with error:', err);
  }
}