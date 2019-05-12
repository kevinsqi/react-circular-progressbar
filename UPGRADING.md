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
