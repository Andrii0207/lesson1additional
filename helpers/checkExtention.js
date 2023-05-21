function checkExtention(name) {
  const EXTENTIONS = ["js", "json", "html", "css", "txt"];

  const cutExtension = name.split(".");

  const result = EXTENTIONS.includes(cutExtension[cutExtension.length - 1]);

  return { extention: cutExtension[cutExtension.length - 1], result };
}

module.exports = checkExtention;
