import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-[#111113]  p-6'>
      {children}
    </div>
  )
}

export default layout