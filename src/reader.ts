import { Reader } from 'fp-ts/lib/Reader'

type Dependencies =  {
    i18n: {
        true: string
        false: string
    }
}

const instance: Dependencies = {
    i18n: {
        true: 'TRUE',
        false: 'FALSE'
    }
}

const localize = (b: boolean): Reader<Dependencies, string> => deps => (b ? deps.i18n.true : deps.i18n.false)

const isMoreThan = (n: number): Reader<Dependencies, string> => localize(n > 2)

const checkStringLocalizeLength = (s: string): Reader<Dependencies, string> => isMoreThan(s.length + 1)

console.log(checkStringLocalizeLength('foo')(instance))

// src/renderer/app/components/CommandCenter/CommandCenterViews/CommandCenterActionsView/CommandCenterActionsViewController.ts:381