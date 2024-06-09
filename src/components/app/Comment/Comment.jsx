import React, { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const Comment = () => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const user = useSelector((state) => state.user.data);
  const currentIndex = useSelector((state) => state.queue.current);
  const queue = useSelector((state) => state.queue.list);
  const song = queue[currentIndex];
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const commentsRef = useRef(comments); // Tạo ref cho comments

  /**
  * Hàm xử lý GET các bình luận
  */
  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/comments/${song.id}`);
      setComments(res.data);
      commentsRef.current = res.data; // Cập nhật ref với comments vừa fetch
    };

    fetcher();
  }, [song]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    socket.on('new message', (msg) => {  // msg: same form as get comments response
      if (msg.songId !== song.id) {
        return;
      }

      setComments((prevComments) => {
        const newComments = [msg, ...prevComments];
        commentsRef.current = newComments; // Cập nhật ref với comments mới
        return newComments;
      });
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  /**
  * Hàm xử lý binh luận
  */
  const handleComment = async (e) => {
    e.preventDefault();

    if (song, user, commentText.trim() !== '') {
      await axios.post(`/comments/`, {
        // songId, userId, comment
        songId: song.id,
        userId: user.id,
        comment: commentText.trim(),
      });
      setCommentText('');
      toast.success('Bạn đã comment thành công');
      return;
    }
    
    toast.error('Comment không thành công');
  };

  return (
    <div className='pt-[9.4rem] pr-[2.4rem] pb-[2.4rem] pl-[2.4rem] bg-black min-h-screen'>
      <h1 className="text-2xl font-bold mb-6 text-white">Bình luận <span className='text-[#1DB954] text-3xl'>{ song.name }</span></h1>

      {/* Input comment */}
      <form onSubmit={handleComment} className="mb-6">
        <div className="mb-4">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            type="text"
            className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            placeholder="Enter your comment"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Send"
            className="w-full p-2 bg-[#1DB954] text-white rounded-lg cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>
      </form>

      {/* List comment */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white shadow-sm flex justify-between items-start">
            <div>
              <p className="font-semibold text-[#1DB954]">{comment.userId.name}</p>
              <p className='break-all mt-2'>{comment.comment}</p>
              <p className="text-gray-500 text-[12px] mt-3">{(new Date(comment.createdAt)).toLocaleDateString('vi-VN', options)}</p>
            </div>
            {/* <button
              className="ml-4 p-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 focus:outline-none"
            >
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
