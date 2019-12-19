const { of } = require("rxjs");
const { scan, map } = require("rxjs/operators");

of(1, 2, 3)
  .pipe(
    map(n => n * 2),
    scan((acc, n) => acc + n, 0)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log("complete"),
  });

// 1
// 3
// 6
// complete
