import { Blog } from "../hooks"
import { Appbar } from "./Appbar"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar/>
        <div className="grid grid-cols-12 px-10 w-full bg-yellow-200 pt-12">
            <div className="col-span-8 bg-blue-100">
                au bando kimiti
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500">
                    Posted on hua hoga bc kabhi ek
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4 bg-red-100 ">
                aapan mane khushi ta
                {blog.author.name||"  by tera baap"}
            </div>
        </div>
    </div>
}