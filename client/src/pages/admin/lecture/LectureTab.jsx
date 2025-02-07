import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {Progress} from "@/components/ui/progress"
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/slice/api/courseApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
const MediaApi = "http://localhost:8080/api/v1/media"
const LectureTab= ()=>{
    const [lectureTitle,setLectureTitle] = useState("");
    const [uploadVideoInfo,setuploadVideoInfo] = useState(null);
    const [isFree,setIsFree] = useState(false);
    const [mediaProgress,setMediaProgress] = useState(false);
    const [uploadProgress,setUploadProgress] = useState(0);
    const [btnDisable,setBtnDisable] = useState(true);
    const fileChangeHandler = async(e)=>{
        const file = e.target.files[0];
        if(file){
            const formData= new FormData();
            formData.append("file",file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MediaApi}/upload-video`,formData,{
                    onUploadProgress:({loaded,total})=>{
                        setUploadProgress(Math.round((loaded*100)/total))
                    }
                }
                );
                if(res.data.success){
                    setuploadVideoInfo({
                     viderUrl:res.data.data.url,
                     publicId:res.data.data.public_id,
                    });
                    setBtnDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error("Video upload failed")
            } finally{
                setMediaProgress(false)
            }
        }

    }
    const [editLecture,{data,isLoading,error,isSuccess}] = useEditLectureMutation();
    const params= useParams();
    const {courseId,lectureId} = params;
    const editLectureHandler= async()=>{
        await editLecture({lectureTitle,videoInfo:uploadVideoInfo,isPreviewFree:isFree,courseId,lectureId})
    }
    useEffect(() => {
     if(isSuccess){
        toast.success(data.message);
     }
     if(error){
        toast.error(error.data.message);
     }
    }, [isSuccess,error])
    const [removeLecture,{data:removeData,isLoading:removeLoading,isSuccess:removeSuccess}]= useRemoveLectureMutation()
    const removeLectureHandler = async()=>{
        await removeLecture(lectureId)
    }

    useEffect(() => {
      if(removeSuccess){
        toast.success(removeData.message)
      }
    }, [removeSuccess])
    
    const {data:lectureData} = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;

    useEffect(() => {
     if(lecture){
        setLectureTitle(lecture.lectureTitle)
        setIsFree(lecture.isPreviewFree);
        setuploadVideoInfo(lecture.videoInfo)
     }
    }, [lecture])
    
    return (
     <Card>
        <CardHeader>
            <div>
                <CardTitle>
                  Edit Lecture
                </CardTitle>
                <CardDescription>
                    Make changes and click save.
                </CardDescription>
            </div>
            <div>
              <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>{ removeLoading ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Wait
              </>:"Remove"
}</Button>
            </div>
        </CardHeader>
        <CardContent>
        <div>
            <Label>Title</Label>
            <Input
            type="text"
            placeholder="Introduction..."
            value={lectureTitle}
            onChange={(e)=>setLectureTitle(e.target.value)}
            />
        </div>
        <div>
            <Label>Video <span className="text-red-500">*</span></Label>
            <Input
            type="file"
            accept="video/*"
            placeholder="Introduction..."
            className="w-fit"
            onChange={fileChangeHandler}
            />
        </div>
        <div className="flex items-center space-x-2 my-5">
            <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode"/>
            <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>
        {
            mediaProgress && (
                <div className="my-4">
                  <Progress value={uploadProgress} />
                  <p>{uploadProgress}% uploaded</p>
                </div>
              )
        }
         <div>
            <Button disabled={isLoading} onClick={editLectureHandler}>{
                isLoading? <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Wait
                </>:"Update"
                }</Button>
         </div>
        </CardContent>
     </Card>
    )
}

export default LectureTab;