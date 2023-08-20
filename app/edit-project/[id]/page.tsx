import { ProjectInterface } from '@/common.types'
import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'
import { getProjectDetails } from '@/lib/actions'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const EditProject = async ({ params : { id }}: { params : { id : string }}) => {
    const session = await getCurrentUser();
    if(!session?.user) redirect('/')
    
    const results = await getProjectDetails(id) as { project : ProjectInterface}

    console.log(results);
    

  return (
    <Modal>
        <h3 className='modal-head-text'>Edit Project</h3>

        <ProjectForm type='edit' session={session} project={results?.project} />
    </Modal>
  )
}

export default EditProject