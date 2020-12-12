import {contramap, getDualOrd, ordDate} from "fp-ts/Ord";
import {sort} from "fp-ts/ReadonlyArray";
import {pipe} from "fp-ts/pipeable";

type User = {
    name: string
    birthDate: Date
}

const users: User[] = [
    { name: 'Peter Parker', birthDate: new Date("1988-01-01") },
    { name: 'Garry Osborn', birthDate: new Date("1987-01-01") },
    { name: 'Norman Osborn', birthDate: new Date("1960-01-01") }
];

const asc = contramap<Date, User>(user => user.birthDate)(ordDate);
const desc = getDualOrd(asc);

const r1 = pipe(users, sort(asc));
console.log(r1);

const r2 = pipe(users, sort(desc));
console.log(r2);