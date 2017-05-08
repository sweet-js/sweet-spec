sed '1,2d' src/term-spec.js > dist/term-spec.js.flow;
echo "// @flow\n" | cat - dist/term-spec.js.flow > out.js;
echo "\n" >> out.js;
mv out.js dist/term-spec.js.flow;
