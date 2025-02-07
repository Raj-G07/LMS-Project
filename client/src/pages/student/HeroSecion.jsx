import { Button } from "@/components/ui/button";
import {Input} from "../../components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HeroSection = ()=>{
    const [searchQuery,setSearchQuery] = useState("")
    const navigate= useNavigate()
    const searchHandler =(e)=>{
      e.preventDefault()
      if(searchQuery.trim()!==""){
          navigate(`/course/search?query=${searchQuery}`)
      }
      setSearchQuery("")
    }
    return (
        <div className="text-center mb-2 ">
        <h1 className="text-4xl font-bold mb-4">Discover the Perfect Course for You!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Discover, Learn, and Upskill with Our Extensive Range of Courses – Empower Your Future Today!</p>
        <form onSubmit={searchHandler} className="flex items-center justify-center">
            <Input
            type="text"
            value={searchQuery}
            onChange = {(e)=>setSearchQuery(e.target.value)}
            className="overflow-hidden max-w-md rounded-r-none rounded-l-full"
            placeholder="Search Courses..."
            />
        <Button className="rounded-r-full">Search</Button>
        </form>
        <Button onClick={()=>navigate(`/course/search?query`)} className="rounded-full mt-6">Explore Courses</Button>
        </div>
    )
}

export default HeroSection;