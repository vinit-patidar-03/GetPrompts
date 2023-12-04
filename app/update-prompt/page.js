"use client"
import React, { useEffect, useState } from 'react'
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

const CreatePrompt = () => {
    const [status, setStatus] = useState(false);
    const [post, setPost] = useState({prompt: '', tag: ''});
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(()=>{
        getPromptDetails(promptId);
    },[promptId])

    const getPromptDetails = async (promptId) => {
        const response = await (await fetch(`/api/prompt/${promptId}`)).json();
        setPost({prompt: response.prompt, tag: response.tag});
    }

    const createAndEditPrompt = async (e) => {
        e.preventDefault();
        setStatus(true);

        try {
          const response = await fetch(`/api/prompt/${promptId}`,{
            method: "PATCH",
            body: JSON.stringify({
              prompt: post.prompt,
              tag: post.tag
            })
          })

          if(response.ok){
            router.push('/');
          }
        } catch (error) {
          console.log(error);
        }
        finally{
          setStatus(false);
        }
    }

  return (
    <div>
        <Form type="Edit" post={post} status={status} createAndEditPrompt={createAndEditPrompt} setPost={setPost}/>
    </div>
  )
}

export default CreatePrompt;