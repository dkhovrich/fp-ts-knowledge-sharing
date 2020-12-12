import {flow, pipe} from "fp-ts/function";

const getLength = (str: string): number => str.length;

const multiply = (a: number) => (v: number) => a * v;

// pipe
const r1 = pipe("Hello, World!", getLength, multiply(2));
console.log(r1);

// flow
const f = flow(getLength, multiply(2));
const r2 = f("Hello, World!");
console.log(r2);