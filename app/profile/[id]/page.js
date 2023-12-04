"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';

const UserProfile = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        const response = await (await fetch(`/api/users/${id}/posts`)).json();
        setPosts(response);
    }
    return (
        <>
            {
                posts &&
                <Profile name={`${posts[0]?.creator.username}'s`} desc="Welcome to your personalized profile page" data={posts} />
            }
        </>
    )
}

export default UserProfile