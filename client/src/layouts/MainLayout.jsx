import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/config";
// vishal singh
const MainLayout = () => {
    const [contacts , setContacts] = useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const user = {
        fullName: "vishal singh",
    };
    // const contacts = [
    //     {
    //         _id: 1,
    //         fullName: "vishal singh",
    //         profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"

    //     },
    //     {
    //         _id: 2,
    //         fullName: "vishaljkj",
    //         profilePic: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"

    //     },
    //     {
    //         _id: 3,
    //         fullName: "vishal1",
    //         profilePic: ""

    //     },
    // ]
    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/getAllContacts`, {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            })
            console.log(res.data.data);
            setContacts(res.data.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(()=>{
        fetchContacts()
    },[])
    return (
        <div className="h-screen w-screen flex">
            {/* sidebar */}
            <div className="bg-gray-100 w-1/4 p-3">
                {/* header */}
                <div className="bg-primary px-4 py-4 flex items-center justify-between">
                    <div className="text-white font-semibold text-lg">
                        {user.fullName}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-white/80 cursor-pointer text-xl ">
                            <FaPlus />
                        </div>
                        <div
                            onClick={() => navigate("/profile")}
                            className="text-white/80 cursor-pointer text-xl"
                        >
                            <CgProfile />
                        </div>

                    </div>
                </div>
                {/* Tabs */}
                <div className="flex justify-between border-b border-gray-200">
                    <button>
                        Chats
                    </button>
                    <button>
                        Groups
                    </button>

                </div>

                {/* contacts */}
                <div>
                    {
                        contacts.map((c) => (
                            <div 
                            key={c._id}
                            onClick={()=>navigate(`/chat/${c._id}`)}
                            className="flex gap-4 mt-2 items-center"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary text-white  flex items-center justify-center overflow-hidden">
                                    {
                                        c.profilePic ? (
                                            <img src={c.profilePic} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            c.fullName.charAt(0)
                                        )
                                    }
                                </div>
                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-gray-900 text-sm">vishal singh</p>
                                    </div>
                                    <p className="text-xs text-gray-900"> online</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* Right section  */}
            <div className="flex flex-col flex-1 overflow-hidden ">
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;
