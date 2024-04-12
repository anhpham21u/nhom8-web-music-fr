import React from 'react';

const Comment = ({ username, content, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">{username}</span>
        <span className="text-gray-500 text-sm">{createdAt}</span>
      </div>
      <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default Comment;
