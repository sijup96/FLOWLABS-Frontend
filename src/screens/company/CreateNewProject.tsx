import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const CreateNewProject = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Pending');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
          projectName,
          description,
          assignedTo,
          startDate,
          endDate,
          priority,
          status,
        });
      };
      const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-white mb-2">Project Name</label>
              <Input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
                className="w-full bg-white bg-opacity-50 placeholder-gray-500 text-gray-900"
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-white mb-2">Add Resource To</label>
              <Input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assigned to (e.g., John Doe)"
                required
                className="w-full bg-white bg-opacity-50 placeholder-gray-500 text-gray-900"
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                required
                className="w-full mt-1 p-2 bg-white bg-opacity-50 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900"
                rows={4}
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium text-white mb-2">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full bg-white bg-opacity-50 text-gray-900"
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              <label className="block text-sm font-medium text-white mb-2">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full bg-white bg-opacity-50 text-gray-900"
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <label className="block text-sm font-medium text-white mb-2">Priority</label>
              <Select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-white bg-opacity-50 text-gray-900">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
              <label className="block text-sm font-medium text-white mb-2">Status</label>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white bg-opacity-50 text-gray-900">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button type="submit" className="px-8 py-3 bg-white text-green-800 rounded-full hover:bg-opacity-95 transition-colors duration-300">
              Create Project
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateNewProject
