# d3 reusable chart as CommonJS module

An example using a CommonJS module that exports a d3 reusable chart as [described by M. Bostock](http://bost.ocks.org/mike/chart/)

Visualization by [M. Bostock](http://bl.ocks.org/mbostock/3885304).  Data Source: [Cryptological Mathematics](http://books.google.com/books?id=dx8zM-VeKI8C&lpg=PP1&dq=LEWAND%2C%20Robert.%20Cryptological%20mathematics&pg=PA36#v=onepage&q=letter%20frequency&f=false), Robert Lewand.

This simple bar chart is constructed from a TSV file storing the frequency of letters in the English language. The chart employs [conventional margins](http://bl.ocks.org/3019563) and a number of D3 features:

* [d3.tsv](https://github.com/mbostock/d3/wiki/CSV) - load and parse data
* [d3.format](https://github.com/mbostock/d3/wiki/Formatting) - format percentages
* [d3.scale.ordinal](https://github.com/mbostock/d3/wiki/Ordinal-Scales) - *x*-position encoding
* [d3.scale.linear](https://github.com/mbostock/d3/wiki/Quantitative-Scales) - *y*-position encoding
* [d3.max](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_max) - compute domains
* [d3.svg.axis](https://github.com/mbostock/d3/wiki/SVG-Axes) - display axes

For more details see the example  [source](https://github.com/Hypercubed/Project-Chi/tree/master/dataset/example/app/components/examples/bars)
