import { School } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MobileNav from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/slice/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = ()=>{
    const {user} = useSelector(store=>store.auth);
    const [logoutUser,{data,isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async()=>{
      await logoutUser();
    }
    useEffect(() => {
      if(isSuccess){
        toast.success(data.message || "User logout successfully")
        navigate("/login")
      }
    }, [isSuccess])
    
    return(
     <div className="bg-gray-700 sticky top-0 z-10 border-b-2 border-b-gray-950">
     <header className="max-w-7xl hidden md:flex md:justify-between items-center" >
          <Link to="/">
        <div className="max-w-7xl md:flex gap-2 mx-7">
        <School size={"30"}/>
        <h1 className="text-2xl font-bold">E-Learning</h1>
        </div>
          </Link>
        {/*User icons and dark mode*/}
        <div className="flex gap-4 items-center">
            {
                user? (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Avatar>
  <AvatarImage className="cursor-pointer" src={user?.photoUrl || "https://github.com/shadcn.png"} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                         <Link to="my-learning">My learning</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="profile">
                          Edit Profile 
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logoutHandler}>
                        Log out
                      </DropdownMenuItem>
                      {
                        user?.role === "instructor" && (
                          <>    
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">
                        DashBoard
                        </Link>
                      </DropdownMenuItem>
                          </>
                        )
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>  
                ):(
               <div>
                   <Button className="mr-2" variant="outline"
                   onClick={()=>navigate("/login")}>Login</Button>
                   <Button onClick={()=>navigate("/login")}>SignUp</Button>
               </div>
                )
}
        </div>
     </header>
        <div className="md:hidden flex justify-around">
        <div className="flex gap-2">
        <School size={"30"}/>
        <h1 className="text-2xl font-bold">E-learning</h1>
        </div>
        <MobileNav user={user}/>
        </div>
     </div>
    )
}

export default Navbar;