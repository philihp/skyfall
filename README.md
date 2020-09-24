![Tests](https://github.com/philihp/skyfall/workflows/tests/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/philihp/skyfall/badge.svg?branch=master&force=reload)](https://coveralls.io/github/philihp/skyfall?branch=master)

Source code the [d2tp](https://www.data2thepeople.org) donation optimization website.

In `setup/config`, you can set the fields you want to build filters for to generate a dropdown menu for each possible option. Specify `numBuckets` to created a bucketed filter. `SCATTERPLOT_X_FIELD` and `SCATTERPLOT_Y_FIELD` are used to adjust the fields used in the scatterplot.

## Getting Started

1. `git clone https://github.com/philihp/skyfall.git`
2. `npm install`
3. `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Thanks

![Vercel](./public/vercel.svg)
