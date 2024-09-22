import { atom, useAtom } from 'jotai'
import { keys } from '../helpers/keys'
import { Selector } from './Selector'

type URLType = 'site' | 'page'
export const urlTypeAtom = atom<URLType>('page')
const types: Record<URLType, string> = { page: 'Page', site: 'Site' }
export const URLTypeSelector = () => {
    const [type, setType] = useAtom(urlTypeAtom)

    return (
        <div className="flex flex-row">
            {keys(types).map((key) => (
                <Selector key={key} value={key} onClick={setType} selected={type}>
                    {types[key]}
                </Selector>
            ))}
        </div>
    )
}
