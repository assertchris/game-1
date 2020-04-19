import React, { useEffect, useState, useRef } from 'react'
import { Animator } from './animator'

import backgroundImage from '../sprites/sword-1.png'

export const Sword1 = ({ status = 'closed', onComplete = () => {}, style = {} }) => {
    if (status === Sword1.Status.Hidden) {
        return null
    }

    const [state, setState] = useState({
        shouldPlay: false,
        shouldPlayInReverse: false,
    })

    const previousStatus = useRef('closed')

    useEffect(() => {
        let shouldPlay = state.shouldPlay
        let shouldPlayInReverse = state.shouldPlayInReverse

        if (status === previousStatus.current) {
            shouldPlay = false
            return
        }

        if (status === Sword1.Status.Large) {
            shouldPlay = true
            shouldPlayInReverse = false
        }

        if (status === Sword1.Status.Small) {
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
            width={11 * 64}
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

Sword1.Status = {
    Small: 'small',
    Large: 'large',
    Hidden: 'hidden',
}
