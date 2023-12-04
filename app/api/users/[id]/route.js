import User from "@models/user";
import { connectToMongoDB } from "@utils/db";

export const GET = async (request,{params}) => {
    console.log(params);
    try {
        await connectToMongoDB();

        const user = await User.findById(params.id);
        
        if(!user){
            return new Response("User not Found", {status: 404});
        }

        return new Response(JSON.stringify(user), {status: 200});
    } catch (error) {
        return new Response("Internal Server Error");
    }
}