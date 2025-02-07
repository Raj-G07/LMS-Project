import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import CourseSkeleton from "./CourseSkeleton";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/slice/api/authApi";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

const Profile = ()=>{
    const [name,setName] = useState("");
    const [profilePhoto,setProfilePhoto] = useState("")
    const {data,isLoading,refetch}= useLoadUserQuery();
    const [updateUser,
      {
        data:updateUserData,
        isLoading:updateUserIsLoading,
        isError,
        isSuccess,
        error
      }] = useUpdateUserMutation();
    const user = data && data.user;
    const onChangeHandler = (e)=>{
      const file= e.target.files?.[0];
       if(file) setProfilePhoto(file)
    }
  const updateUserHandler = async()=>{
    const formData = new FormData();
    formData.append("name",name);
    formData.append("profilePhoto",profilePhoto)
    await updateUser(formData)
  }
  useEffect(()=>{
    refetch();
  },[]);

  useEffect(() => {
    if(isSuccess){
      refetch();
      toast.success(data.message || "Profile updated");
    }
    if(isError){
      toast.error(error.message || "Failed to update profile.")
    }
  }, [error,isError,isSuccess,updateUserData])
  
    return(
      <div>
        <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
        <div className="flex gap-2 items-center">
        <Avatar className="h-24 w-24 md:h-30 md:w-30 ">
            <AvatarImage
             src={user?.photoUrl ||"https://github.com/shadcn.png"} alt="@shadcn"/>
               <AvatarFallback>CN</AvatarFallback>
         </Avatar>
         <div>

         <h1 className="font-semibold">Name:
            <span className="font-normal text-gray-300 ">{user?.name}</span>
         </h1>
         <h1 className="font-semibold">Email:
            <span className="font-normal text-gray-300 ">{user?.email}</span>
         </h1>
         <h1 className="font-semibold">Role:
            <span className="font-normal text-gray-300 ">{user?.role.toUpperCase()}</span>
         </h1>
         <Dialog>
            <DialogTrigger asChild>
               <Button size="sm">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                    Edit Profile
                    </DialogTitle>
                    <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
            type="text" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="col-span-3" placeholder="Raj Gupta" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-center">
             Profile Photo
            </Label>
            <Input type="file"
            onChange={onChangeHandler}
             className="col-span-3" accept="image/*"/>
          </div>
        </div>
        <DialogFooter>
          <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>{
          updateUserIsLoading? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait.
                    </>
                ):"Save changes"
                }</Button>
        </DialogFooter>
            </DialogContent>
         </Dialog>
         </div>
        </div>
        <div>
            <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-6">
            {
           isLoading?  Array.from({length:8}).map((_,index) =>(
            <CourseSkeleton key={index}/> )
        ): user.enrolledCourses.length===0 ?(
           <p>You are not enrolled in any course.</p>):(user.enrolledCourses.map((course)=><Course key={course._id}/>))
            }
        </div>
        </div>
      </div>
    )
}
export default Profile;