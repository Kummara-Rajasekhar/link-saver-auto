import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import BookmarkCard from './components/BookmarkCard';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const res = await axios.get('/api/bookmarks', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setBookmarks(res.data);
  };

  const addBookmark = async () => {
    await axios.post('/api/bookmarks', { url }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setUrl('');
    fetchBookmarks();
  };

  const deleteBookmark = async (id) => {
    await axios.delete(`/api/bookmarks/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    fetchBookmarks();
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser(true);
      fetchBookmarks();
    }
  }, []);

  if (!user) return <Login setUser={setUser} fetchBookmarks={fetchBookmarks} />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">🔖 Link Saver + Auto-Summary</h1>
      <div className="flex gap-2 mb-4">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="border px-2 py-1 rounded w-full" />
        <button onClick={addBookmark} className="bg-blue-500 text-white px-4 rounded">Add</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bm) => <BookmarkCard key={bm._id} bookmark={bm} onDelete={deleteBookmark} />)}
      </div>
    </div>
  );
};

export default App;