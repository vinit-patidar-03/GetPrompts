import React from 'react';
import Link from 'next/link';

const Form = ({ type, post, status, createAndEditPrompt, setPost }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
         <h1 className='head_text text-left'>
         <span className="blue_gradient">{type} Post</span>
         </h1>
         <p className="desc text-left max-w-md">
            {type} and share amazing prompts with the world, and let your imagination run wild wit any AI-Powered platform.
         </p>

         <form onSubmit={createAndEditPrompt} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Your AI Prompt
                </span>

                <textarea name="Prompt" id="Prompt" cols="30" rows="10" value={post.prompt} onChange={(e)=>{setPost({...post, prompt: e.target.value})}} placeholder='Write your prompt here...' className='form_textarea' required></textarea>
            </label>
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Tag
                    <span> (Coding, MernStack, NextJS, ProductDevelopment)</span>
                </span>

                <input name="Tag" id="Tag" value={post.tag} onChange={(e)=>{setPost({...post, tag: e.target.value})}} placeholder='Add your tags here...' className='form_input' required></input>
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className='text-gray-500 text-sm'>cancel</Link>
                <button type='submit' className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white' disabled={status}>{status ? `${type}...` : type}</button>
            </div>
         </form>
    </section>
  )
}

export default Form