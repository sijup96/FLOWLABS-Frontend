import ProjectCard from '@/components/company/ProjectCard'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useDomain } from '@/hooks/useDomain'
import React from 'react'
import { Link } from 'react-router-dom'

const Projects = () => {
    const {domain,loading}=useDomain()
    if(loading) return <div><LoadingSpinner/></div>
  return (
    <div>
     <div className='bg-gray-300 flex justify-between p-4'>
      <h1 className='font-extrabold'>Projects</h1>
      <Link to={`/c/${domain}/projects/create`}>
      <Button>Create new Projects</Button>
      </Link>
      </div>
    <ProjectCard/>
    </div>

  )
}

export default Projects
