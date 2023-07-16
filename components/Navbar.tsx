import { NavLinks } from '@/Constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AuthProviders } from './AuthProviders'

interface Props {
    
}

export const Navbar = (props: Props) => {
    const session = null
    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image src='/logo.svg' width={115} height={43}  alt='flexibble'/>
                </Link>

                <ul className="xl:flex hidden text-sm gap-7">
                    { NavLinks.map(link => (
                        <Link key={link.key} href={link.href}>{link.text}</Link>
                    ))}
                </ul>
            </div>

            <div className='flexCenter gap-4'>
                { session ? (
                    <>
                        UserPhoto
                        <Link href='/create-project'>
                            <button>Share Work</button>
                        </Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}
