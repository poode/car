/**
 * This file is to generate secret Key which your app will use to verfiy signture or encrypt data.
 * your .env file should has APP_SECRET='key' to replace it with this function below
 * just run node ./util/secretGenerator/secretGenerator.js
 */

const fs = require('fs');
const path = require('path');
const randomstring = require('randomstring');

const randomKey = randomstring.generate(64);

const key = Buffer.from(randomKey).toString('base64');

const file = path.resolve(process.cwd(), '.env');

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/'key'/g, key);

  fs.writeFile(file, result, 'utf8', (error) => {
    if (error) return console.log(error);
  });
});
