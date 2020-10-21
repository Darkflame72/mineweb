const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      "minecraft-protocol": path.resolve(
        __dirname,
        "node_modules/minecraft-protocol/src/index.js"
      ), // Hack to allow creating the client in a browser
      dns: path.resolve(__dirname.concat("/src/scripts/"), "dns.js"), // Hack to allow creating the client in a browser
      net: "net-browserify"
    }
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'inline-source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        babylon: {
          chunks: "initial",
          test: /babylonjs/,
          filename: "babylon.js"
        }
      }
    }
  },
};
