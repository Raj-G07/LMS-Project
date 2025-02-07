
import { useGetCourseDetailWithStatusQuery } from "@/slice/api/purchaseApi";
import {Navigate, useParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import {Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

const PurchaseCourseProtectedRoute=({children})=>{
    const {courseId} = useParams();
    const {data,isLoading} = useGetCourseDetailWithStatusQuery(courseId);
    if(isLoading) return (<PurchasedSkeleton/>)

    return data?.purchased ? children: <Navigate to={`/course-detail/${courseId}`}/>
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

export default PurchaseCourseProtectedRoute