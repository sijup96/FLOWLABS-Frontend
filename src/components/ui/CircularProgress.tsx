import React from 'react'

const CircularProgress : React.FC<{ value: number; total: number; label: string }> = ({ value, total, label })=> (
<div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#444" strokeWidth="3" />
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4CAF50" strokeWidth="3" strokeDasharray={`${value / total * 100}, 100`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">{value}/{total}</div>
    </div>
    <div className="mt-2 text-sm">{label}</div>
  </div>
  )

export default CircularProgress
