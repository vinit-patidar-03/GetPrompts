"use client"
import React,{ useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(session?.user.id){
            fetchPosts(session?.user.id);
        }
    },[session?.user.id]);

    const fetchPosts = async (id) => {
        const response = await (await fetch(`/api/users/${id}/posts`)).json();
        setPosts(response);
    }

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id}`,{
                    method : "DELETE"
                })

                const filteredPosts = post.filter((p)=>p._id !== post._id);
                setPosts(filteredPosts);
            } catch (erro) {
                
            }
        }
    }

   return (
     <Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default ProfilePage