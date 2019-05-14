# Migration guide

## 1.x.x to 2.0.0

**Use a named import to import `CircularProgressbar`**

Before:

```jsx
import CircularProgressbar from 'react-circular-progressbar';
```

After:

```jsx
import { CircularProgressbar } from 'react-circular-progressbar';
```

**Use `props.value` instead of `props.percentage`**

Before:

```jsx
<CircularProgressbar percentage={66} />
```

After:

```jsx
<CircularProgressbar value={66} />
```

**Replace `props.initialAnimation` with a setTimeout value transition**

This is only applicable if you're using `props.initialAnimation`, which is removed in v2.0.0. Instead, you must trigger the animation by changing `value` from one value to another yourself.

Before:

```jsx
<CircularProgressbar percentage={66} initialAnimation />
```

After:

In order to trigger the default CSS animation on mount, you'll need to change `props.value` from 0 to your desired value with a `setTimeout` in `componentDidMount`. You can use a wrapper component to help manage this like [ProgressProvider.js in this Codesandbox](https://codesandbox.io/s/0zk372m7l). Then you can do:

```jsx
<ProgressProvider valueStart={0} valueEnd={66}>
  {(value) => <CircularProgressbar value={value} />}
</ProgressProvider>
```

## 0.x.x to 1.0.0

The main breaking change is the replacement of the `classForPercentage` prop with `className`, and the `textForPercentage` prop with `text` [#61].

**How to migrate**:

Previously, the text would by default display as "{yourPercentage}%". With 1.0, if you want to display that text, you need to supply the `text` prop explicitly:

```jsx
const percentage = 60;

<CircularProgressbar percentage={percentage} text={`${percentage}%`} />;
```

If you had customized either `classForPercentage` or `textForPercentage` functions before 1.0, you can reuse the same function for `className` and `text`. But instead of passing the function as a prop, you now need to pass the called function's value.

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
  classForPercentage={customClassForPercentage} // pass function
  textForPercentage={customTextForPercentage} // pass function
/>;
```

...you can make a small change to make it work in 1.0 by using the new props and calling the functions instead:

```jsx
<CircularProgressbar
  percentage={percentage}
  className={customClassForPercentage(percentage)} // call function directly
  text={customTextForPercentage(percentage)} // call function directly
/>
```
