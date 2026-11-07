import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchResults from "../../components/SearchResults/SearchResults";
import HookahPage from "../../components/HookahPage/HookahPage";
import Footer from "../../components/Footer/Footer";
const Hookah=()=>{
    const [searchParams]= useSearchParams();
    const query = searchParams.get("g")||"";
    const isSearching = query.trim().length>0;
    return(
        <div>
            <Navbar/>
            {isSearching ? <SearchResults query={query}/> : <HookahPage expanded /> }
               <Footer/>
        </div>
    );
};
export default Hookah;