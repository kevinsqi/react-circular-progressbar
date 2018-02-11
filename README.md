# React Circular Progressbar

A circular progress indicator component, built with SVG. Easily customizable with CSS. [See a live demo](http://www.kevinqi.com/react-circular-progressbar/).

[![npm version](https://badge.fury.io/js/react-circular-progressbar.svg)](https://badge.fury.io/js/react-circular-progressbar)
[![Build Status](https://travis-ci.org/iqnivek/react-circular-progressbar.svg?branch=master)](https://travis-ci.org/iqnivek/react-circular-progressbar)

[![react-circular-progressbar animated gif](/docs/react-circular-progressbar.gif?raw=true)](http://www.kevinqi.com/react-circular-progressbar/)

## Installation

Install the npm module:

```bash
npm install react-circular-progressbar
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

If not, you can copy [styles.css](dist/styles.css) into your project instead and use `<link rel="stylesheet" href="styles.css" />` in your `<head>`.

Now you can use the component:

```javascript
<CircularProgressbar percentage={60} />
```

For more in-depth examples, take a look at the [demo code](docs/demo.jsx) to see JSX for the [live demo page](http://www.kevinqi.com/react-circular-progressbar/).

## Props

| Name | Description |
| ---- | ----------- |
| `percentage` | Numeric percentage to display, from 0-100. Required. |
| `className` | Classes to apply to the svg element |
| `strokeWidth` | Width of circular line as a percentage relative to total width of component. Default: `8`. |
| `background` | Whether to display background color. Default: `false`. |
| `backgroundPadding` | Padding between background and edge of svg as a percentage relative to total width of component. Default: `0`. |
| `initialAnimation` | Toggle whether to animate progress starting from 0% on initial mount. Default: `false`. |
| `counterClockwise` | Toggle whether to rotate progressbar in counterclockwise direction. Default: `false`. |
| `classForPercentage` | Function which returns an additional class to apply to top-level svg element, which can be used for coloring/styling percentage ranges differently. Example: `(percent) => percent < 100 ? 'incomplete' : 'complete'`. |
| `textForPercentage` | Function which returns text to display, can be configured based on percentage. Example: ``(pct) => `${pct}%` ``. |
| `classes` | Object allowing overrides of classNames of each svg subcomponent (root, trail, path, text, background). Enables styling with react-jss. See [this PR](https://github.com/iqnivek/react-circular-progressbar/pull/25) for more detail. |
| `styles` | Object allowing customization of styles of each svg subcomponent (root, trail, path, text, background). |


## Customizing styles

Use plain CSS to customize the styling - the default CSS is a good starting point, but you can override it as needed.

#### CSS hooks

There are CSS hooks for the path, trail, text, and background of the progressbar which you can customize, e.g.:

```css
.CircularProgressbar-path       { stroke: red; }
.CircularProgressbar-trail      { stroke: gray; }
.CircularProgressbar-text       { fill: yellow; }
.CircularProgressbar-background { fill: green; }
```

#### Inline style hooks

There are hooks to customize the inline styles of subcomponents of the progressbar (root, path, trail, text, and background). For example, to make the path colored dynamically based on percentage:

```jsx
<CircularProgressbar
  percentage={yourPercentage}
  styles={{
    path: { stroke: `rgba(62, 152, 199, ${yourPercentage / 100})` },
  }}
/>
```

#### Using multiple themes

You can use the `className` prop to add different classes to the top-level SVG element, and then use that to add different themes to different instances, e.g.:

```javascript
<CircularProgressbar percentage={25} className="progressbar-red" />
<CircularProgressbar percentage={25} className="progressbar-blue" />
```

```css
.progressbar-red .CircularProgressbar-path { stroke: red; }
.progressbar-blue .CircularProgressbar-path { stroke: blue; }
```

#### Advanced usage

A lot of use cases can be covered with CSS. A few examples:

* [Rotating progressbar](https://github.com/iqnivek/react-circular-progressbar/issues/38)
* [Making the progressbar a gradient](https://github.com/iqnivek/react-circular-progressbar/issues/31#issuecomment-338216925)
* [Putting progressbar around an image](https://github.com/iqnivek/react-circular-progressbar/issues/32)
* [Customizing the background](https://github.com/iqnivek/react-circular-progressbar/issues/21#issuecomment-336613160)


## Development

To run demo locally on localhost:8080:

```bash
yarn install
yarn start
```

Keep tests passing by running `yarn test` and `yarn run lint`.
