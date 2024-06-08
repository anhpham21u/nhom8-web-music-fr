import React from 'react';

const Comment = () => {
  // Danh sách bình luận giả lập
  const comments = [
    { id: 1, user: 'Alice', text: 'This is a great article!' },
    { id: 2, user: 'Bob', text: 'I found this very helpful.' },
    { id: 3, user: 'Charlie', text: 'Thanks for sharing!' },
  ];

  return (
    <div className='pt-[9.4rem] pr-[2.4rem] pb-[2.4rem] pl-[2.4rem] bg-black min-h-screen'>
      <h1 className="text-2xl font-bold mb-6 text-white">Bình luận</h1>
      
      {/* Input comment */}
      <div className="mb-6">
        <div className="mb-4">
          <input 
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
      </div>

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
