import {pipe, tuple, tupled} from "fp-ts/function";
import * as RE from "fp-ts-contrib/RegExp";
import * as O from "fp-ts/Option";

type Recipient = {
    id: string;
    name: string;
    email: string;
}

const createRecipient = (name: string, email: string): Recipient => ({
    name,
    email,
    id: "123"
})

const pattern = new RegExp(`["']?(.*[^\\s"'])["']?\\s+[<("'](.+)[>)"']`);

const r1 = pipe(
    "Dmitriy Khovrich <dkhovrich@readdle.com>",
    RE.match(pattern),
    O.map(([, name, email]) => tuple(name, email)),
    O.map(tupled(createRecipient)),
    O.toUndefined
)

console.log(r1);