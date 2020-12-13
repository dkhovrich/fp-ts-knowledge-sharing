import {contramap, eqDate, eqNumber, eqString, getStructEq} from "fp-ts/Eq";
import {getEq} from "fp-ts/ReadonlyArray";

type Avatar = {
    initials: string;
    url: string;
}

type User = {
    userId: number;
    name: string;
    birthDate: Date;
    avatar: Avatar;
}

// equals
const eqAvatar = getStructEq<Avatar>({
    initials: eqString,
    url: eqString
});

const eqUser = getStructEq<User>({
    userId: eqNumber,
    name: eqString,
    birthDate: eqDate,
    avatar: eqAvatar
});

const r1 = eqUser.equals(
    { userId: 1, name: "Peter Parker", birthDate: new Date("2000-01-01"), avatar: { initials: "PP", url: ""}},
    { userId: 1, name: "Peter Parker", birthDate: new Date("2000-01-01"), avatar: { initials: "PP", url: ""}}
    )
console.log(r1);

// contramap
const eqUserById = contramap<number, User>(user => user.userId)(eqNumber);

const r2 = eqUserById.equals(
    { userId: 1, name: "Peter Parker", birthDate: new Date("2000-01-01"), avatar: { initials: "PP", url: ""}},
    { userId: 1, name: "Gary Osborn", birthDate: new Date("2000-01-01"), avatar: { initials: "PP", url: ""}}
);

console.log(r2);

// array equals
const ar1 = [1, 2, 3];
const ar2 = [1, 2, 3];

const eqArrays = getEq(eqNumber);
const r3 = eqArrays.equals(ar1, ar2);

console.log(r3);