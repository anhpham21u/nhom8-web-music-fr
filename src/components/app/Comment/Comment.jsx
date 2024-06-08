import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const Comment = () => {
  const user = useSelector((state) => state.user.data);
  const currentIndex = useSelector((state) => state.queue.current);
  const queue = useSelector((state) => state.queue.list);
  const song = queue[currentIndex];
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  /**
  * Hàm xử lý GET các bình luận
  */
  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/comments/${song.id}`);
      setComments(res.data);
    };

    fetcher();
  }, [song]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    // // Lắng nghe sự kiện 'message' từ server
    socket.on('test', (msg) => {
      console.log(msg);
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
      <h1 className="text-2xl font-bold mb-6 text-white">Bình luận</h1>

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
          <div key={comment._id} className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white shadow-sm">
            <p className="font-semibold text-[#1DB954]">{comment.userId.name}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
