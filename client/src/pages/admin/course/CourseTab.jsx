import RichTextEditor from "@/components/RichTextEditior";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/slice/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = ()=>{
    const navigate= useNavigate();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
      });
      const params= useParams();
      const courseId= params.courseId;
      const {data:courseByIdData,isLoading:courseByIdLoading,refetch}= useGetCourseByIdQuery(courseId);
      

      useEffect(() => {
          if(courseByIdData?.course){
            const course = courseByIdData?.course;
            setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: course.courseThumbnail,
            })
          }
      }, [courseByIdData])
      

      const [editCourse,{data,isLoading,isSuccess,error}] =useEditCourseMutation();
      
      const [previewThumbnail, setPreviewThumbnail] = useState("");
      const selectCategory = (value) => {
        setInput({ ...input, category: value });
      };
      const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
      };
      const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
      };
      const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          setInput({ ...input, courseThumbnail: file });
          const fileReader = new FileReader();
          fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
          fileReader.readAsDataURL(file);
        }
      };

      const updateHandler = async()=>{
        const formData = new FormData();
        formData.append("courseTitle",input.courseTitle);
        formData.append("courseLevel",input.courseLevel);
        formData.append("subTitle",input.subTitle);
        formData.append("description",input.description)
        formData.append("category",input.category);
        formData.append("coursePrice",input.coursePrice);
        formData.append("courseThumbnail",input.courseThumbnail);
       await editCourse({formData,courseId})
      }
      useEffect(() => {
        if(isSuccess){
          toast.success(data.message || "Course updated.")
        }
        if(error){
          toast.error(error.data.message ||"Failed to update course")
        }
      }, [isSuccess,error])
      const [publishCourse,{}]=usePublishCourseMutation();
      const publishHandler = async (action)=>{
        try {
          const res = await publishCourse({courseId,query:action})
          if(res.data){
            refetch()
            toast.success(res.data.message)
          }
        } catch (error) {
          toast.error("Failed to pubish or unpublish course")
        }
      }
      if(courseByIdLoading){
        return (
          <>
           <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">Loading...</p>
          </div>
        </div>
          </>
        )
      }
    return(
         <Card>
            <CardHeader className="flex flex-row justify-between">
            <div >
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
                Make changes to your courses here.
            </CardDescription>
            </div>
           <div className="flex flex-col ">
            <Button variant="outline" disabled={courseByIdData?.course.lectures.length===0}   onClick={()=>publishHandler(courseByIdData?.course.isPublished? "false":"true")}>
                {
                    courseByIdData?.course.isPublished ?"Unpublished":"Published"
                }
            </Button>
            <Button className="mt-2">
                Remove Course
            </Button>
           </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        value={input.courseTitle}
                        onChange={changeEventHandler}
                        name="courseTitle"
                        placeholder="Fullstack developer"
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                        type="text"
                        name="subTitle"
                        value={input.subTitle}
                        onChange={changeEventHandler}
                        placeholder="Become a fullstack developer from zero to hero"
                        />
                    </div>
                    <div>
                    <Label>Description</Label>
                      <RichTextEditor input={input} setInput={setInput}/>
                    </div>
                    <div>
                    <Label>Category</Label>
                    <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Techonology</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                    </div>
                    <div>
                    <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>  
                    </div>
                    <div>
                    <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="₹199"
                className="w-fit"
              />
                    </div>
                    <div>
                    <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {
                previewThumbnail && (
                    <img 
                    src={previewThumbnail}
                    className="e-64 my-2"
                    alt="Course Thumbnail"
                    />
                )
            }
                    </div>
                    <div className="mt-2">
                    <Button onClick={() => navigate("/admin/course")} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
                    </div>
                </div>
            </CardContent>
         </Card>
    )
}

export default CourseTab;

