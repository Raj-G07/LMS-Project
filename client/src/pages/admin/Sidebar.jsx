import { useGetCreatorCourseQuery } from "@/slice/api/courseApi"
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react"
import { Link, Outlet } from "react-router-dom"


const Sidebar = ()=>{
   useGetCreatorCourseQuery();
    return(
        <div className="flex">
        <div className="hidden lg:block w-[250px] sm:w-[300px] border-r sticky top-0 h-screen">
          <div className="space-y-4 p-4">
            <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22}/>
            <h1>Dashboard</h1>
            </Link>
            <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22}/>
            <h1>Courses</h1>
            </Link>
          </div>
        </div>
          <div className="flex-grow p-3">
            <Outlet/>
        </div>
            </div>
    )
}

export default Sidebar