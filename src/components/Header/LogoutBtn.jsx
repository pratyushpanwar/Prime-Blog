import React from 'react'
import authService from "../../appwrite/auth"
import { Logout } from "../../store/authSlice"
import { useDispatch } from 'react-redux'

function LogoutBtn() {

        const dispatch = useDispatch()
        const handler = () => {
            authService.logout().then(() => {
                dispatch(Logout())
            }).catch((err) => {
                console.log(err)
            })
        }

    return (
        <button  
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
        onClick={handler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
