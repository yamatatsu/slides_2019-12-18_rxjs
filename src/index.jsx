import React, { useState, useEffect, useCallback } from "react";
import { Subject, merge } from "rxjs";
import { scan, mapTo } from "rxjs/operators";

// Action
const increased$ = new Subject();
const decreased$ = new Subject();
// State
const state$ = merge(
  increased$.pipe(mapTo(1)),
  decreased$.pipe(mapTo(-1))
).pipe(scan((acc, n) => acc + n, 0));

// React
export default function Demo() {
  const increase = useSubject(increased$);
  const decrease = useSubject(decreased$);
  const num = useObservable(state$, 0);

  return (
    <div>
      <p>{num}</p>
      <button onClick={increase}>add 1</button>
      <button onClick={decrease}>add -1</button>
    </div>
  );
}

// custom hooks

function useObservable(observable$, initial) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    const subscription = observable$.subscribe({ next: v => setVal(v) });
    return () => subscription.unsubscribe();
  }, [observable$]);

  return val;
}

function useSubject(subject$) {
  return useCallback(val => subject$.next(val), [subject$]);
}
