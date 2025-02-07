import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCreateCourseMutation } from "@/slice/api/courseApi"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
  
const AddCourse = ()=>{
    const [courseTitle,setCourseTitle] = useState(""); 
    const [category,setCategory] = useState("");
    const [createCourse,{
        data,isLoading,error,isSuccess
    }] = useCreateCourseMutation();
    const navigate = useNavigate();
    const createCourseHandler = async()=>{
        await createCourse({courseTitle,category})
    }
     
    const getSelectedCategory = (value) =>{
        setCategory(value)
    }
    useEffect(() => {
      if(isSuccess){
        toast.success(data?.message || "Course created")
        navigate("/admin/course")
      }
    }, [isSuccess,error])
    
    return (
     <div>
        <div>
            <h1 className="font-bold text-xl">Add a New Course</h1>
            <p className="text-sm">Ready to create a new course? Start by adding some basic details like the course title, description, and category to lay the foundation for your content.</p>
        </div>
        <div>
            <Label>Title</Label>
            <Input className="w-[180px]"
            type="text"
            value={courseTitle}
            onChange={(e)=>setCourseTitle(e.target.value)}
            placeholder="Course Name"
            />
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
           <SelectValue placeholder="Select one" />
          </SelectTrigger>
  <SelectContent>
    <SelectGroup>
    <SelectLabel>Technology</SelectLabel>
    <SelectItem value="nextjs">NextJs</SelectItem>
    <SelectItem value="html">HTML</SelectItem>
    <SelectItem value="docker">Docker</SelectItem>
    <SelectItem value="reactjs">ReactJs</SelectItem> 
    <SelectItem value="javascript">Javascript</SelectItem>
    <SelectItem value="python">Python</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
       <div className="flex items-center gap-3 p-3">
        <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>{
           isLoading?(
              <>
              <Loader2 className="animate-spin h-4 w-4 "/>Wait..
              </> 
           ):(
              "Create"
           )
}</Button>
       </div>
        </div>
     </div>
    )
}

export default AddCourse