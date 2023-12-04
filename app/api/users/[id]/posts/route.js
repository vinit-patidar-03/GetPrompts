import { connectToMongoDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (request,{params})=>{
    try {
        await connectToMongoDB();
        const Prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(Prompts), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
    }
}