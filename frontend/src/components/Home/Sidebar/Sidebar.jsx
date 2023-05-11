import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPostsOfFollowing } from "../../../actions/postAction";
import {
  clearErrors,
  getSuggestedUsers,
  loadUser,
} from "../../../actions/userAction";
import { POST_FOLLOWING_RESET } from "../../../constants/postConstants";
import { FOLLOW_USER_RESET } from "../../../constants/userConstants";
import { BASE_PROFILE_IMAGE_URL } from "../../../utils/constants";
import SkeletonUserItem from "../../Layouts/SkeletonUserItem";
import UserListItem from "./UserListItem";
import MultipleSelectCheckmarks from "../../Layouts/MultipleSelect";

const Sidebar = () => {
  const [tagsArray, setTagsArray] = useState([])
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { tags } = useSelector((state) => state.postOfFollowing);
  // const tag = Object.values(tags);
  const {
    error: followError,
    success,
    message,
  } = useSelector((state) => state.followUser);

  useEffect(() => {
   
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSuggestedUsers());
  }, [dispatch, error]);

  useEffect(() => {
    if (followError) {
      toast.error(followError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      // dispatch({ type: POST_FOLLOWING_RESET });
      // dispatch(getPostsOfFollowing());
      dispatch({ type: FOLLOW_USER_RESET });
    }
  }, [success, followError]);

  useEffect(() => {
    if(tags !== undefined){
      setTagsArray(tags)
  }
  }, [tags])
  return (
    <div
      style={{
        paddingTop: 10,
        paddingX: 35,
        paddingBottom: 5,
        backgroundImage: `white`,
        borderRadius: 25,
      }}
      className="fixed lg:right-32 xl:right-56 w-3/12 h-full hidden lg:flex flex-col flex-auto mt-12 pr-8 -z-1"
    >
      <div
        style={{ backgroundColor: "#fff", marginTop: 40, borderRadius: 25 }}
        className="ml-10 flex flex-col p-2 shadow-lg"
      >
        <MultipleSelectCheckmarks array={tagsArray}></MultipleSelectCheckmarks>
        {/* <!-- self profile card --> */}
        <div
          style={{
            marginTop: 25,
            backgroundColor: "#ffebeb",
            borderRadius: 10,
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          className="flex justify-between items-center"
        >
          <div className="flex flex-auto space-x-4 items-center">
            <Link to={`/${user.username}`}>
              <img
                draggable="false"
                className="w-14 h-14 rounded-full object-cover"
                src={BASE_PROFILE_IMAGE_URL + user.avatar}
                alt={user.name}
              />
            </Link>
            <div className="flex flex-col">
              <Link
                to={`/${user.username}`}
                className="text-[#5b064a] text-sm font-semibold"
              >
                {user.username}
              </Link>
              <span className="text-gray-400 text-sm">{user.name}</span>
            </div>
          </div>
          <span className="text-[#5b064a] text-xs font-semibold cursor-pointer">
            Switch
          </span>
        </div>

        {/* <!-- suggestions --> */}
        <div
          style={{
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          className="flex justify-between items-center mt-12"
        >
          <p className="font-semibold text-gray-500 text-sm">
            Pet Suggestions For You
          </p>
          <span className="text-[#5b064a] text-xs font-semibold cursor-pointer">
            See All
          </span>
        </div>

        {/* <!-- suggested profile lists --> */}
        <div
          style={{
            marginTop: 25,
            backgroundColor: "#ffebeb",
            borderRadius: 10,
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          className="flex flex-col flex-auto mt-3 space-y-3.5 text-[#5b064a]"
        >
          {loading
            ? Array(5)
                .fill("")
                .map((el, i) => <SkeletonUserItem key={i} />)
            : users?.map((user) => <UserListItem {...user} key={user._id} />)}
        </div>

        {/* <!-- sidebar footer container--> */}
        <div
          style={{
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          className="flex flex-col mt-8 space-y-6 text-xs text-gray-400"
        >
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              {[
                "About",
                "Help",
                "Press",
                "API",
                "Jobs",
                "Privacy",
                "Terms",
                "Locations",
              ].map((el, i) => (
                <a href="#" key={i}>
                  {el}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-1.5">
              {["Top Accounts", "Hashtags", "Language"].map((el, i) => (
                <a href="#" key={i}>
                  {el}
                </a>
              ))}
            </div>
          </div>
          <span>&copy; {new Date().getFullYear()} ERMA</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
