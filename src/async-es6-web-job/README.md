# Example NodeJS WebJob task for Azure with Async/Await taks

This example uses ES6 Async/Await features with TypeScript 1.7.
To run this example on Azure - which supports Node 4.2.*, Babel is used to transpile TypeScript ES6 to ES5.

> This example requires Node runtime 4 and TypeScript 1.7!!!

## Documentation

```
npm install
```

```
gulp watch
```

To just compile output:
```
gulp babel
```

To prepare Azure distribution archive (`webjob.zip`):
```
gulp dist
```
## Requirements

- Node 4.*
- TypeScxript 1.7
- Babel 6

## Author

@peterblazejewicz