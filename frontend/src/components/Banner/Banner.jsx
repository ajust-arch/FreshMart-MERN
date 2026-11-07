import { ArrowRight, BadgePercent,Leaf, Sparkles,Truck, Star } from "lucide-react";

import {bannerData, BannerCluster} from './bannerData.jsx';
import {bannerStyles as s} from '../../assets/dummyStyles.jsx';

const iconMap ={
    Leaf,BadgePercent,Truck,Sparkles,Star
};
const Banner =()=>{
    return(
        <section className={s.bannerSection}>
            <div className={s.container}>
<div className={s.innerContainer}>
<div className="absolute inset-0" style={s.decorGradient1}/>
<div className="absolute inset-0" style={s.decorGradient2}/>

<div className={s.gridContainer} >
<div  className={s.leftColumn}>

<div  className={s.badge}>
<Sparkles className={s.iconSmall}/>
{bannerData.badge}

</div>

<div className={s.headingWrapper}>
<h1 className={s.heading}>{bannerData.heading.line1}
    <span className={s.headingHighlight}>
{bannerData.heading.line2}
    </span>
</h1>

<p className={s.description}>{bannerData.description}</p>
</div>
<div className={s.buttonsWrapper}>

<button className={s.primaryButton}>
{bannerData.buttons[0].label}
<ArrowRight className={s.iconSmall}/>
</button>

<button className={s.secondaryButton}>
    <Leaf className={s.iconSmall}/>
{bannerData.buttons[1].label}

</button>

</div>

<div className={s.cardsContainer}>
{bannerData.cards.map((item)=>{
    const Icon = iconMap[item.icon];
    return (
        <div key={item.title} className={s.card}>

<Icon className={s.cardIcon}/>
<p className={s.cardTitle}> {item.title}</p>
<p className={s.cardText}>
    {item.text}
</p>
            </div>
    )
})}
</div>

<div className={s.trustMessage}>
<Star className={s.starIcon}/>
<span>
Trusted by thousands of customers for quality and freshness
</span>
</div>

</div>
<div className={s.rightColumn}>
<BannerCluster images={bannerData.images}/>
</div>
</div>

</div>
            </div>
            </section>
            )
        };
        export default Banner;