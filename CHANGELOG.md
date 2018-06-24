## 1.0.0

We're at 1.0.0! 🎉  Thank you to all the contributors and issue creators.

The main breaking change is the replacement of the `classForPercentage` prop with `className`, and the `textForPercentage` prop with `text` [#61].

**How to migrate**:

Previously, the text would by default display as "{yourPercentage}%". With 1.0, if you want to display that text, you need to supply the `text` prop explicitly:

```jsx
const percentage = 60;

<CircularProgressbar
  percentage={percentage}
  text={`${percentage}%`}
/>
```

If you had customized either `classForPercentage` or `textForPercentage` functions before 1.0, you can reuse the same function for `className` and `text`.

So if your pre-1.0 usage looked like this:

```jsx
function customClassForPercentage(percentage) {
  if (percentage < 50) {
    return 'red';
  } else {
    return 'blue';
  }
}

function customTextForPercentage(percentage) {
  if (percentage === 100) {
    return `${percentage}!!!`;
  } else {
    return `${percentage}%`;
  }
}

const percentage = 60;

<CircularProgressbar
  percentage={percentage}
  classForPercentage={customClassForPercentage}
  textForPercentage={customTextForPercentage}
/>
```

...you can make a small change to make it work in 1.0:

```jsx
<CircularProgressbar
  percentage={percentage}
  className={customClassForPercentage()}
  text={customTextForPercentage()}
/>
```

## 0.8.1

* Use styles.root style hook properly [#60]

## 0.8.0

* Check in build files to `/dist` and enable importing styles from `dist/styles.css` [#40] [#45]

## 0.7.0

* Add `styles` prop for customizing inline styles [#42]

## 0.6.0

* Add `counterClockwise` prop for having progressbar go in opposite direction [#39]

## 0.5.0

* Add `classes` prop for customizing svg element classNames [#25]

## 0.4.1

* Don't render <text> when textForPercentage is falsy

## 0.4.0

* Add `background` prop, fix black circle issue for upgrading without new CSS

## 0.3.0

* Support custom background colors and added `backgroundPadding` prop [#23]

## 0.2.2

* Allow react 16 as a peerDependency

## 0.2.1

* Restrict percentages to be between 0 and 100
* Fix "undefined" className when it's unset

## 0.2.0

* Adds `className` prop to customize component styles

## 0.1.5

* Fixes 'calling PropTypes validators directly' issue caused by prop-types package by upgrading to 15.5.10+

## 0.1.4

* Fixes React PropTypes import warning by using prop-types package
* Upgrades devDependencies

## 0.1.3

* Fix errors when component is unmounted immediately [#1]

## 0.1.2

* Tweak initialAnimation behavior
* Fix package.json repo URL

## 0.1.1

* Remove unused dependencies

## 0.1.0

* Initial working version
