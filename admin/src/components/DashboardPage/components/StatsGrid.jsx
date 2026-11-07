import { statsGridStyles as s } from "../../../assets/dummyStyles";

const StatsGrid = ({ cards }) => (
  <div className={s.grid}>
    {cards.map(({ title, value, sub, icon: Icon }) => (
      <article key={title} className={s.card}> {/* 👈 Use s.card here for the box styling */}
        
        <div className={s.cardInner}> {/* 👈 Use s.cardInner here for flex layout */}
          <div>
            <p className={s.cardTitle}>{title}</p>
            <h2 className={s.cardValue}>{value}</h2>
          </div>

          <span className={s.cardIconWrapper}>
            <Icon className={s.cardIcon} />
          </span>
        </div>

        <p className={s.cardSubtext}>{sub}</p>

      </article>
    ))}
  </div>
);

export default StatsGrid;