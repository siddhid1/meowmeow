import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  pd: string;
  id:number;
}

export const BlogCard = ({id, authorName, title, content, pd }: BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
    <div className="border border-slate-200 pd-4 w-screen-md cursor-pointer">
      <div className="flex">
          <Avatar size={"small"} name={authorName} />
        </div>
        <div className="front-extralight bg-red-300">{authorName}</div>{" "}
        <div className="pl-2 font-thin">{pd}</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "...."}</div>
      <div className="text-slate-400">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
      <div className="bg-slate-200 h-1 w-full"></div>
  </Link>
  
};

export function Avatar({ name ,size="small" }: { name: string, size:"small"|"big" }) {
  return(
    <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h10"}overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size==="small"?"text-xs":"text-md"} font-medium text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}
