"use client"
import React, { useEffect, useState } from 'react';
import Promptcard from './PromptCard';

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts,setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(()=>{
        fetchPosts();
    },[]);

    const fetchPosts = async () => {
        const response = await (await fetch('/api/prompt')).json();
        setPosts(response);
        setFilteredPosts(response);
    }

    const filterPosts = (value) => {
        if(value === ""){
            setFilteredPosts(posts);
        }else{
            setFilteredPosts(posts.filter((post)=>{
                return post.tag.toLowerCase().includes(value.toLowerCase()) || post.prompt.toLowerCase().includes(value.toLowerCase()) || post.creator.username.includes(value.toLowerCase());
            }))
        }
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        filterPosts(e.target.value);
    }

    const handleTagClick = (tagValue) => {
        filterPosts(tagValue);
        setSearchText(tagValue);
    }
    
  return (
    <section className='feed'>
        <form className="relative w-full flex-center">
            <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearch} required className='search_input peer' />
        </form>
        <div className="mt-16 prompt_layout">
            {
                filteredPosts && 
                    filteredPosts.map((post,index)=>{
                        return <Promptcard post={post} key={post._id} handleTagClick={handleTagClick}/>
                    })
            }
        </div>
        {filteredPosts.length === 0 && <h1 className='text-center'>No records found</h1>}
    </section>
  )
}

export default Feed