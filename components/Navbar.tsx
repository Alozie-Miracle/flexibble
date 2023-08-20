import { NavLinks } from '@/Constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { signOut } from 'next-auth/react'
import { getCurrentUser } from '@/lib/session'
import { AuthAccount } from './AuthAccount'
import ProfileMenu from './profileMenue'
interface Props {
    
}

export const Navbar = async (props: Props) => {
    const  session = await getCurrentUser();
    
    
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
                {session?.user ? (
                    <>
                    {/* {session?.user?.image && (

                        <Image src={session?.user?.image} alt={session?.user?.name! } width={40} height={40} className='rounded-full object-cover cursor-pointer' />
                    
                    )} */}

                    <ProfileMenu session={session} />
                    
                        <Link href='/create-project'>
                        Share Work
                        </Link>
                    </>
                ) : (
                    <AuthAccount  />
                )}
            </div>
        </nav>
    )
}
