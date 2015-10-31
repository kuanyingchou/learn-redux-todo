# webpack --module-bind babel --watch index.js bundle.js
webpack --module-bind "js=babel" --watch --devtool source-map index.js bundle.js
