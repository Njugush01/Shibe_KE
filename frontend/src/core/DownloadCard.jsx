import React from 'react'

const DownloadCard = ({title, children, className = ''}) => {
  return (
    <div className={'bg-white shadow-md p-3 text-start flex flex-col animate-fade-in-down ' + className}>
    {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
    <div className="flex flex-col space-y-4">
        {children}
      </div>
  </div>
  )
}

export default DownloadCard;
