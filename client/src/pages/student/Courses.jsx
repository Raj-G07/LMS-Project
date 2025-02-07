import { useGetPublishCourseQuery } from "@/slice/api/courseApi";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";
import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom"
import { FileQuestion } from "lucide-react";
const Courses = ()=>{
    const {data,isLoading,isError} = useGetPublishCourseQuery();
    console.log(data);
    if(isError) return <CourseNotFound/>
    return(
      <div className="max-w-8xl">
        <h2 className="font-bold text-3xl text-center">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-6">
        {
            isLoading ? Array.from({length:8}).map((_,index) =>(
                <CourseSkeleton key={index}/> )
            ):
            data?.courses && data.courses.map((course,index)=>
                <Course key={index} course={course}/>
            )
        }
        </div>
      </div>
    )
}

export default Courses;

const CourseNotFound = ()=>{
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
    <div className="flex items-center gap-2 text-muted-foreground">
      <FileQuestion className="h-8 w-8" />
      <h2 className="text-2xl font-semibold">Course Not Found</h2>
    </div>
    <p className="text-sm text-muted-foreground">
      The course you&apos;re looking for doesn&apos;t exist or has been removed.
    </p>
    <Button asChild>
      <Link href="/courses">
        Browse Courses
      </Link>
    </Button>
  </div>
  )
}