import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';

const Comment = () => {
  const user = useSelector((state) => state.user.data);
  const currentIndex = useSelector((state) => state.queue.current);
  const queue = useSelector((state) => state.queue.list);
  const song = queue[currentIndex];
  const [commentText, setCommentText] = useState('');

  // Danh sách bình luận giả lập
  const comments = [
    { id: 1, user: 'Alice', text: 'This is a great article!' },
    { id: 2, user: 'Bob', text: 'I found this very helpful.' },
    { id: 3, user: 'Charlie', text: 'Thanks for sharing!' },
  ];

  useEffect(() => {
    console.log(user);
  }, [song, user]);

  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await axios.get(`/songs?sort=-plays&limit=5`);
  //     const res2 = await axios.get(`/songs?sort=-createdAt&limit=5`);

  //     setTopSongs(res.data.data.songs);
  //     setNewReleases(res2.data.data.songs);
  //   };

  //   fetcher();
  // }, []);

  /**
  * Hàm xử lý binh luận
  */
  const handleComment = async (e) => {
    e.preventDefault();

    if (song, user) {
      await axios.post(`/comments/`, {
        // songId, userId, comment
        songId: song.id,
        userId: user.id,
        comment: commentText,
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
          <div key={comment.id} className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white shadow-sm">
            <p className="font-semibold text-[#1DB954]">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
