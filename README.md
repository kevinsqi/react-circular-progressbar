# React Circular Progressbar

[![npm version](https://badge.fury.io/js/react-circular-progressbar.svg)](https://www.npmjs.com/package/react-circular-progressbar)
[![Build Status](https://travis-ci.org/iqnivek/react-circular-progressbar.svg?branch=master)](https://travis-ci.org/iqnivek/react-circular-progressbar)
[![Bundle size](https://img.shields.io/bundlephobia/min/react-circular-progressbar.svg)](https://bundlephobia.com/result?p=react-circular-progressbar)

A circular progressbar component, built with SVG and extensively customizable.

[Try it out on CodeSandbox](https://codesandbox.io/s/vymm4oln6y).

<a href="https://codesandbox.io/s/vymm4oln6y"><img height="120" src="/docs/animated-progressbar.gif?raw=true" alt="animated progressbar" /></a> <a href="https://codesandbox.io/s/vymm4oln6y"><img height="120" src="/docs/circular-progressbar-examples.png?raw=true" alt="progressbar examples" /></a>

## Installation

Install with yarn:

```bash
yarn add react-circular-progressbar
```

or npm:

```bash
npm install --save react-circular-progressbar
```

## Usage

Import the component:

```javascript
import CircularProgressbar from 'react-circular-progressbar';
```

If you have a CSS loader configured, you can import the stylesheet:

```javascript
import 'react-circular-progressbar/dist/styles.css';
```

If not, you can copy [styles.css](dist/styles.css) into your project instead, and include `<link rel="stylesheet" href="styles.css" />` in your `<head>`.

Now you can use the component:

```jsx
const percentage = 66;

<CircularProgressbar
  percentage={percentage}
  text={`${percentage}%`}
/>
```

## Props

[**Take a look at the CodeSandbox**](https://codesandbox.io/s/vymm4oln6y) for interactive examples on how to use these props.

| Name | Description |
| ---- | ----------- |
| `percentage` | Numeric percentage to display, from 0-100. Required. |
| `className` | Classes to apply to the svg element. Default: `''`. |
| `text` | Text to display inside progressbar. Default: `null`. |
| `strokeWidth` | Width of circular line as a percentage relative to total width of component. Default: `8`. |
| `background` | Whether to display background color. Default: `false`. |
| `backgroundPadding` | Padding between background and edge of svg as a percentage relative to total width of component. Default: `null`. |
| `initialAnimation` | Toggle whether to animate progress starting from 0% on initial mount. Default: `false`. |
| `counterClockwise` | Toggle whether to rotate progressbar in counterclockwise direction. Default: `false`. |
| `classes` | Object allowing overrides of classNames of each svg subcomponent (root, trail, path, text, background). Enables styling with react-jss. See [this PR](https://github.com/iqnivek/react-circular-progressbar/pull/25) for more detail. |
| `styles` | Object allowing customization of styles of each svg subcomponent (root, trail, path, text, background). |

Version 1.0.0 removed the `classForPercentage` and `textForPercentage` props in favor of the newer `className` and `text` props. Take a look at the [migration guide](/CHANGELOG.md) for instructions on how to migrate.

## Customizing styles

Use CSS or inline styles to customize the styling - the default CSS is a good starting point, but you can override it as needed.

#### Inline style hooks

There are hooks to customize the inline styles of each subcomponent of the progressbar (the root svg, path, trail, text, and background).

```jsx
<CircularProgressbar
  percentage={percentage}
  text={`${percentage}%`}
  styles={{
    path: { stroke: `rgba(62, 152, 199, ${percentage / 100})` },
    text: { fill: '#f88', fontSize: '16px' },
  }}
/>
```

See `StyledProgressbar.js` in the [CodeSandbox examples](https://codesandbox.io/s/vymm4oln6y) for in-depth examples on how to customize these styles.

#### CSS hooks

There are equivalent CSS hooks for the root, path, trail, text, and background of the progressbar which you can customize.

If you're importing the default styles, you can override the defaults like this:

```jsx
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';
```

```css
// custom.css
.CircularProgressbar-path       { stroke: red; }
.CircularProgressbar-trail      { stroke: gray; }
.CircularProgressbar-text       { fill: yellow; }
.CircularProgressbar-background { fill: green; }
```

#### Advanced usage

A lot of use cases can be covered with CSS. A few examples:

* [Rotating progressbar](https://github.com/iqnivek/react-circular-progressbar/issues/38)
* [Making the progressbar a gradient](https://github.com/iqnivek/react-circular-progressbar/issues/31#issuecomment-338216925)
* [Putting progressbar around an image](https://github.com/iqnivek/react-circular-progressbar/issues/32)
* [Customizing the background](https://github.com/iqnivek/react-circular-progressbar/issues/21#issuecomment-336613160)


## Contributing

Take a look at [CONTRIBUTING.md](/CONTRIBUTING.md) to see how to develop on react-circular-progressbar.


## License

[MIT](/LICENSE)
