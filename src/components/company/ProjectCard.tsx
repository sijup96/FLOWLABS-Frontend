import { ProjectProps } from '@/interface/company/I_company'
import { Button } from '../ui/button'


const ProjectCard = (data:ProjectProps) => {
  return (
    <div className='bg-gray-300 p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-6'>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-2xl font-bold'>Project Name{data.projectName}</h2>
      <Button variant='outline'>Edit</Button>
    </div>
    <div className='grid grid-cols-2 gap-4'>
      {/* Description */}
      <div>
        <h3 className='font-semibold text-gray-600'>Description</h3>
        <p className='text-gray-700'>This is a brief project description.</p>
      </div>

      {/* Assigned */}
      <div>
        <h3 className='font-semibold text-gray-600'>Assigned To</h3>
        <p className='text-gray-700'>John Doe</p>
      </div>

      {/* Start Date */}
      <div>
        <h3 className='font-semibold text-gray-600'>Start Date</h3>
        <p className='text-gray-700'>2024-10-01</p>
      </div>

      {/* End Date */}
      <div>
        <h3 className='font-semibold text-gray-600'>End Date</h3>
        <p className='text-gray-700'>2024-12-01</p>
      </div>

      {/* Priority */}
      <div>
        <h3 className='font-semibold text-gray-600'>Priority</h3>
        <p className='text-gray-700'>High</p>
      </div>

      {/* Status */}
      <div>
        <h3 className='font-semibold text-gray-600'>Status</h3>
        <p className='text-gray-700'>In Progress</p>
      </div>
    </div>

    {/* Actions */}
    <div className='mt-6 flex justify-end space-x-2'>
      <Button variant='outline'>Complete</Button>
      <Button variant='destructive'>Delete</Button>
    </div>
  </div>
  )
}

export default ProjectCard
