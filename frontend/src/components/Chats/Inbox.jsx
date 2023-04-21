import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  getAllMessages,
  sendMessage,
} from "../../actions/messageAction";
import { getUserDetailsById } from "../../actions/userAction";
import {
  ALL_MESSAGES_ADD,
  NEW_MESSAGE_RESET,
} from "../../constants/messageConstants";
import { BASE_PROFILE_IMAGE_URL, SOCKET_ENDPOINT } from "../../utils/constants";
import Sidebar from "./Sidebar";
import { io } from "socket.io-client";
import Message from "./Message";
import { Picker } from "emoji-mart";
import SearchModal from "./SearchModal";
import SpinLoader from "../Layouts/SpinLoader";
import MetaData from "../Layouts/MetaData";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import logo from "../../assests/images/ermalogo.png";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PetsIcon from "@mui/icons-material/Pets";

const Inbox = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef(null);
  const socket = useRef(null);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingData, setTypingData] = useState({});

  const [isOnline, setIsOnline] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.user);
  const { user: friend } = useSelector((state) => state.userDetails);
  const { error, messages, loading } = useSelector(
    (state) => state.allMessages
  );
  const { success, newMessage } = useSelector((state) => state.newMessage);

  const userId = params.userId;

  useEffect(() => {
    socket.current = io(SOCKET_ENDPOINT);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
        createdAt: Date.now(),
      });
    });
    socket.current.on("typing", (senderId) => {
      setTypingData({ senderId, typing: true });
    });
    socket.current.on("typing stop", (senderId) => {
      setTypingData({ senderId, typing: false });
    });
  }, []);

  useEffect(() => {
    typingData &&
      typingData.senderId === userId &&
      setIsTyping(typingData.typing);
  }, [typingData, userId]);

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.sender === userId &&
      dispatch({
        type: ALL_MESSAGES_ADD,
        payload: arrivalMessage,
      });
    // console.log(arrivalMessage);
  }, [arrivalMessage, userId]);

  useEffect(() => {
    socket.current.emit("addUser", loggedInUser._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
      setIsOnline(users.some((u) => u.userId === userId));
    });
  }, [loggedInUser._id, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (params.chatId && userId) {
      dispatch(getAllMessages(params.chatId));
      dispatch(getUserDetailsById(userId));
    }

    return () => {
      dispatch({ type: USER_DETAILS_RESET });
    };
  }, [dispatch, error, params.chatId, userId]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: ALL_MESSAGES_ADD,
        payload: newMessage,
      });
      dispatch({ type: NEW_MESSAGE_RESET });
    }
  }, [dispatch, success]);

  const handleSubmit = (e, msg = message) => {
    e.preventDefault();

    socket?.current.emit("sendMessage", {
      senderId: loggedInUser._id,
      receiverId: userId,
      content: msg,
    });

    const msgData = {
      chatId: params.chatId,
      content: msg,
    };

    dispatch(sendMessage(msgData));
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket?.current.emit("typing", {
        senderId: loggedInUser._id,
        receiverId: userId,
      });
    }

    setTimeout(() => {
      socket?.current.emit("typing stop", {
        senderId: loggedInUser._id,
        receiverId: userId,
      });
      setTyping(false);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowSearch(false);
  };

  const openModal = () => {
    setShowSearch(true);
  };

  return (
    <>
      <MetaData title="ERMA • Chats" />

      <div
        style={{
          marginTop: "80px",
          backgroundImage:
            "white",
          opacity: "1",
          backgroundSize: "100% 100%",
          animation: "gradient 10s ease infinite",
          display: "flex",
          justifyContent: "center",
        }}
        className="mt-14 sm:mt-[4.7rem] pb-4 rounded h-[100vh]  mx-auto sm:pr-14 sm:pl-8"
      >
        <div
          style={{ marginTop: "50px" }}
          className="flex border xl:w-2/3 rounded w-full bg-white shadow-md"
        >
          {/* sidebar */}
          <Sidebar openModal={openModal} />

          {!userId ? (
            <div className="flex flex-col items-center justify-center w-full sm:w-4/6 gap-2">
              <div className="w-24 h-24 flex items-center p-2 justify-center">
                <img
                  draggable="false"
                  loading="lazy"
                  className="w-full h-full rotate-12 scale-150 "
                  src={logo}
                  alt="message"
                />
              </div>
              <h2 className="text-2xl font-thin">Your Messages</h2>
              <p className="text-gray-400 text-sm">
                Send private photos and messages to other pets.
              </p>
              <button
                onClick={openModal}
                style={{ backgroundColor: "#5b064a" }}
                className="rounded px-2.5 mt-2 py-1.5 text-white text-sm font-medium hover:drop-shadow-lg"
              >
                Send Message
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-between w-full sm:w-4/6">
              {/* header */}
              <div className="flex py-3 px-6 border-b items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 relative">
                    <img
                      draggable="false"
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover"
                      src={BASE_PROFILE_IMAGE_URL + friend.avatar}
                      alt="avatar"
                    />
                    {isOnline && (
                      <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium cursor-pointer">
                    {friend.name}
                  </span>
                </div>
              </div>

              {/* messages */}
              <div className="w-full flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden p-4">
                {loading ? (
                  <SpinLoader />
                ) : (
                  messages.map((m, i) => (
                    <React.Fragment key={m._id}>
                      <Message
                        ownMsg={m.sender === loggedInUser._id}
                        {...friend}
                        {...m}
                      />
                      <div ref={scrollRef}></div>
                    </React.Fragment>
                  ))
                )}
                {isTyping && (
                  <>
                    <div className="flex items-center gap-3 max-w-xs">
                      <img
                        draggable="false"
                        loading="lazy"
                        className="w-7 h-7 rounded-full object-cover"
                        src={BASE_PROFILE_IMAGE_URL + friend.avatar}
                        alt="avatar"
                      />
                      <span className="text-sm text-gray-500">typing...</span>
                    </div>
                    <div ref={scrollRef}></div>
                  </>
                )}
              </div>

              {/* message input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 justify-between border rounded-full py-2.5 px-4 m-5 relative"
              >
                <span
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="cursor-pointer hover:opacity-60"
                >
                  <EmojiEmotionsIcon
                    sx={{ fontSize: "1.5em", color: "#1B192E" }}
                  />
                </span>

                {showEmojis && (
                  <div className="absolute bottom-14 -left-10">
                    <Picker
                      set="google"
                      onSelect={(e) => setMessage(message + e.native)}
                      title="Emojis"
                    />
                  </div>
                )}

                <input
                  className="flex-1 outline-none text-sm"
                  type="text"
                  placeholder="Message..."
                  value={message}
                  onFocus={() => setShowEmojis(false)}
                  onChange={handleTyping}
                  required
                />
                {message.trim().length > 0 ? (
                  <button className="text-primary-blue font-medium text-sm">
                    Send
                  </button>
                ) : (
                  <>
                    <PetsIcon
                      onClick={(e) => handleSubmit(e, "🐾")}
                      sx={{
                        fontSize: "1.5em",
                        color: "#5b064a",
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}
              </form>
            </div>
          )}
        </div>

        <SearchModal open={showSearch} onClose={handleModalClose} />
      </div>
    </>
  );
};

export default Inbox;
