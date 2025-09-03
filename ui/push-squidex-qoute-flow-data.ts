import axios from "axios";
import fs from 'fs/promises';
import 'dotenv/config';

async function pushUpdatedContent(file: string, contentId: string): Promise<void | null> {
  const fileContent = await fs.readFile(file, 'utf8');
  const fileContentData = JSON.parse(fileContent).data;

  const UPDATE_SECTION = `${process.env.DEV_QOUTE_FLOW_URL}/${contentId}`;

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
    const file =  process.argv[2];
    const contentId = process.argv[3];
    console.log(`Pushing updated content for content ID: ${contentId} from file: ${file}`);
    
    await pushUpdatedContent(file, contentId);
    console.log("[#] Done updating squidex components [#]");
  } catch (err) {
    console.error('Error updating Squidex content with error:', err);
  }
})();