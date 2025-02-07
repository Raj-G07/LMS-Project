import { useLoadUserQuery } from "@/slice/api/authApi";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";

const MyLearning = ()=>{
    const {data,isLoading} = useLoadUserQuery()
    const myLearningCourses = data?.user.enrolledCourses || []
    return(
      <div className="max-w-8xl">
        <h1 className="font-bold text-2xl text-center">My Learning</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-6">
            {
           isLoading?  Array.from({length:8}).map((_,index) =>(
            <CourseSkeleton key={index}/> )
        ): myLearningCourses.length===0 ?(
           <p>You are not enrolled in any course.</p>):(myLearningCourses.map((course,index)=><Course key={index} course={course}/>))
            }
        </div>
      </div>
    )
}
export default MyLearning;