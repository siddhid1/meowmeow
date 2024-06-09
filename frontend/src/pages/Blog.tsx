import { FullBlog } from "../components/MainBlog";
import{useBlog} from "../hooks";
import { useParams } from "react-router-dom";
//atomFamilies/selectorFamilies

export const Blog= ()=>{
    const {id} = useParams();
    const{loading,blog} = useBlog({
        id:id||""
    });
    if(loading || !blog){
        return <div>
            loading re mg pare skeleton aasi ba
        </div>
    }
    return <div>
            <FullBlog blog={blog }/>
    </div>
}