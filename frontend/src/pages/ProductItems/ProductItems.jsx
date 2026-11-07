import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchResults from "../../components/SearchResults/SearchResults";
import ProductItemsPage from "../../components/ProductItemsPage/ProductItemsPage";
import { useSearchParams } from "react-router-dom";

const ProductItems=()=>{
    const [searchParams]= useSearchParams();
    const query = searchParams.get("q")||"";
    const isSearching = query.trim().length>0;

    return(
           <div>
            <Navbar/>
            {isSearching ? <SearchResults query={query}/> : <ProductItemsPage expanded /> }
            <Footer/>
        </div>
    );
};
export default ProductItems;