"use client"
import React, { useState } from 'react'
import Form from '@components/Form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CreatePrompt = () => {
    const [status, setStatus] = useState(false);
    const [post, setPost] = useState({prompt: '', tag: ''});
    const {data: session} = useSession();
    const router = useRouter();

    const createAndEditPrompt = async (e)=>{
        e.preventDefault();
        setStatus(true);

        try {
        const response = await fetch('/api/prompt/new',{
            method: "POST",
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag
            })
        })     
        if(response.ok){
            router.push('/');
        }
        } catch (error) {
            console.log(error);
        }finally{
            setStatus(false);
        }
    }
  return (
    <div>
        <Form type="Create" post={post} status={status} createAndEditPrompt={createAndEditPrompt} setPost={setPost}/>
    </div>
  )
}

export default CreatePrompt;