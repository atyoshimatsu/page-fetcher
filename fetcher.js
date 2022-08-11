const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const [url, path] = process.argv.slice(2);

const pageFetch = (url, path) => {
  if (fs.existsSync(path)) { // edgecase 1
    rl.question('The file path already exists. Do you want to overwrite? y/n: ', (answer) => {
      if (answer === 'y') {
        requestFile(url, path);
      } else if (answer === 'n') {
        process.exit();
      } else {
        console.log('Invalid input');
        process.exit();
      }
    });
  } else {
    requestFile(url, path);
  }
};

const requestFile = (url, path) => {
  request(url, (err, response, body) => {
    if (err) {
      console.log('The URL is invalid'); //edge case 3
      process.exit();
    }
    fs.writeFile(path, body, (err) => {
      if (err) {
        console.log('The path is invalid'); //edge case 2
        process.exit();
      }
      fs.stat(path, (err, stats) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
        process.exit();
      });
    });
  });
};

pageFetch(url, path);
