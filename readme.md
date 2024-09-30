###
npm run


###
mkdir my-react-app
cd my-react-app

# npm init -y

# src/index.js:
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

#  src/App.js:
import React from 'react';

function App() {
  return <h1>Hello, React!</h1>;
}

export default App;


# c. public/index.html:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>

# webpack.config.js:
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
  },
};


# .babelrc:
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

# package.json

"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}















"""



# basicReactApp
