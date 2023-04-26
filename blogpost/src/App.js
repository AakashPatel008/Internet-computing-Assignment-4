import { useState, useEffect } from 'react';
import './App.css';

function App() {
const [posts, setPosts] = useState([]);

useEffect(() => {
fetch('posts.xml')
.then(response => response.text())
.then(data => {
const parser = new DOMParser();
const xml = parser.parseFromString(data, 'application/xml');
const posts = Array.from(xml.querySelectorAll('post'), post => ({
title: post.querySelector('title').textContent,
date: post.querySelector('date').textContent,
author: post.querySelector('author').textContent,
summary: post.querySelector('summary').textContent,
image: post.querySelector('image').textContent,
body: post.querySelector('body').textContent,
}));
setPosts(posts);
})
.catch(error => console.error(error));
}, []);

const [selectedPost, setSelectedPost] = useState(null);

function handlePostClick(post) {
setSelectedPost(post);
}

function handleCloseClick() {
setSelectedPost(null);
}

const [apiContent, setApiContent] = useState("");

useEffect(() => {
const intervalId = setInterval(() => {
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(data => setApiContent(data.title))
.catch(error => console.error(error));
}, 60000);
return () => clearInterval(intervalId);
}, []);

return (
<div className="App">
<header className="App-header">
<h1>Anime Blog....</h1>
</header>
<section className="App-main">
<div className="App-posts">
{posts.map((post, index) => (
<div key={index} className="App-post">
<h2><a href="#" onClick={() => handlePostClick(post)}>{post.title}</a></h2>
<p>{post.date} by {post.author}</p>
<img src={post.image} alt={post.title} className="App-post-image" />
<p className="App-post-summary">{post.summary}</p>
</div>
))}
</div>
<aside className="App-sidebar">
<a href="#">Home</a><br></br>
<a href="#" onClick={() => window.open('https://news.google.com/', '_blank')}>Google News</a><br></br>
<a>TO SEE THE COMPELETE POST CLICK ON THE TITLE AND SCROLL DOWN TILL END OF THE PAGE</a> 
</aside>
</section>
{selectedPost && (
<div className="App-modal">
<div className="App-modal-content">
<h2>{selectedPost.title}</h2>
<p>{selectedPost.date} by {selectedPost.author}</p>
<img src={selectedPost.image} alt={selectedPost.title} className="App-post-image" />
<p>{selectedPost.body}</p>
<button className="App-close-modal" onClick={handleCloseClick}>Close</button>
</div>
</div>
)}

<footer className="App-footer">
<p>© Anime Blog Website.</p>
</footer>
</div>
);
}

export default App;