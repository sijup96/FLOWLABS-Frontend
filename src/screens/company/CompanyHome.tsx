import AttendanceSummary from '@/components/company/AttendanceSummary'
import CircularProgress from '@/components/ui/CircularProgress'

const CompanyHome = () => {

  return (
    <div className="flex h-screen bg-gray-100 ">
      <div className="flex-1 overflow-auto">

        <main className="p-8">
          <h1 className="text-2xl font-semibold mb-6">Good morning, Siju</h1>
          <div className="grid grid-cols-4 gap-6 mb-8">
            <CircularProgress value={47} total={50} label="Total Employees" />
            <CircularProgress value={13} total={17} label="Employees Present" />
            <CircularProgress value={10} total={20} label="Projects Completed" />
            <CircularProgress value={13} total={17} label="Applications Completed" />
          </div>
          <div className="grid grid-cols-5 gap-4 mb-8">
            {['Leave application', 'Credit request', 'Job application', 'Asset application', 'Payroll due'].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold mb-2">{Math.floor(Math.random() * 10)}</div>
                <div className="text-sm">{item}</div>
              </div>
            ))}
          </div>
          <AttendanceSummary />
        </main>
      </div>
    </div>
  )
}

export default CompanyHome
