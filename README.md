# React Circular Progressbar

A circular progress indicator component, built with SVG. Easily customizable with CSS.

[![Build Status](https://travis-ci.org/iqnivek/react-circular-progressbar.svg?branch=master)](https://travis-ci.org/iqnivek/react-circular-progressbar)

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

See [demo.jsx](demo/demo.jsx) for more usage examples.

## Development

To run demo locally on localhost:8080:

```bash
npm install
npm start
```

Keep CI tests passing by running `npm test` and `npm run lint` often.

Deploy updates to the demo page with `npm run deploy:demo`.
