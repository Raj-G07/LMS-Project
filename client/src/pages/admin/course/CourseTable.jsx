import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetCreatorCourseQuery } from "@/slice/api/courseApi"
import { Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const skeletonRows = Array.from({ length: 5 }, (_, i) => i)

const CourseTable = ()=>{
    const navigate = useNavigate();
    const {data,isLoading} = useGetCreatorCourseQuery();
    console.log("data->",data);
    const courses=  data && data?.courses;
    if(isLoading) return (<Skeleton/>)
    return(
        <div>
          <Button onClick={()=>navigate(`create`)}>
            Create Course
          </Button>
          <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
            <TableCell><Badge>{course.isPublished ? "Published":"Draft"}
              </Badge></TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button size='sm' variant='ghost' onClick={()=>navigate(`${course._id}`)} ><Edit/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
    )
}
const Skeleton = ()=>{
  return(
    <div className="space-y-4">
    <div className="w-[120px]">
      <Skeleton className="h-10 w-full" />
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-12" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-16" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-4 w-14 ml-auto" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skeletonRows.map((index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-24 ml-auto" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
  )
}
export default CourseTable