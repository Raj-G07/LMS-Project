
const CourseSkeleton = ()=>{
    return(
        <div className="max-w-sm">
        <div className="animate-pulse">
       <a>
    <div className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg">
      <div className="relative">
        <div className="w-full h-36 bg-gray-200"></div>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="h-4 bg-gray-200 mb-2 w-full"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="font-medium text-sm bg-gray-200 w-12 h-4 rounded"></div>
          </div>
          <div className='bg-blue-600 text-white px-2 py-1 text-xs rounded-full w-12 h-4'>
          </div>
        </div>
        <div className="text-lg font-bold">
            <div className="bg-gray-200 w-12 h-6 rounded"></div>
        </div>
      </div>
    </div>
  </a>
</div>  
    </div>
    )
}

export default CourseSkeleton