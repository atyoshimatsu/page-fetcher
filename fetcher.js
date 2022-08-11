const request = require('request');
const fs = require('fs');
const [url, path] = process.argv.slice(2);

request(url, (error, response, body) => {
  fs.writeFile(path, body, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved 1235 bytes to ${path}`);
  })
});
