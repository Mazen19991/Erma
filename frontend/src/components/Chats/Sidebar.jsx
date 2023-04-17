import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getAllChats } from "../../actions/chatAction";
import ChatListItem from "./ChatListItem";
import SkeletonUserItem from "../Layouts/SkeletonUserItem";
import { Skeleton } from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

const Sidebar = ({ openModal, socket }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.user);
  const { loading, error, chats } = useSelector((state) => state.allChats);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllChats());
  }, [dispatch, error, params.chatId]);

  return (
    <>
      <div className="hidden sm:flex flex-col h-full w-2/6 border-r">
        <div className="flex items-center justify-between border-b p-4">
          <span className="mx-auto font-medium cursor-pointer">
            {user.username}
          </span>
          <RateReviewOutlinedIcon
            onClick={openModal}
            sx={{ Color: "#1B192E", cursor: "pointer" }}
          />
        </div>

        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
          <span className="px-4 py-2 font-medium">
            Chats with your pet friends
          </span>

          {/* {loading &&
                        Array(10).fill("").map((el, i) => (
                            <div className="flex items-center gap-2 py-2 px-4" key={i}>
                                <Skeleton animation="wave" variant="circular" width={65} height={50} />
                                <div className="flex flex-col gap-0 w-full">
                                    <Skeleton height={23} width="85%" animation="wave" />
                                    <Skeleton height={23} width="60%" animation="wave" />
                                </div>
                            </div>
                        ))
                    } */}

          {chats?.map((c) => (
            <ChatListItem {...c} key={c._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
