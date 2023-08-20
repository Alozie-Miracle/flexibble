'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

type Props = {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {

    const [randomeLikes, setrandomeLikes] = useState(0);
    const [randomeViews, setrandomeViews] = useState('');

    useEffect(() => {
        setrandomeLikes(Math.floor(Math.random() * 1000 ))
        setrandomeViews(String((Math.floor(Math.random() * 1000 ) / 1000 ).toFixed(1) + 'k'))
    }, [])

  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
      <Link href={`/project/${id}`} className='flexCenter group w-full relative h-full'>
        <Image src={image} alt={title} width={414} height={313} className='w-full h-full object-cover rounded-2xl' />

        <div className='hidden group-hover:flex profile_card-title'>
            <p className='w-full'>{title}</p>
        </div>
      </Link>
      <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
        <Link href={`/profile/${userId}`}>
            <div className='flexCenter gap-2'>
                <Image src={avatarUrl} width={24} height={24} className='rounded-full'  alt='Profile Image'/>
                <p>{name}</p>
            </div>
        </Link>

        <div className='flexCenter gap-3'>
            <div className='flexCenter gap-2'>
                <Image src='/hearth.svg' alt='heart' width={13} height={12} />
                <p className='text-sm'>{randomeLikes}</p>
            </div>
        </div>
        <div className='flexCenter gap-3'>
            <div className='flexCenter gap-2'>
                <Image src='/eye.svg' alt='heart' width={13} height={12} />
                <p className='text-sm'>{randomeViews}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
