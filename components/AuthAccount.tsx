'use client'
import { signIn, signOut, getProviders } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Button from './Button';

type Provider = {
    id: string;
    name: string;
    type:  string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>

export const AuthAccount = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()

            setProviders(res)
            
        }

        fetchProviders();
    }, [])

    console.log(providers);

    if(providers){
        return (
            <div>{Object.values(providers).map((provider: Provider, index) => (
                <Button key={index}  type='button' handleClick={()=> signIn(provider?.id)} title='Sign In' />
            ))}</div>
        )
    }
    
    // return (
    //     <div>
    //         { session?.session?.user ? (
    //                 <>
    //                     <div className='flex items-center'>
    //                         <Image src={session?.session.user?.image} alt={session?.session?.user?.name! } width={40} height={40} className=' rounded-full object-cover cursor-pointer' onClick={() => signOut()} />
                        
                    
    //                     <Link href='/create-project'>
    //                     Share Work
    //                     </Link>
    //                     </div>
    //                 </>
    //             ) : (
    //                <button type='button' onClick={()=> signIn()}>sign in</button>
    //             )}
    //     </div>
    // )
}
