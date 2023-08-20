import React from 'react'
import { getUserProjects } from '@/lib/actions'
import { UserProfile } from '@/common.types'
import ProfilePage from '@/components/ProfilePage'

type Props = {
    params: {
        id: string
    }
}

const Profile = async  ({ params : { id }}: Props) => {

    const result = await getUserProjects(id, 100) as { user: UserProfile }

    if(!result?.user) {
        <p className='no-result-text'>Failed to fetch user info</p>
    }

  return (
    <ProfilePage user={result?.user} />
  )
}

export default Profile