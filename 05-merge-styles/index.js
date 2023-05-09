const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');
const output = fs.createWriteStream(bundlePath);

fs.promises.readdir(stylesPath)
  .then(arr => {
    arr.forEach(item => {
      const filePath = path.join(stylesPath, item);
      const ext = path.extname(filePath);
      if (ext === '.css') {
        const input = fs.createReadStream(filePath);
        input.on('data', data => {
          output.write(data + '\n');
        });
      }
    });
  });
