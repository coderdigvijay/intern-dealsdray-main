import React from 'react'
import { useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const{userInfo} = useSelector((state) => state.auth)
  const [logout] = useLogoutMutation();
  const navigate = useNavigate()
 
  const logoutHandler = async(e) => {
    try {
      const res = await logout().unwrap();
      console.log(res);
      localStorage.removeItem("userInfo");

      
      toast.success("Logged out successfully");
      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
      
    }
    
  }
  return (
    <nav className='max-w-[1600px] mx-auto py-10 px-6'>
        <div className='flex justify-between text-black'>
            <img src='https://i0.wp.com/www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png?w=469&ssl=1' alt="" />
            {userInfo && <div className='flex items-center gap-3 '>
              <p className=''>Welcome, {userInfo.username}</p>
              <button className='bg-green-500 px-6 py-2 rounded-md' onClick={logoutHandler}>Logout</button>
              </div>}
        </div>
        <Toaster/>
    </nav>
  )
}

export default Navbar