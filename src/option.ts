import * as O from "fp-ts/Option";
import * as A from "fp-ts/ReadonlyArray";
import {pipe} from "fp-ts/pipeable";
import {constant} from "fp-ts/function";
import {sequenceT} from "fp-ts/Apply";

// Create Option
console.log(O.some(1));
console.log(O.none);

console.log(O.fromNullable(1));
console.log(O.fromNullable(false));
console.log(O.fromNullable(undefined));
console.log(O.fromNullable(null));

console.log(O.of(true));
console.log(O.of(undefined));

const isEven = (n: number): boolean => n % 2 === 0;

const r1 = pipe(2, O.fromPredicate(isEven));
console.log(r1);

const r2 = pipe(1, O.fromPredicate(isEven));
console.log(r2);

// Get Option
const multiply = (a: number) => (b: number): number => a * b;

const r3 = pipe(
    [4],
    A.last,
    O.map(multiply(2))
);

console.log(r3);

// Get option value
const r4 = pipe(
    r3,
    O.getOrElse(constant(0))
    // O.toUndefined,
    // O.toNullable
    // O.fold(() => -1, v => v)
)

console.log(r4);

// State navigation example
type State = {
    selectedIndex: number,
    suggestions: string[]
};

const state: State = {
    selectedIndex: 0,
    suggestions: ["Hello", "World"]
}

const r5 = pipe(
    O.of(state),
    O.map(s => ({...s, selectedIndex: s.selectedIndex + 1})),
    O.filter(s => s.selectedIndex <= s.suggestions.length),
    O.getOrElse(constant(state))
)

console.log(r5);

// chain
function tryLocalizeNumber(n: number): O.Option<string> {
    switch (n) {
        case 1:
            return O.of("One");
        case 2:
            return O.of("Two");
        default:
            return O.none;
    }
}

const r6 = pipe(
    [1, 2, 3, 4, 5],
    A.lookup(1),
    // O.map(tryLocalizeNumber),
    O.chain(tryLocalizeNumber)
);

console.log(r6);

// Sequence
const r7 = pipe(
    sequenceT(O.option)(
        pipe([1, 2], A.head),
        pipe([1, 3], A.last)
    ),
    O.map(([head, tail]) => head + tail)
)
console.log(r7);