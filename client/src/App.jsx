import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import MainLayout from './layouts/MainLayout'
import Chat from './pages/Chat'
import Group from './pages/Group'
import Profile from './pages/Profile'
import { io } from "socket.io-client"
import { useEffect, useRef } from 'react'
import { API_BASE_URL } from './api/config'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "chat",
        element: (
          <div className='flex items-center justify-center h-screen text-gray-600 font-semibold'>Select user to start chat</div>
        )
      },
      {
        path: "chat/:userId",
        element: <Chat />
      },
      // {
      //   path:"group/groupId",
      //   element:<Group/>
      // },
      {
        path: "profile",
        element: <Profile />
      },

    ]
  },
  {
    path: "*",
    element: <p className='border-2 h-screen flex justify-center items-center font-semibold text-xl'>Page Not Found</p>
  }
])

const App = () => {
  const token = localStorage.getItem("token")

  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io(`${API_BASE_URL}`, {
      auth: { token }
    })
    socketRef.current.on("connect", () => {
      console.log("connected", socketRef.current.id);
    })
    socketRef.current.on("onlineUser", (m) => {
      console.log("onlineUser", m);
    })

  }, [token])

  return (
    <>
      <Toaster position='top-right' />
      <RouterProvider router={router} />
    </>
  )
}

export default App