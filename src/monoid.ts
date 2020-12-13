import {pipe} from "fp-ts/function";
import {fold, monoidAll, monoidSum} from "fp-ts/Monoid";

// Fold
const r1 = pipe(
    [1, 2, 3, 4, 5],
    fold(monoidSum),
);
console.log(r1);

const r2 = pipe(
    [true, false],
    fold(monoidAll),
    // fold(monoidAny)
);
console.log(r2);

// RxJs
// src/renderer/app/components/SystemActions/ThreadActions/OpenThreadAction/OpenThreadAction.ts:26

// Fold functions
// src/renderer/app/components/MessageComposer/Composer/Recipients/EmailListInput/EmailListInput.ts:369

// getFirstMonoid
// renderer/app/components/MessageComposer/Composer/Recipients/EmailListInput/EmailListInput.ts:223