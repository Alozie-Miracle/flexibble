"use client"

import { useCallback, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Modal = ({ children }: { children : ReactNode }) => {
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.push('/')
    },[router])

    const handleClick = useCallback((e: React.MouseEvent) => {
        if(e.target === overlay.current && onDismiss){
            onDismiss()
        }
    }, [onDismiss, overlay])

  return (
    <div ref={overlay} className='modal' onClick={handleClick}>
        <div  onClick={onDismiss} className='absolute top-2 right-8 cursor-pointer'>
            <Image src='/close.svg' alt='close' width={17} height={17} />
        </div>

        <div ref={wrapper} className='modal_wrapper'>{children}</div>
    </div>
  )
}

export default Modal