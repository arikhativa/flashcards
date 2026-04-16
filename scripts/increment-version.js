const fs = require('fs');
const appConfig = JSON.parse(fs.readFileSync('./app.json', 'utf-8'));

const parts = appConfig.expo.version.split('.');
parts[2] = parseInt(parts[2]) + 1;
appConfig.expo.version = parts.join('.');

fs.writeFileSync('./app.json', JSON.stringify(appConfig, null, 2));
