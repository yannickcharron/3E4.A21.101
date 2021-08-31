import chalk from 'chalk';
// const chalk = require('chalk'); équivalent à la ligne 1

import app from './src/app.js';

console.log(chalk.green('Du texte en vert'));

const PORT = 5000;

app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port: ${PORT}`));
});