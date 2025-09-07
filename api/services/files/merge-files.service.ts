import { applyPatch, createTwoFilesPatch } from 'diff';
import fs from 'fs/promises';

export async function mergeSquidexContentFiles(
  mergeFromFilePath: string,
  mergeIntoFilePath: string
) {
  //read both files as strings
  const content1 = await fs.readFile(mergeFromFilePath, 'utf8');
  const content2 = await fs.readFile(mergeIntoFilePath, 'utf8');

  // we need to parse the JSON content to access the data field
  const content1Json = JSON.parse(content1);
  const content2Json = JSON.parse(content2);

  //create a patch (unified diff format)
  const patch = createTwoFilesPatch(
    mergeIntoFilePath,
    mergeFromFilePath,
    JSON.stringify(content2Json.data),
    JSON.stringify(content1Json.data)
  );

  //apply the patch to content2 (mergeIntoFilePath), producing a merged version matching mergeFromFilePath
  const merged = applyPatch(JSON.stringify(content2Json.data), patch);

  //write the merged result back to file2
  if (merged) {
    content2Json.data = JSON.parse(merged);

    await fs.writeFile(mergeIntoFilePath, JSON.stringify(content2Json, null, 2), 'utf8');

    console.log(
      `Merged diff from ${mergeFromFilePath} into ${mergeIntoFilePath}, updating ${mergeIntoFilePath} to match ${mergeIntoFilePath}`
    );
  } else {
    console.error(
      `Failed to merge ${mergeFromFilePath} into ${mergeIntoFilePath}. The files may not be compatible.`
    );
    //TODO: need to implement error handling on the web page
  }
}
