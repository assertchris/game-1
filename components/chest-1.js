import React, { useEffect, useState, useRef } from 'react'
import { Animator } from './animator'

import backgroundImage from '../sprites/chest-1.png'

export const Chest1 = ({ status = Chest1.Status.Closed, onComplete = () => {}, style = {} }) => {
    if (status === Chest1.Status.Hidden) {
        return null
    }

    const [state, setState] = useState({
        shouldPlay: false,
        shouldPlayInReverse: false,
    })

    const previousStatus = useRef(Chest1.Status.Closed)

    useEffect(() => {
        let shouldPlay = state.shouldPlay
        let shouldPlayInReverse = state.shouldPlayInReverse

        if (status === previousStatus.current) {
            shouldPlay = false
            return
        }

        if (status === Chest1.Status.Open) {
            shouldPlay = true
            shouldPlayInReverse = false
        }

        if (status === Chest1.Status.Closed) {
            shouldPlay = true
            shouldPlayInReverse = true
        }

        previousStatus.current = status

        setState(state => ({
            ...state,
            shouldPlay,
            shouldPlayInReverse,
        }))
    }, [status])

    return (
        <Animator
            shouldPlay={state.shouldPlay}
            shouldPlayInReverse={state.shouldPlayInReverse}
            onComplete={onComplete}
            width={6 * 64}
        >
            {offset => (
                <div
                    className="sprite"
                    style={{
                        ...style,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPositionX: offset,
                    }}
                />
            )}
        </Animator>
    )
}

Chest1.Status = {
    Open: 'open',
    Closed: 'closed',
    Hidden: 'hidden',
}
