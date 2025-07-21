import React from 'react';

const BookmarkCard = ({ bookmark, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow">
      <div className="flex items-center gap-2">
        {bookmark.favicon && <img src={bookmark.favicon} alt="favicon" className="w-5 h-5" />}
        <h3 className="font-semibold">{bookmark.title}</h3>
      </div>
      <p className="text-sm mt-2 text-gray-700">{bookmark.summary}</p>
      <button onClick={() => onDelete(bookmark._id)} className="text-red-500 text-sm mt-2">Delete</button>
    </div>
  );
};

export default BookmarkCard;