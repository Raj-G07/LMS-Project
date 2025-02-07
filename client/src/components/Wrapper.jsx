import { useLoadUserQuery } from "@/slice/api/authApi";
import { Skeleton } from "./ui/skeleton";

const Wrapper = ({children})=>{
    const {isLoading} = useLoadUserQuery();
    return(
        <>
        {
            isLoading? 
            (
            <Loading/>):
            (<>{children}</>)
        }
        </>
    )
}
export default Wrapper;

const Loading = ()=>{
    return(
            <div className="flex flex-col gap-8 p-4 md:p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[350px]" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-[100px]" />
                  <Skeleton className="h-10 w-[100px]" />
                </div>
              </div>
        
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-8 w-[200px]" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[180px]" />
                    </div>
                  </div>
                ))}
              </div>
        
              <div className="rounded-lg border">
                <div className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[250px]" />
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-8 w-[120px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }