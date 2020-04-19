import React, { Fragment, useEffect, useRef, useState } from 'react'

export const Animator = ({
    children,
    shouldPlay = false,
    shouldPlayInReverse = false,
    shouldStopOnLastFrame = true,
    onComplete = () => {},
    interval = 1000 / 15,
    width,
}) => {
    const start = useRef(Date.now())
    const animation = useRef()
    const offset = useRef(0)

    const [renderOffset, setRenderOffset] = useState(offset.current)

    const animate = () => {
        let shouldStop = false

        const now = Date.now()
        const elapsed = now - start.current

        if (elapsed > interval) {
            start.current = now - (elapsed % interval)

            if (shouldPlayInReverse) {
                offset.current += 64
            } else {
                offset.current -= 64
            }

            if (Math.abs(offset.current) >= width - 64) {
                if (!shouldStopOnLastFrame) {
                    offset.current = 0
                } else {
                    shouldStop = true
                }
            }

            if (Math.abs(offset.current) <= 0) {
                if (!shouldStopOnLastFrame) {
                    offset.current = width - 64
                } else {
                    shouldStop = true
                }
            }
        }

        setRenderOffset(offset.current)

        if (!shouldStop) {
            animation.current = requestAnimationFrame(animate)
        } else {
            onComplete()
        }
    }

    useEffect(() => {
        if (!shouldPlay) {
            return
        }

        animation.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animation.current)
    }, [shouldPlay, shouldPlayInReverse, shouldStopOnLastFrame])

    return <Fragment>{children(renderOffset)}</Fragment>
}
