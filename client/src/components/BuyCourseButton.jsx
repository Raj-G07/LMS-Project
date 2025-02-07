import { useCreateCheckoutSessionMutation } from "@/slice/api/purchaseApi"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({courseId})=>{
  const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async()=>{
      await createCheckoutSession(courseId)
  }
  useEffect(() => {
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url  // Redirect to stipe checkout
      }else {
        toast.error("Invalid response")
      }
    }
    if(isError){
      toast.error(error.data.message || "Failed to create checkout")
    }
  }, [data,isSuccess,isError,error])
  
    return (
      <Button disabled={isLoading} onClick={purchaseCourseHandler}>{
        isLoading?
       ( <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin"/>Please Wait
        </> )
        : "Purchase"}</Button>
    )
}

export default BuyCourseButton