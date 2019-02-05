const fs = require('fs');
const data = require('./data.json');

if (!fs.existsSync('./_site')){
  fs.mkdirSync('./_site');
}

const posts = data.reduce((acc, value) => {
  acc += `<li>${value.title}</li>`;
  return acc;
}, '');

const content = `
<html>
  <head>
    <title>Netlify CMS Test</title>
  </head>
  <body>
    <h1>Test of Netlify CMS</h1>
    <ul>
      ${posts}
    </ul>
  </body>
</html>
`;

fs.writeFileSync('./_site/index.html', content, 'utf8');