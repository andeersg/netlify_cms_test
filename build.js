const fs = require('fs');
const fm = require('front-matter');
const glob = require('glob');

function buildJson() {
  glob("_posts/*.md", {}, async function (er, files) {
    console.log(`Found ${files.length} files`);
    console.log(files);
    const output = [];
  
    for (let i = 0; i < files.length; i++) {
      const content = await promiseRead(files[i]);
      const raw_data = fm(content);
      output.push(Object.assign({}, raw_data.attributes, { body: raw_data.body }));
    }
    
    fs.writeFileSync('data.json', JSON.stringify(output), 'utf8');
  });
}
function promiseRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8',(err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

buildJson();
