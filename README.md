# React Circular Progressbar

A circular progress indicator component, built with SVG. Easily customizable with CSS. [See a live demo](http://www.kevinqi.com/react-circular-progressbar/).

[![npm version](https://badge.fury.io/js/react-circular-progressbar.svg)](https://badge.fury.io/js/react-circular-progressbar)
[![Build Status](https://travis-ci.org/iqnivek/react-circular-progressbar.svg?branch=master)](https://travis-ci.org/iqnivek/react-circular-progressbar)

[![react-circular-progressbar animated gif](/assets/react-circular-progressbar.gif?raw=true)](http://www.kevinqi.com/react-circular-progressbar/)

## Installation

Install the npm module:

```bash
npm install react-circular-progressbar
```

Include the default styles into your CSS by copying [src/styles.css](src/styles.css) into your repo.

## Usage

Import the component:

```javascript
import CircularProgressbar from 'react-circular-progressbar';
```

..and use the component in your JSX:

```javascript
<CircularProgressbar percentage={60} />
```

See the [live demo page](http://www.kevinqi.com/react-circular-progressbar/) for examples and configuration options.

## Development

To run demo locally on localhost:8080:

```bash
npm install
npm start
```

Keep CI tests passing by running `npm test` and `npm run lint` often.

Deploy updates to the demo page with `npm run deploy:demo`.
