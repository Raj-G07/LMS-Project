import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Menu, School } from "lucide-react";
import DarkMode from "@/Darkmode";
import { Link, useNavigate } from "react-router-dom";
const MobileNav = ({user})=>{
    const navigate = useNavigate();
    return (
<Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline"><Menu/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-around">
        <div className="flex gap-2">
        <School size={"30"}/>
        <h1 className="text-2xl font-bold"><Link to="/">E-learning
        </Link> </h1>
        </div>
          <DarkMode/>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <nav className="flex flex-col items-center gap-4">
            <Link to="/my-learning">
            My Learning
            </Link>
            <Link to="/profile">
            Edit Profile
            </Link>
            <p>Log out</p>
          </nav>
        </div>
        {
            user?.role==="instructor" && (
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
          </SheetClose>
        </SheetFooter>
            )
        }
      </SheetContent>
    </Sheet>
    )
}

export default MobileNav;