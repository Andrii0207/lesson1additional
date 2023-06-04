const fs = require("fs/promises");
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

async function createFile(req, res, next) {
  const { fileName, content } = req.body

  const data = {
    fileName,
    content,
  };

  const result = dataValidator(data);

  if (result.error) {
    res.status(400).json({ message: `Please specifate ${result.error.details[0].path} parametr` });
    return;
  }

  const results = checkExtention(fileName);

  if (!results.result) {
    res.status(400).json({ message: `Sorry, this application doesn't support files with '${results.extention}' extention` })
    return;
  }

  try {
    await fs.writeFile(
      path.join(__dirname, "./files", fileName),
      content,
      "utf-8"
    );
    res.status(201).json({ message: "File was successfully created" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function getFiles(req, res, next) {
  try {
    const result = await fs.readdir(path.join(__dirname, "./files"));
    if (!result.length) {
      res.status(404).json({ message: "No results in this directory" })
      return;
    }
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function getFile(req, res, next) {
  const { fileName } = req.params

  try {
    const result = await fs.readdir(path.join(__dirname, "./files"));
    const findName = result.find((el) => el === fileName);
    if (!findName) {
      res.status(404).json({ message: `Not file ${fileName} in this directory ` })
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
    res.json(resultObj)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createFile, getFiles, getFile };
// module.exports = { createFile, getFiles, getFile };
