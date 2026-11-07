import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {getCategories} from '../../api/api.js'
import { productsPageStyles as s } from "../../assets/dummyStyles.jsx";

function ProductsPage() {
  const [categories, setCategories]=useState([]);
useEffect(()=>{

    const fetchCategories =async()=>{
        try {
            const {data} = await getCategories();
            setCategories(data.categories || []);
        } catch (error) {
            console.error(error);
            setCategories([]);
        }
    };
    fetchCategories();
},[]);
return(
    <section className={s.section} id="products">
<div className="pointer-events-none absolute inset-0" style={s.gradientBackground}/>

<div className={s.innerContainer} >
    <div className={s.grid}>
{categories.map((category, index) => (
    <Link 
        className={s.categoryLink} 
        key={category._id} 
        to={`/product/${encodeURIComponent(category.categoryName)}`} 
        style={{
            animation: `fadeUp 0.6s ease both`, 
            animationDelay: `${index * 60}ms`,
        }}
    >
     <img className={s.categoryImage} src={typeof category.image === "string" ? category.image : category.image?.url} alt={category.categoryName} />

        <h3 className={s.categoryName}>{category.categoryName}

        </h3>
    </Link>
))}
    </div>
</div>
    </section>
);
}

export default ProductsPage;