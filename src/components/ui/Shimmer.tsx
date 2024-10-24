import React from "react"
// import { cn } from "@/lib/utils"

// interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string
//   width?: string
//   height?: string
// }

export const Shimmer: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = 'w-full',
  height = 'h-6',
  className = '',
}) => {
  return (
    <div
      className={`${width} ${height} bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
    ></div>
  );
};


const ShimmerCard: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 max-w-sm w-full mx-auto">
      <div className="space-y-4">
        <Shimmer className="h-8 w-3/4" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <div className="flex space-x-4">
          <Shimmer className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2 py-1">
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

const ShimmerList: React.FC = () => {
  return (
    <div className="space-y-4 max-w-md mx-auto bg-slate-400">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Shimmer className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

const ShimmerTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(4)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <Shimmer className="h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              {[...Array(4)].map((_, j) => (
                <td key={j} className="px-6 py-4">
                  <Shimmer className="h-4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ShimmerUI: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Shimmer UI Examples</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Card Shimmer</h2>
        <ShimmerCard />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">List Shimmer</h2>
        <ShimmerList />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Table Shimmer</h2>
        <ShimmerTable />
      </section>
    </div>
  )
}
export const ShimmerSidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen p-4">
      {/* Shimmer for the company logo */}
      <div className="mb-8">
        <Shimmer width="w-3/4" height="h-8" className="rounded-md" />
      </div>

      {/* Shimmer for menu items */}
      <div className="space-y-2">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex items-center py-2 space-x-2 rounded border-y border-red-900"
          >
            {/* Shimmer for the icon */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]" />
            
            {/* Shimmer for the text */}
            <div className="w-3/4 h-6 bg-gray-200 rounded-md animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]" />
          </div>
        ))}
      </div>
    </div>
  );
};



export { ShimmerCard, ShimmerList, ShimmerTable, ShimmerUI }