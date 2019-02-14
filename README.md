Love Hoildays interview test 2017
----

# Test details

At loveholidays.com we run A/B tests on our website to see whether a feature change improves sales or harms sales. To do this we can update the site configuration on page load with the following: 

```
// Site configuration
var LH = window.LH || [];
LH.push('largeButtons’);
LH.push('sortByPrice');
LH.push('showRecentlyViewed');
```

Within our code base we wrap feature changes in if/else statements:
```
if (LH.isEnabled('largeButtons')) {
//use large buttons
} else {
//use original buttons
}
```

Some features (but not all) have a unique id assigned which gets added to API requests. The unique id is a single uppercase letter.

From the example above ‘sortByPrice' is assigned ‘A’ and ‘showRecentlyViewed' is assigned ‘F’. The API request looks like:

/api/example?features=AF

LH has a function named getEnabledIDs that returns the string ‘AF’ if both sortByPrice and showRecentlyViewed are enabled.

Please write and write unit tests for LH.

The LH you write will be loaded asynchronously so the site configuration (above) may run before or after LH is declared. isEnabled and getEnabledIDs will always be called after LH is declared.

Do not use any third party libraries except for unit tests. ES5 or ES6 (using Babel) are both okay. Please let us know how long you spend on this task. Good luck.

# Implementation Details

* Unit tests are run with Karma and are written using Jasmine.
* LH Module is written using ES6 and utlises babel and babel-polyfills to transpile code to ES5 in build.
* Webpack is use to handle build workflows.
* See LH module for implementation ```src/modules/LH.js```.
* See LH module unit tests ```test/LH.spec.js```.

## Installation

Run

```
npm install
```

## To run

Use npm commands to run.

To run project use
```
npm start
```

To build project disttribution files
```
npm run build
```

To run unit tests
```
npm run test
```
