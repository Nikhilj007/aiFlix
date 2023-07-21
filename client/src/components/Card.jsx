/* eslint-disable react/prop-types */
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from "react-icons/ti";
import { TfiComment } from "react-icons/tfi";
import { BiPlayCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiTwotoneDelete, AiOutlineSend } from "react-icons/ai";

function Card({
  likes,
  dislikes,
  title,
  description,
  comments,
  path,
  createdAt,
  _id,
}) {
  const date = createdAt.split("T")[0];
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [commentsc, setComments] = useState(comments);
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleUpdate = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'likes': likeCount, 'dislikes': dislikeCount, 'comments': commentsc, "_id" :_id}),
        });
  
        if (response.ok) {
          console.log('updated !!')
        } else {
          console.error('Failed to update likes');
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
  };
  return (
    <div className="flex bg-black flex-col mb-7 h-fit  align-top gap-2  p-4 rounded-lg">
      <div className="text-3xl text-center">{title}</div>
      <Link to="/play" state={path}>
        <div className="hover:cursor-pointer flex justify-center relative">
          <img src="https://picsum.photos/300/200" alt="thumbnail" />
          <Link to="/play" state={path}>
            <div className="absolute top-[45%] right-[45%] text-black text-3xl">
              <BiPlayCircle />
            </div>
          </Link>
        </div>
      </Link>
      <span className="text-sm text-gray-600">{date}</span>
      <div>{description}</div>
      <div className="flex justify-around text-lg align-middle">
        <div
          onClick={() => {
            setLikeCount(likeCount + 1);
            setLike(!like);
            handleUpdate();
          }}
          className="flex gap-1 hover:cursor-grabbing"
        >
          {like ? (
            <TiArrowUpThick className="text-2xl" />
          ) : (
            <TiArrowUpOutline className="text-2xl" />
          )}
          <span className="-mt-1">{likeCount}</span>
        </div>
        <div
          onClick={() => {
            setDislikeCount(dislikeCount + 1);
            setDislike(!dislike);
            handleUpdate();
          }}
          className="flex gap-1 hover:cursor-grabbing"
        >
          {dislike ? (
            <TiArrowDownThick className="text-2xl" />
          ) : (
            <TiArrowDownOutline className="text-2xl" />
          )}
          <span className="-mt-1">{dislikeCount}</span>
        </div>
        <div
          onClick={() => setShowInput(!showInput)}
          className="flex gap-1 hover:cursor-grabbing"
        >
          <TfiComment />
          <span className="-mt-1.5">{commentsc.length}</span>
        </div>
      </div>
      {showInput && (
        <div className="max-h-32 overflow-auto">
          <div className="text-center border rounded-sm border-black mt-2">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className={"focus:outline-none w-full text-center p-2"}
              placeholder="type your comment here"
            />
          </div>
          <button
            onClick={() => {
              if (comment !== "") setComments((prev) => [...prev, comment]);
              setComment("");
              handleUpdate();
            }}
            className="flex hover:cursor-default justify-end text-2xl p-5 w-full"
          >
            <AiOutlineSend className="hover:cursor-pointer" />
          </button>
          {commentsc.map((cmnt, i) => (
            <div
              key={i}
              className={"border  px-5 py-3 rounded-md flex justify-between"}
            >
              <div>
                <div className="text-sm">Random User</div>
                {cmnt}
              </div>
              <button
                // eslint-disable-next-line react/no-unknown-property
                jey={i}
                onClick={(e) => {
                  const a =
                    e.target.parentElement.parentElement.getAttribute("jey");
                  setComments((prev) => prev.filter((_, i) => i != a));
                  handleUpdate();
                }}
                className="text-2xl px-2"
              >
                <AiTwotoneDelete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
