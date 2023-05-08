const fs = require('fs');
const path = require('path');
const filesPath = path.join(__dirname, 'files');
const copyFilesPath = path.join(__dirname, 'files-copy');

fs.rm(copyFilesPath, { recursive: true, force: true }, () => {
  fs.promises.mkdir(copyFilesPath, { recursive: true })
    .then(
      fs.promises.readdir(filesPath)
        .then(arr => {
          arr.forEach(item => {
            const itemPath = path.join(filesPath, item);
            const copyItemPath = path.join(copyFilesPath, item);
            fs.promises.copyFile(itemPath, copyItemPath);
            console.log(copyItemPath);
          });
        }));
});
