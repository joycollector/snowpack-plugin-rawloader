const fs = require("fs");

module.exports = function (snowpackConfig, pluginOptions) {
  let exts = [];
  if (pluginOptions && pluginOptions.exts) {
    if (typeof pluginOptions.exts === "string") {
      exts = [pluginOptions.exts];
    } else if (Array.isArray(pluginOptions.exts)) {
      exts = [...pluginOptions.exts];
    }
  }
  exts = exts.map((e) => (e[0] === "." ? e : "." + e));
  return {
    name: "snowpack-plugin-rawloader",
    resolve: {
      input: exts,
      output: [".js"],
    },
    async load({ filePath, fileExt }) {
      const contents = fs.readFileSync(filePath, "utf-8");
      return { ".js": `export default \`${contents}\`;` };
    },
  };
};
