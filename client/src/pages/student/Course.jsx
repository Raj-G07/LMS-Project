import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useGetCourseDetailWithStatusQuery } from "@/slice/api/purchaseApi"
import { Link } from "react-router-dom"

const Course = ({course})=>{

    useGetCourseDetailWithStatusQuery(`${course._id}`)
    return (
      <Link to={`/course-detail/${course._id}`}>
     <Card className="max-w-md">
        <div>
            <img src={course.courseThumbnail} alt="course" className="w-full h-36 object-cover rounded-t-lg"/>
        </div>
        <CardContent>
            <h1 className="hover:underline font-bold text-lg truncate">
             {course.courseTitle}
            </h1>
            <div className="flex justify-between" >
                <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={ course.creator?.photoUrl ||"https://github.com/shadcn.png" }alt="@shadcn"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>{course.creator?.name}</h1>
                </div>
            <Badge className="rounded-full">
                {course.courseLevel}
            </Badge>
            </div>
            <div >
                <span className="font-bold ">₹{course.coursePrice}</span>
            </div>
        </CardContent>
     </Card>
      </Link>  
    )
}

export default Course