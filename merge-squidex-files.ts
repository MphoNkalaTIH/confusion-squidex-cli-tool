import fs from 'fs/promises';
import { diffLines, applyPatch, createTwoFilesPatch } from 'diff';

const file1 = 'output/dev/dial/policy/resume-quote-152af75e-275a-4d78-be11-ee8f7f00abc2.json';
const file2 = 'output/tokelo/dial/policy/resume-quote-f4ddd927-df19-4b19-9198-2c5ee72034b5.json';

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