# Markdown Notes App

A webapp I built to play with markdown syntax, constructed with create-react-app - featuring Hooks, and some external packages like react-mde, react-split, and nanoid.

## Lessons Learned

My first project using a lot extra packages, learning more about npm, and understanding how to read the package.json file. This opened up a whole new world to me about how to effectively use libraries to get polished results quickly.

This is also the first time I've persisted data using localStorage methods. With this came the small complication of using JSON.parse and JSON.stringify to "talk" to the local storage. I also learned about lazy state initialization and why it would be bad to set the initial state to an "expensive" function.

## Potential Future Features

- Save the notes to an actual database. Possibly using Node and MongoDB.

- Better mobile responsiveness. At smaller screen sizes the react-split component should change directions and allow for better screen real estate.

## Deployment

Deployed with [netlify](https://celebrated-buttercream-5795b3.netlify.app/)

## Get started

From your command line, first clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/odeliy/markdown_notes_app

# Go into the repository
$ cd markdown_notes_app

# Remove current origin repository
$ git remote remove origin
```

Then you can install the dependencies using NPM.

Using NPM:

```bash
# Install dependencies
$ npm install
```
