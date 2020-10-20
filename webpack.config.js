const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./build/index.ts",
  output: {
    filename: "./dist/bundle.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      "minecraft-protocol": path.resolve(
        __dirname,
        "node_modules/minecraft-protocol/src/index.js"
      ), // Hack to allow creating the client in a browser
      dns: path.resolve(__dirname.concat("/scripts/"), "dns.js"), // Hack to allow creating the client in a browser
      net: "net-browserify"
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^child_process$/)
  ],
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
