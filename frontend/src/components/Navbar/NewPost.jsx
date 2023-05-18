import { Dialog, LinearProgress, colors } from "@mui/material";
import { Picker } from "emoji-mart";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewPost, clearErrors } from "../../actions/postAction";
import { NEW_POST_RESET } from "../../constants/postConstants";
import { emojiIcon } from "../Home/SvgIcons";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { BASE_PROFILE_IMAGE_URL } from "../../utils/constants";
import AddTags from "../Layouts/AddTags";

const NewPost = ({ newPost, setNewPost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newPost);
  const { user } = useSelector((state) => state.user);

  const [postImage, setPostImage] = useState("");
  const [postPreview, setPostPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [dragged, setDragged] = useState(false);

  const handleDragChange = () => {
    setDragged(!dragged);
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    setPostImage("");
    setPostPreview("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setPostImage(e.target.files[0]);
  };

  const newPostSubmitHandler = (e) => {
    e.preventDefault();
    if (!postImage) {
      toast.error("Select Image");
      return;
    }
    if (!caption.trim()) {
      toast.error("Empty Caption");
      return;
    }

    const formData = new FormData();

    formData.set("caption", caption);
    formData.set("post", postImage);

    dispatch(addNewPost(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Post Shared");
      dispatch({ type: NEW_POST_RESET });
      setNewPost(false);
      navigate("/");

      setPostImage("");
      setPostPreview("");
      setCaption("");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <Dialog open={newPost} onClose={() => setNewPost(false)} maxWidth='xl'>
      <div className='flex flex-col sm:w-screen max-w-4xl'>
        <div
          style={{ backgroundColor: "#5b064a" }}
          className='bg-white py-3 border-b px-4 flex justify-between w-full'
        >
          <span style={{ color: "#ffebeb" }} className='font-medium'>
            Create new post
          </span>
          <button
            onClick={newPostSubmitHandler}
            disabled={loading}
            className=' font-medium'
            style={{ color: "#ffebeb" }}
          >
            Share
          </button>
        </div>
        {loading && <LinearProgress />}

        <div className='flex sm:flex-row sm:items-start items-center flex-col w-full'>
          {postImage ? (
            <div className='bg-black h-48 sm:h-[80vh] w-full'>
              <img
                draggable='false'
                className='object-contain h-full w-full'
                src={postPreview}
                alt='post'
              />
            </div>
          ) : (
            <div
              onDragEnter={handleDragChange}
              onDragLeave={handleDragChange}
              className={`${
                dragged && "opacity-40"
              } relative bg-white h-36 sm:h-[80vh] w-full flex flex-col gap-2 items-center justify-center mx-16`}
            >
              <AddToPhotosIcon sx={{ color: "#5b064a", fontSize: "3em" }} />
              <p style={{ color: "#5b064a" }} className='text-xl'>
                Drag photos and videos here
              </p>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='absolute h-full w-full opacity-0'
              />
            </div>
          )}

          <div className='flex flex-col border-l sm:h-[80vh] w-full bg-white'>
            <div className='flex gap-3 px-3 py-2 items-center'>
              <img
                draggable='false'
                className='w-11 h-11 rounded-full object-cover'
                src={BASE_PROFILE_IMAGE_URL + user.avatar}
                alt='avatar'
              />
              <span className='text-black text-sm font-semibold'>
                {user.username}
              </span>
            </div>

            <div className='p-3 w-full border-b relative'>
              <label className='block mb-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='block w-full text-sm text-slate-500 
                                    file:mr-3 file:py-2 file:px-6
                                    file:rounded-full file:border-0
                                    file:text-sm file:cursor-pointer file:font-semibold
                                    file:bg-[#ffebeb] file:text-[#5b064a]
                                    hover:file:bg-purple-200
                                    '
                />
              </label>
              <textarea
                className='outline-none resize-none h-32 sm:h-auto pl-2 pt-2'
                placeholder='Write a caption...'
                name='caption'
                cols='40'
                rows='12'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                onClick={() => setShowEmojis(false)}
              ></textarea>
              <div className=' h-12 flex items-center pl-2'>
                <AddTags />
              </div>
              <div className='flex items-center justify-between'>
                <span
                  onClick={() => setShowEmojis(!showEmojis)}
                  className='cursor-pointer '
                >
                  {emojiIcon}
                </span>

                {showEmojis && (
                  <div className='absolute bottom-10 -left-20'>
                    <Picker
                      set='google'
                      onSelect={(e) => setCaption(caption + e.native)}
                      title='Emojis'
                    />
                  </div>
                )}

                <button
                  onClick={newPostSubmitHandler}
                  disabled={loading}
                  style={{ backgroundColor: "#ffebeb" }}
                  className='text-[#5b064a] px-6 py-1.5 rounded font-medium hover:drop-shadow-lg uppercase text-sm tracking-wider'
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewPost;
