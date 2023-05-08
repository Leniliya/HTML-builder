const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;
const textPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(textPath);

stdout.write('Hello, write something:\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Thanks, bye)');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Thanks, bye)');
  process.exit();
});
