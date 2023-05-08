const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(textPath, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
