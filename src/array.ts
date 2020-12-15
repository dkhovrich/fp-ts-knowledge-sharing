import {pipe} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import * as R from "fp-ts/Record";
import {toUndefined} from "fp-ts/Option";
import {eqNumber, eqString, getStructEq} from "fp-ts/Eq";

const r0 = pipe(1, A.of);
console.log(r0);

const localization: Record<number, string> = {
    1: "One",
    2: "Two"
};

const r1 = pipe(
    [1, 3, 2, 4],
    A.map(i => R.lookup(i.toString(), localization)),
    // A.compact
);

console.log(r1);

// update
const r2 = pipe(
    [1, 2, 3],
    A.updateAt(1, 10),
    toUndefined
);
console.log(r2);

// modify
type User = {
    id: number;
    name: string;
}

const users: User[] = [{ id: 1, name: "Peter Parker"}, {id: 2, name: "Garry Osborn"}];

const r3 = pipe(
    users,
    A.modifyAt(0, u => ({...u, name: "Miles Morales"})),
    toUndefined
);

console.log(r3);

// elem
const eqUser = getStructEq<User>({
    id: eqNumber,
    name: eqString
});

const spiderMan: User = { id: 1, name: "Peter Parker"};
const r4 = pipe(users, A.elem(eqUser)(spiderMan));
console.log(r4);