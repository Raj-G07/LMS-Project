import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourseDetailWithStatusQuery } from "@/slice/api/purchaseApi";
import { BadgeInfo, PlayCircle,Lock } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = ()=>{
    const params= useParams();
    const navigate = useNavigate();
    const {courseId} = params;
    const {data,isLoading,isError} = useGetCourseDetailWithStatusQuery(courseId);
    const {course,purchased} = data;
    if(isLoading) return <><PurchasedSkeleton/></>
    if(isError) return <h>Failed to load Page</h>
    const handleContinueCourse = ()=>{
        if(purchased){
            navigate(`/course-progress/${courseId}`)
        }
    }
    return(
     <div className="space-y-5">
        <div className="bg-[#2D2F31] text-white">
            <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
                <h1 className="font-bold text-2xl md:text-3xl">
                {course?.courseTitle}
                </h1>
                <p className="text-base md:text-lg">{course?.subTitle}</p>
                <p>Created By {" "} <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span></p>
                <div className="flex items-center gap-2 text-sm">
                    <BadgeInfo size={16}/>
                    <p>Last updated {course?.createdAt.split("T")[0]}</p>
                </div>
                <p>Students enrolled:{course?.enrolledStudents.length}</p>
            </div>
        </div>
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10" >
            <div className="w-full lg:w-1/2 space-y-5">
             <h1 className="font-bold text-xl md:text-2xl">Description</h1>
             <p className="text-sm"   dangerouslySetInnerHTML={{ __html: course.description }}/> 
             <Card>
                <CardHeader>
                    <CardTitle>
                        Course Content
                    </CardTitle>
                    <CardDescription>
                        {course?.lectures.length} lectures
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                {course?.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
                </CardContent>
            </Card> 
            </div>
            <div className="w-full lg:w-1/2">
             <Card>
                <CardContent className="p-4 flex flex-col">
                    <div className="w-full aspect-video mb-4">
                    <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    url={course.lectures[0].videoUrl}
                    controls={true}
                    />
                    </div>
                    <h1>Lecture Title</h1>
                    <Separator className="my-2"/>
                    <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                {
                    purchased?<Button onClick={handleContinueCourse}>
                   Continue
                    </Button>:
                    <BuyCourseButton courseId={courseId}/>}
                </CardFooter>
             </Card>
            </div>
        </div>
     </div>
    )
}


const PurchasedSkeleton = ()=>{
  return (
    <div className="space-y-5">
        {/* Hero Section */}
        <div className="bg-[#2D2F31] text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-4">
            <Skeleton className="h-8 w-3/4 bg-gray-700" />
            <Skeleton className="h-6 w-2/3 bg-gray-700" />
            <Skeleton className="h-5 w-48 bg-gray-700" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 bg-gray-700" />
              <Skeleton className="h-4 w-36 bg-gray-700" />
            </div>
            <Skeleton className="h-5 w-40 bg-gray-700" />
          </div>
        </div>
  
        {/* Content Section */}
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-5">
            <Skeleton className="h-7 w-36" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
  
            <Card>
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Simulate 5 lecture items */}
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
  
          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardContent className="p-4 flex flex-col">
                {/* Video Player Placeholder */}
                <div className="w-full aspect-video mb-4">
                  <Skeleton className="w-full h-full" />
                </div>
                <Skeleton className="h-6 w-32" />
                <Separator className="my-2" />
                <Skeleton className="h-6 w-40" />
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  export default CourseDetail;