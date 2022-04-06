const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const dist = path.resolve(__dirname, "docs");

module.exports = () => ({
  mode: "production",
  entry: {
    "index.js": "./src/index.ts",
  },
  output: {
    filename: "[name]",
    publicPath: "/",
    path: dist,
  },
  resolve: {
    extensions: [".js", ".scss", ".sass", ".ts"],
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(gif|ttf|eot|svg|woff2?)$/,
        use: "url-loader?name=[name].[ext]",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "app.css" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "static/", to: dist }],
    }),
  ],
});
