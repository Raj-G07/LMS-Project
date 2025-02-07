import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPurchasedCourseQuery } from "@/slice/api/purchaseApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const Dashboard = ()=>{
    const {data,isLoading,isError}= useGetPurchasedCourseQuery();

    if(isLoading) return <><LoadingSkeleton/></>
    if(isError) return <h1 className="text-red-400">Failed to get purchased course</h1>
    const {purchasedCourse} = data || []
    const courseData = purchasedCourse.map((course)=>({
        name:course.courseId.courseTitle,
        price:course.courseId.coursePrice
    }))
    const totalRevenue = purchasedCourse.reduce((acc,ele) => acc + (ele.amount || 0),0)
    const totalSales = purchasedCourse.length;
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 sm:grid-cols-3 ">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
                <CardTitle>
                    Total Sales
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
            </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30} // Rotated labels for better visibility
                textAnchor="end"
                interval={0} // Display all labels
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2" // Changed color to a different shade of blue
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
        </div>
    )

}
 
const LoadingSkeleton = ()=>{
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
      {/* Total Sales Card Skeleton */}
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>

      {/* Total Revenue Card Skeleton */}
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>

      {/* Course Prices Chart Card Skeleton */}
      <Card className="shadow-lg col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard