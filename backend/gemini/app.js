const askPrompt=require('./config.js');

const fs = require('fs');

const template = fs.readFileSync('./template.txt', 'utf8');
const resumeData = fs.readFileSync('./resumedata.txt', 'utf8');
let prompt="modifiy the below resume with the following data, make sure it looks aesthically similar and you can appropriately expand some of the descriptions & a minimal formatting wherever necessary.You can remove empty sections also . Respond with strictly the code only\n"+"template:\n"+template+"Data:\n"+resumeData;
askPrompt(prompt);