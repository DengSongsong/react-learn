function compose(fns) {
  if (fns.length == 0) {
    return arg => arg;
  }
  if (fns.length == 1) {
    return fns[0];
  }

  return fns.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
}

function compose2(middles) {
  // var
}

compose([fn1(), fn3(), fn4(), fn2()]);

function fn1() {
  console.log("fn1");
}

function fn2() {
  console.log("fn2");
}

function fn3() {
  console.log("fn3");
}

function fn4() {
  console.log("fn4");
}
