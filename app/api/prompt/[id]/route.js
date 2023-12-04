import { connectToMongoDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (request, {params})=>{

    try {
        await connectToMongoDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response("Prompt not Found",{status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 201});
    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500})
    }
}

export const PATCH = async (request, {params})=>{
    const { prompt, tag } = await request.json();
    try {
        await connectToMongoDB();
        const oldPrompt = await Prompt.findById(params.id);

        if(!oldPrompt){
            return new Response("Prompt not Found",{status: 404});
        }

        oldPrompt.prompt = prompt;
        oldPrompt.tag = tag;

        await oldPrompt.save();

        return new Response(JSON.stringify(oldPrompt),{status: 200});
    } catch (error) {
        return new Response("Failed to Update the prompt", {status: 500});
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToMongoDB();
        
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompted Deleted Successfully",{status: 200});
    } catch (error) {
        return new Response("Error Occured",{status: 500});
    }
}