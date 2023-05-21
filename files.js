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

async function getFiles() {
  try {
    const result = await fs.readdir(path.join(__dirname, "./files"));
    if (!result.length) {
      console.log(chalk.red("No results in this directory"));
      return;
    }
    console.log(chalk.green(result));
  } catch (error) {
    console.log(error);
  }
}

async function getFile(fileName) {
  try {
    const result = await fs.readdir(path.join(__dirname, "./files"));
    const findName = result.find((el) => el === fileName);
    if (!findName) {
      console.log(chalk.red(`Not file ${fileName} in this directory `));
      return;
    }

    const resultFile = await fs.readFile(
      path.join(__dirname, "./files", fileName),
      "utf-8"
    );

    const extname = path.extname(path.join(__dirname, "./files", fileName));
    const basename = path.basename(
      path.join(__dirname, "./files", fileName),
      extname
    );
    const resultObj = {
      name: basename,
      extention: extname,
      content: resultFile,
    };
    console.log(resultObj);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createFile, getFiles, getFile };
