import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from "@/slice/api/courseProgressApi"
import { CheckCheck, CheckCircle2, CirclePlay } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


const CourseProgress = ()=>{
    const params = useParams();
    const {courseId} = params;
    const {data,isLoading,isError,refetch} = useGetCourseProgressQuery(courseId);
    const [updateLectureProgress] = useUpdateLectureProgressMutation();

    const [completeCourse,{
        data:markCompleteData,
        isSuccess:completedSuccess
    }] = useCompleteCourseMutation()

    const [inCompleteCourse,{
        data:markInCompleteData,
        isSuccess:inCompletedSuccess
    }]= useInCompleteCourseMutation()
    useEffect(() => {
       if(completedSuccess){
        refetch();
        toast.success(markCompleteData.message)
       }
       if(inCompletedSuccess){
        refetch();
        toast.success(markInCompleteData.message)
       }
    }, [completedSuccess,inCompletedSuccess])
    const [currentLecture,setCurrentLecture] = useState(null)
    if(isLoading) return <><CourseViewerSKeleton/></>
    if(isError)  return <h>Failed to load Page</h>
    const {courseDetails,progress,completed} = data.data;
    const {courseTitle} = courseDetails;
    const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0])
    const isLectureCompleted = (lectureId) =>{
        return progress.some((prog)=>prog.lectureId===lectureId && prog.viewed)
    }
    const handleLectureProgress = async(lectureId)=>{
        await updateLectureProgress({courseId,lectureId})
        refetch()
    }

    const handleSelectLecture = (lecture)=>{
        setCurrentLecture(lecture)
        handleLectureProgress(lecture._id)
    }
    const handleCompleteCourse = async () => {
        await completeCourse(courseId);
      };
      const handleInCompleteCourse = async () => {
        await inCompleteCourse(courseId);
      };
     return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{courseTitle}</h1>
                <Button 
                onClick={completed? handleInCompleteCourse:handleCompleteCourse}
                variant={completed?"outline":"default"}>
                    {completed?(
                        <div className="flex items-center">
                            <CheckCheck/> Completed
                        </div>
                    ):"Mark as Completed"}
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 md:w-3/5 rounded-lg shadow-lg p-4">
               <div>
                <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-auto md:rouded-lg"
                onPlay={()=>
                    handleLectureProgress(currentLecture?._id || initialLecture._id)
                }
                />
                </div> 
               <div className="mt-2">
                <h3 className="font-medium text-lg">
                   { `Lecture ${
                        courseDetails.lectures.findIndex(
                     (lec)=>lec._id === (currentLecture?._id || initialLecture._id)
                        )+1
                    } : ${
                        currentLecture?.lectureTitle || initialLecture.lectureTitle
                    }` }</h3>
               </div>
            </div>
            <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-1 border-gray-200 md:pl-4 pt-4 md:pt-0">
                <h2 className="font-semibold text-xl mb-4">
                    Course Lecture
                </h2>
                <div className="flex-1 overflow-y-auto">
                    {
                        courseDetails?.lectures.map((lecture)=>(
                            <Card
                            key={lecture._id}
                            className={`mb-3 hover:cursor-pointer transition transform ${
                                lecture._id === currentLecture?._id
                                ? "bg-gray-200 dark:dark:bg-gray-800"
                                : ""   
                            }`}
                            onClick={()=>handleSelectLecture(lecture)}
                            >
                           <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center">
                               {
                                isLectureCompleted(lecture._id)? (
                                    <CheckCircle2 size={24} className="text-green-400 mr-2"/>
                                ):(
                                    <CirclePlay size={24}
                                    className="text-green-400 mr-2"/>
                                ) } 
                               <div>
                                <CardTitle>
                                    {lecture.lectureTitle}
                                </CardTitle>
                               </div>
                               </div>
                               {
                                   isLectureCompleted(lecture._id) && (
                                    <Badge variant="outline">Completed</Badge>
                                )
                            }
                           </CardContent>
                            </Card>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}


const CourseViewerSKeleton = ()=>{
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Player Section */}
        <div className="flex-1 md:w-3/5 rounded-lg shadow-lg p-4">
          <div>
            <Skeleton className="w-full aspect-video rounded-lg" />
          </div>
          <div className="mt-2">
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>

        {/* Lecture List Section */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <Skeleton className="h-7 w-[140px] mb-4" />
          <div className="flex-1 overflow-y-auto">
            {/* Render multiple lecture card skeletons */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="mb-3">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 w-[180px]" />
                  </div>
                  <Skeleton className="h-5 w-[80px]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}

 export default CourseProgress