import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/slice/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = ()=> {
    const navigate = useNavigate();
    const [signupInput,setsignupInput] = useState({
        name:"",
        email:"",
        password:"",
    });
    const [loginInput,setloginInput] = useState({
        email:"",
        password:"",
    });
    const [registerUser,
      {data:registerData,error:registerError, isLoading:registerIsLoading,isSuccess:registerIsSuccess
      }] = useRegisterUserMutation();
    const [loginUser,{
      data:loginData,
      error:loginError,
      isLoading:loginIsLoading,
      isSuccess:loginIsSuccess
    }] = useLoginUserMutation();
    const changeHandler = (e,type)=>{
        if(type==="login"){
        setloginInput({...loginInput,[e.target.name]:e.target.value});}
        else {
            setsignupInput({...signupInput,[e.target.name]:e.target.value});
        }
    }
    const submitHandler = async(type)=>{
        const inputData = type==="signup"?signupInput:loginInput;
        const action = type==="signup"? registerUser:loginUser;
        await action(inputData);
    }
    useEffect(()=>{
         if(registerIsSuccess && registerData){
          toast.success(registerData.message || "Registration successful.")
         }
         if(registerError){
          toast.error(registerError.data.message || "Registration unsuccessful.")
         }
         if(loginIsSuccess && loginData){
          toast.success(loginData.message || "Login Successful.")
          navigate("/")
         }
         if(loginError){
          toast.error(loginError.data.message || "Login unsuccessful.")
         }
    },[
      loginData,
      loginIsLoading,
      loginError,
      registerData,
      registerIsLoading,
      registerError
    ])
  return (
    <Tabs defaultValue="signup" className="mx-auto w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
            Please create a new account and proceed to the signup process upon completion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input 
              onChange={(e)=>changeHandler(e,"signup")} 
              type="text" 
              value ={signupInput.name} name="name" 
              placeholder="Raj Gupta" required="true" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input onChange={(e)=>changeHandler(e,"signup")} value={signupInput.email} name="email" type="email" placeholder="abc@gmail.com" required="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>changeHandler(e,"signup")} value={signupInput.password} name="password" type="password" placeholder="sdr313s@$" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={registerIsLoading} onClick={()=>submitHandler("signup")}>{
              registerIsLoading?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                </>
              ):(
                "Signup"
              )
              }</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
            Enter your password here. Once saved, you will be successfully logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input onChange={(e)=>changeHandler(e,"login")} type="email"
               name="email"  value={loginInput.email}placeholder="abc@gmail.com" required="true"/>
            </div>
          <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>changeHandler(e,"login")} type="password" name="password" value={loginInput.password}placeholder="sdr313s@$" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loginIsLoading} onClick={()=>submitHandler("login")}>{
              loginIsLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                </>
              ):(
               "Login"
              )
}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Login;