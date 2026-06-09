import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext"
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import { useEffect } from "react";

const ChatHeader = () => {
  const { token, socketConnected, onlineUsers } = useSocket()
  const navigate = useNavigate();
  const { userId } = useParams()

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);

    } catch (error) {
      console.log(error.response);

    }
  }
  useEffect(() => {
    fetchUser()
  }, [userId])
  return (
    <div className="px-4 py-3 bg-[#075E54] flex items-center gap-3">
      <button
        onClick={() => navigate("/chat")}
        className=" text-white text-2xl mr-1 p-2 -m-2"
      >
        <IoArrowBackCircleOutline />
      </button>

      <div
        className="w-9 h-9 rounded-full bg-white text-[#272626] flex items-center justify-center font-medium text-lg overflow-hidden cursor-pointer"
      >
        A
      </div>

      <div>
        <p className="text-white font-medium text-sm">User Name</p>
        <p className="text-xs text-green-300">
          🟢 Online
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;