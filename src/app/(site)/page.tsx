"use client"
import UserDashboard from "@/components/Dashboard/User/UserDashboard";
import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import toast from "react-hot-toast";
import LoadingPageSpinner from "@/components/LoadingPageSpinner";

const Home = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const { data: session, status } = useSession({ required: true})
    
    useEffect(() => {
        if (/*auth.user && auth.user.role*/status === "authenticated") {
            router.replace('/')
            if(searchParams?.get('afterlogin') ?? false){
                toast.success(`Salut ${session.user ? session.user.name : ''} 👋`)
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])
  return (
      <div className="dashboard-container">
        <UserDashboard />
      </div>
  )
}

Home.auth = {
    role: "admin",
    loading: <LoadingPageSpinner/>
}

export default Home
