const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

async function createFile(fileName, content) {
  const data = {
    fileName,
    content,
  };

  const result = dataValidator(data);

  if (result.error) {
    console.log(
      chalk.red(`Please specifate ${result.error.details[0].path} parametr`)
    );
    return;
  }

  const res = checkExtention(fileName);

  if (!res.result) {
    console.log(
      chalk.red(
        ` Sorry, this application doesn't support files with '${res.extention}' extention `
      )
    );
    return;
  }

  try {
    await fs.writeFile(
      path.join(__dirname, "./files", fileName),
      content,
      "utf-8"
    );
    console.log(chalk.blue("File was successfully created"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createFile };

// {node
//   message: '"content" must be a string',
//   path: [ 'content' ],
//   type: 'string.base',
//   context: { label: 'content', value: true, key: 'content' }
// }
