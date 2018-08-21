# vue-text-complexity


Simple project to try vuejs and familiarize with its ways, aiming to implement a text complexity (readability) test

Results might be sligthly unaccurate, since sentence counting is pretty complex to have (due to different punctuation rules, uses of periods in abreviations, "etc.")

Syllables count is even harder to determine, and is done using [an hyphenisation module](https://github.com/bramstein/hypher), a more accurate counting could be achieved using an implementation [this thesis about Hyphenation by computer](http://www.tug.org/docs/liang/), but most of them are too heavy to implement in such a lightweight project.

The formulas used come from [the Flesch-Kincaid readability test wikipedia page](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests)
