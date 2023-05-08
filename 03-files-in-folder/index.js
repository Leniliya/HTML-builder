const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.promises.readdir(folderPath, { withFileTypes: true })
  .then(arr => {
    arr.forEach(item => {
      if (item.isFile()) {
        const filePath = path.join(__dirname, 'secret-folder', item.name);
        const [name] = path.basename(filePath).split('.');
        const ext = path.extname(filePath).slice(1);
        fs.promises.stat(filePath)
          .then(res => {
            const size = ((res.size) / 1024);
            console.log(`${name} - ${ext} - ${size}kb`);
          });
      }
    });
  });
