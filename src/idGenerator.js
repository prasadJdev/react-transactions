function* generator() {
  var i = 292012;
  while (true) {
    yield i;
    i += Math.floor(Math.random() * 10000);
  }
}

export const idGenerator = generator();