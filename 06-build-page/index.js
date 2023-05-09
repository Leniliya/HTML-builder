const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const copyAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const stylesBundlePath = path.join(__dirname, 'project-dist', 'style.css');
const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const indexHtmlPath = path.join(distPath, 'index.html');
let templateStr = '';

fs.promises.mkdir(distPath, { recursive: true })
  .then(() => {
    const input = fs.createReadStream(templatePath, 'utf-8');
    input.on('data', data => {
      templateStr = data;
      fs.promises.readdir(componentsPath, { withFileTypes: true })
        .then(arr => {
          arr.forEach(item => {
            const [itemName, ext] = item.name.split('.');
            if (ext === 'html') {
              const itemStream = fs.createReadStream(path.join(componentsPath, item.name), 'utf-8');
              let itemContent;
              itemStream.on('data', data => {
                itemContent = data;
                templateStr = templateStr.replace(`{{${itemName}}}`, itemContent);
                fs.writeFile(indexHtmlPath, templateStr, (err) => {
                  if (err) {
                    console.log(err.message);
                  }
                });
              });
            }
          });
        });
    });
  }).then(() => {
    fs.promises.readdir(stylesPath)
      .then(arr => {
        const output = fs.createWriteStream(stylesBundlePath);
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
  }).then(() => {
    copyFolder(assetsPath, copyAssetsPath);
  });


function copyFolder(origPath, copyPath) {
  fs.promises.mkdir(copyPath, { recursive: true });
  fs.promises.readdir(origPath, { withFileTypes: true })
    .then(arr => {
      arr.forEach(item => {
        if (item.isFile()) {
          fs.rm(copyPath, { recursive: true, force: true }, () => {
            fs.promises.mkdir(copyPath, { recursive: true });
            const itemPath = path.join(origPath, item.name);
            const copyItemPath = path.join(copyPath, item.name);
            fs.promises.copyFile(itemPath, copyItemPath);
          });
        } else {
          const itemPath = path.join(origPath, item.name);
          const copyItemPath = path.join(copyPath, item.name);
          copyFolder(itemPath, copyItemPath);
        }
      });
    });
}
