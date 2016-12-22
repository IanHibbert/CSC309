# Lab 7: React

## Folder Structure

The project should look like this after you clone into it:

```
lab7-dev/
  README.md
  package.json
  public/
    index.html
    favicon.ico
  src/
    index.css
    index.js
    App.js
    ...
```
This setup is based on [create-react-app](https://github.com/facebookincubator/c
reate-react-app) and sets up several scripts to make it easy to get started.   It depends on some files having specific names and locations.  In particular:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

All JS and CSS files inside `src` so that Webpack (the module bundler) will see them.

## Developing Steps

At the project folder root, you can start the development server by fist installing the `npm` modules (`npm install`) and then running `npm run start` or `npm start`. The default server url is [http://localhost:3000](http://localhost:3000) (usually the browser window will open automatically).

While writing code, any modification will cause the web page to refresh (which means the state is lost. You do can enable hot reloading which the state is preserved).You will also see any lint errors in the console.

After you finished working on the project, at the project folder root, you can run `npm run build` to build the product version of your web app. This command will generate a `build` folder, which contains all necessary files to start the web app.

## New ES6 languages features

This example code contains several new features of the ES6 version of Javascript that we haven't covered in class.

### [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

Look at the first line of `App.js`.

```javascript
import React, { Component } from 'react';
```

`import` is the ES6 replacement for `require`.  ES6 Imports add new capabilities such as the ability to selectively load on the the pieces to you need.

The syntax `{ Component }` is a named export.  The `react` module exports something called `Component`, so this mechanism allows us to import just `Component` and to name it.

### [destructuring assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

You have probably seen this in other languages.  An example in this code comes from `Cart.js`

```javascript
const { items, updateQuantity } = this.props;
```

This example extracts the distinct objects `items` and `updateQuantity` from `this.props`.

The code snippet above does exactly the same thing as below:

```javascript
const items = this.props.items;
const updateQuantity = this.props.updateQuantity;
```

You will see this used in quite a few places in the code.  Another example is in the `render` method of `Item.js`:

```javascript
 const { item: { name, price, quantity } } = this.props;
```

Recall that using React, `this.props` are the props passed in from the parent component.  To see what gets passed in look at `Cart.js`.  There are a few lines of jsx that create an `Item` component.  Three variables are passed in as props: `item`, `key`, and `updateQuantity`, and if you look at what `item` is you will see that it comes from the list of `items` passed in as a prop from the Cart component.  You will see in `App.js` that a `Cart` component in created  with two props: `items`, and `updateQuantity`.  `items` comes from `this.state` defined in the constructor.

This was a long chain to follow, but the result of the above line of codes is that `name`, `price`, and `quantity` are distinct objects from the `item` object, and now we have named variables for them.

### [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

This is used to "copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object."

In the code for this lab, this assignment mechanism is most often used to 

```javascript
 style={Object.assign({}, styles.flexItem, styles.title)}
 // style becomes
 // {flexGrow: 1, flexShrink: 0, flexBasis: '50%', textAlign: 'left'}
```

Note that we are taking advantage of the order of the arguments so that the properties assigned later override those from the earlier object.


Here is a simpler example of how `Object.assign` works. If there are two variables:

```javascript
const sound1 = {
  dog: 'bark',
};

const sound2 = {
  dog: 'hi',
  cat: 'meow',
};
```

In the first case the target is the empty object `{}`, so when you write

```javascript
const sound3 = Object.assign({}, sound1, sound2);
```

You will get:

```javascript
sound3 // { dog: 'hi', cat: 'meow' }
sound1 // { dog: 'bark' }
sound1 === sound3 // false
```

In the second case the target is the object `sound1`, so when you write

```javascript
const sound4 = Object.assign(sound1, sound2);
```

You will get:

```javascript
sound4 // { dog: 'hi', cat: 'meow' }
sound1 // { dog: 'hi', cat: 'meow' }
sound1 === sound4 // true
```
Notice the difference!  We have changed the properties of `sound1`

## New concepts

### [Inline style](https://facebook.github.io/react/docs/dom-elements.html#style)

With React's move to thinking about a web application as a collection of components, there has also been a move to put styling back into the component rather than separating it out into CSS files.  Like every other software design decision, it comes with tradeoffs.  As you will see below, it is easier to see exactly which styling will apply to which components ([example](https://www.kirupa.com/react/styling_in_react.htm)).  However, some forms of styling such as pseudo-selectors and media queries don't quite fit this model.

Inline styling also makes it [difficult to use third-party styling](http://jamesknelson.com/why-you-shouldnt-style-with-javascript/) because inline styles override everything else.

Because this is a common pattern in React code, we wanted you to at least see it.  In this lab, you will not have to make any changes to it.

In `Cart.js`, you will see code like below which styles components:

```jsx
const styles = {
  container: {
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

// ...

<div style={styles.container}>
// ...

</div>
```

The CSS code is written as an object with property name as the key in camelCased and property value as the value as a string (most of the time). When you want to attach the style, you pass it to the component as `style={styles.container}`. Remember `style` should be an object. If you want to combine multiple styles (with or without overridden styles), use `Object.assign` to merge them into a single object.

### [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)

You will see template literals used in the following case:

```javascript
key={`Cart-${i}`}
```

The characters wrapped in the back ticks are treated as a string literal.  Exactly the characters between the back ticks will be included in the output, except the place holders defined by `${expression}`.

The place holders allow JavaScript expressions to be inserted into the template literal.


Instead of writing code like this:

```javascript
const name = 'Shen';
const helloSomeone = 'Hello ' + name + '!';
```

You can write code like the following.  And more importantly insert it into the JSX code in a natural way.

```javascript
const name = `Shen`;
const helloSomeone = `Hello ${name}!`;
```

Note the dollar sign `$`!

## Task:

You wills work on two components for this lab: `Price.js` and `QuantitySelect.js`.

For `Price.js`, you will implement the `render` method. The `render` method  returns a `div` containing the price given in `this.props`. So if the price is 42, this component's render method will return a `div` with text `CDN$ 42`. Some default style is provided in `this.props.style`. Use it to style the `div`. It is strongly suggested to add additional styling to it.

For `QuantitySelect.js`, implement the `onChange` callback function of the `input` element named `handleQuantityChange`. Understanding how data flows within a React application is important and the key to this part. Hint: take a close look at `updateQuantityHelp` function in `Item.js`.
