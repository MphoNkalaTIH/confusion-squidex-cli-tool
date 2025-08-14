import fs from 'fs/promises';
import {applyPatch, createTwoFilesPatch } from 'diff';

const file1 =  process.argv[2]
const file2 = process.argv[3]

//read both files as strings
const content1 = await fs.readFile(file1, 'utf8');
const content2 = await fs.readFile(file2, 'utf8');

//create a patch (unified diff format)
const patch = createTwoFilesPatch(file2, file1, content2, content1);

//apply the patch to content2 (file2), producing a merged version matching file1
const merged = applyPatch(content2, patch);

//write the merged result back to file2
if(merged){
    await fs.writeFile(file2, merged, 'utf8');
    console.log(`Merged diff from ${file1} into ${file2}, updating ${file2} to match ${file1}`);
}
else{
    console.error(`Failed to merge ${file1} into ${file2}. The files may not be compatible.`);
    process.exit(1);
}