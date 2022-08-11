const request = require('request');
const fs = require('fs');
const [url, path] = process.argv.slice(2);

request(url, (err, response, body) => {
  fs.writeFile(path, body, (err) => {
    if (err) throw err;
    fs.stat(path, (err, stats) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
    });
  });
});
