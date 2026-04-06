import {type CSSProperties } from "react";
import { fmt } from "./MoneyFlow";
import { useAppSelector } from "./redux/store/hooks";
import { selectSpendBreakdown } from "./redux/store/selectors";



export const SpendingBreakDown = () => {
  const spending = useAppSelector(selectSpendBreakdown);

  

    return(
              <div className="min-w-lg bg-white">
                <div style={styles.breakdown}>
                  <div style={styles.sectionLabel}>Spending breakdown</div>
                  {spending.map((item) => (
                    <div key={item.category} style={styles.brow}>
                      <div style={styles.bcat}>
                        <span style={{ ...styles.bdot, background: item.color }} />
                        {item.category}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={styles.bamt}>{fmt(item.amount)}</div>
                        <div style={styles.barOuter}>
                          <div
                            style={{ ...styles.barInner, width: `${item.pct}%`, background: item.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
        
              </div>
    )
}


const styles: Record<string, CSSProperties> = {
  dash:          { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", padding: "1.5rem", background: "#f5faf5", minHeight: "100vh" },
  cardGrid:      { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "1.5rem" },
  card:          { background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  cardLabel:     { fontSize: 12, color: "#8a9e8a", marginBottom: 6 },
  cardValue:     { fontSize: 22, fontWeight: 500, color: "#162416" },
  cardSub:       { display: "flex", alignItems: "center", gap: 6, marginTop: 6 },
  cardSubText:   { fontSize: 12, color: "#8a9e8a" },
  badge:         { display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, padding: "2px 7px", borderRadius: 6, fontWeight: 500 },
  badgeUp:       { background: "#EAF3DE", color: "#27500A" },
  badgeDown:     { background: "#FCEBEB", color: "#791F1F" },
  section:       { background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0", marginBottom: 12 },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  sectionLabel:  { fontSize: 13, color: "#5a6e5a", fontWeight: 500, marginBottom: "0.5rem" },
  tabs:          { display: "flex", gap: 4 },
  tab:           { fontSize: 12, padding: "4px 10px", borderRadius: 8, border: "0.5px solid #ddeadd", background: "transparent", color: "#8a9e8a", cursor: "pointer" },
  tabActive:     { background: "#EAF3DE", color: "#27500A", borderColor: "#c0d8a0", fontWeight: 500 },
  legend:        { display: "flex", gap: 14 },
  legendItem:    { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6a7d6a" },
  legendDot:     { width: 9, height: 9, borderRadius: "50%", display: "inline-block" },
  tooltip:       { background: "#162c1e", borderRadius: 12, padding: "10px 14px", color: "#fff", fontSize: 13, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" },
  tooltipLabel:  { fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 },
  tooltipValue:  { fontSize: 18, fontWeight: 500 },
  row2:          { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 },
  breakdown:     { background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  brow:          { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #f0f5f0" },
  bcat:          { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#162416" },
  bdot:          { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  bamt:          { fontSize: 13, fontWeight: 500, color: "#162416", textAlign: "right" },
  barOuter:      { height: 4, background: "#f0f5f0", borderRadius: 4, marginTop: 3, width: 80 },
  barInner:      { height: 4, borderRadius: 4 },
  donutCard:     { background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  dleg:          { marginTop: 4 },
  dlegRow:       { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, padding: "3px 0" },
  dlegLeft:      { display: "flex", alignItems: "center", gap: 6, color: "#6a7d6a" },
  dlegSq:        { width: 8, height: 8, borderRadius: 2, display: "inline-block" },
  dlegPct:       { fontWeight: 500, fontSize: 12, color: "#162416" },
};