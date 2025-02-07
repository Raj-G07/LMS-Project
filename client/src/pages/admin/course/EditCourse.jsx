import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = ()=>{
    return(
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Please add essential details</h1>
                <Link to="lecture">
                <Button className="hover:text-blue-600" variant="link">Lectures</Button>
                    </Link>
            </div>
            <CourseTab/>
        </div>
    )
}

export default EditCourse;