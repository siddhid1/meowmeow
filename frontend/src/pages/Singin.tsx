
import { Quote } from "../components/Quotes"
import {Auth} from "../components/Auth"
export const Signin= ()=>{
    return <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <Auth type="signin"/>

            </div>
            <div className="invisible md:visible">
            <Quote/>

            </div>

        </div>
        
    </div>
}