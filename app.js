import React, { useCallback, useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { Chest1, Sword1 } from './components'

const App = () => {
    const [chestStatus, setChestStatus] = useState(Chest1.Status.Closed)
    const [swordStatus, setSwordStatus] = useState(Sword1.Status.Small)

    const listener = e => {
        if (e.key === 'o') {
            setChestStatus(Chest1.Status.Open)
        }

        if (e.key === 'c') {
            setSwordStatus(Sword1.Status.Small)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', listener)
        return () => window.removeEventListener('keydown', listener)
    }, [])

    const onChestAnimationComplete = useCallback(() => {
        if (chestStatus === Chest1.Status.Open) {
            setTimeout(() => setSwordStatus(Sword1.Status.Large), 250)
        }
    }, [chestStatus])

    const onSwordAnimationComplete = useCallback(() => {
        if (swordStatus === Sword1.Status.Small) {
            setTimeout(() => setChestStatus(Chest1.Status.Closed), 150)
        }
    }, [swordStatus])

    return (
        <div className="absolute inset-0">
            <Chest1
                status={chestStatus}
                onComplete={onChestAnimationComplete}
                style={{ top: '50%', left: '50%', marginLeft: -32, marginTop: -32 }}
            />
            <Sword1
                status={swordStatus}
                onComplete={onSwordAnimationComplete}
                style={{ top: '50%', left: '50%', marginLeft: -32, marginTop: -32 }}
            />
        </div>
    )
}

render(<App />, document.querySelector('.app'))
