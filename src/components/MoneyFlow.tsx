
import { useState, type CSSProperties } from "react";
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "./redux/store/hooks";
import { selectMoneyFlow } from "./redux/store/selectors";

export type TrendTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
  }>;
  label?: string;
};


type RoundedBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  opacity?: number | string;
  index?: number;
  radius?: number;
};

export const fmt = (v: number): string =>
  "Rs." + Number(v).toLocaleString("en-US", { minimumFractionDigits: 0 });

function FlowTooltip({ active , payload , label } : TrendTooltipProps) {
  if (!active || !payload?.length) return null;
const incomeItem = payload.find((p: any) => p.dataKey === "income");
const expenseItem = payload.find((p: any) => p.dataKey === "expense");

const income = typeof incomeItem?.value === "number" ? incomeItem.value : 0;
const expense = typeof expenseItem?.value === "number" ? expenseItem.value : 0;
  
  return (
    <div style={styles.tooltip}>
      <div style={styles.tooltipLabel}>{label}</div>
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>Income</div>
          <div style={styles.tooltipValue}>{fmt(income)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>Expense</div>
          <div style={{ ...styles.tooltipValue, color: "#9fe055" }}>{fmt(expense)}</div>
        </div>
      </div>
    </div>
  );
}

function RoundedBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill = "#000",
  opacity = 1,
  radius = 6,
}: RoundedBarProps) {
  if (!height || height <= 0) return null;

  const r = Math.min(radius, width / 2, height / 2);

  const safeOpacity =
    typeof opacity === "number" ? opacity : Number(opacity ?? 1);

  return (
    <path
      d={`M${x + r},${y} h${width - 2 * r} a${r},${r} 0 0 1 ${r},${r}
          v${height - r} h${-width} v${-(height - r)} a${r},${r} 0 0 1 ${r},${-r}z`}
      fill={fill}
      opacity={safeOpacity}
    />
  );
}

export const MoneyFlow = () => {
    
    const data = useAppSelector(selectMoneyFlow).slice(0 , 12);    

    const [activeFlowIdx, setActiveFlowIdx] = useState<number | null>(null);

    return(
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>Money flow</span>
          <div style={styles.legend}>
            {([["#1e5c3a", "Income"], ["#9fe055", "Expense"]] as [string, string][]).map(
              ([color, name]) => (
                <div key={name} style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: color }} />
                  {name}
                </div>
              )
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            barCategoryGap="30%"
            barGap={3}
            onMouseMove={(e) => {
              const idx = e?.activeTooltipIndex;

                if (typeof idx === "number") {
                    setActiveFlowIdx(idx);
                } else {
                    setActiveFlowIdx(null);
                }
            }}
            onMouseLeave={() => setActiveFlowIdx(null)}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e8f0e8" />
            <XAxis dataKey="month" axisLine={false} tickLine={false}
              tick={{ fill: "#9aaa9a", fontSize: 11 }} />
            <YAxis hide />
            <Tooltip content={<FlowTooltip />} cursor={false} />

            <Bar
              dataKey="income"
              maxBarSize={28}
              shape={(props: any) => {
                const isActive = props.index === activeFlowIdx;
                return (
                  <RoundedBar
                    {...props}
                    fill={isActive ? "#14472e" : "#2d7a4f"}
                    opacity={activeFlowIdx === null ? 0.85 : isActive ? 1 : 0.4}
                  />
                );
              }}
            />

            <Bar
              dataKey="expense"
              maxBarSize={28}
              shape={(props: any) => {
                const isActive = props.index === activeFlowIdx;
                return (
                  <RoundedBar
                    {...props}
                    fill={isActive ? "#7ecf20" : "#9fe055"}
                    opacity={activeFlowIdx === null ? 0.85 : isActive ? 1 : 0.4}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
}


const styles: Record<string, CSSProperties> = {
  dash:          { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", padding: "1.5rem", minHeight: "100vh" },
  cardGrid:      { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "1.5rem" },
  card:          { borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  cardLabel:     { fontSize: 12, color: "#8a9e8a", marginBottom: 6 },
  cardValue:     { fontSize: 22, fontWeight: 500, color: "#162416" },
  cardSub:       { display: "flex", alignItems: "center", gap: 6, marginTop: 6 },
  cardSubText:   { fontSize: 12, color: "#8a9e8a" },
  badge:         { display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, padding: "2px 7px", borderRadius: 6, fontWeight: 500 },
  badgeUp:       { color: "#27500A" },
  badgeDown:     { color: "#791F1F" },
  section:       { borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0", marginBottom: 12 },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  sectionLabel:  { fontSize: 13, color: "#5a6e5a", fontWeight: 500, marginBottom: "0.5rem" },
  tabs:          { display: "flex", gap: 4 },
  tab:           { fontSize: 12, padding: "4px 10px", borderRadius: 8, border: "0.5px solid #ddeadd", background: "transparent", color: "#8a9e8a", cursor: "pointer" },
  tabActive:     { color: "#27500A", borderColor: "#c0d8a0", fontWeight: 500 },
  legend:        { display: "flex", gap: 14 },
  legendItem:    { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6a7d6a" },
  legendDot:     { width: 9, height: 9, borderRadius: "50%", display: "inline-block" },
  tooltip:       { borderRadius: 12, padding: "10px 14px", color: "#fff", fontSize: 13, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" },
  tooltipLabel:  { fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 },
  tooltipValue:  { fontSize: 18, fontWeight: 500 },
  row2:          { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 },
  breakdown:     { borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  brow:          { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #f0f5f0" },
  bcat:          { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#162416" },
  bdot:          { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  bamt:          { fontSize: 13, fontWeight: 500, color: "#162416", textAlign: "right" },
  barOuter:      { height: 4, borderRadius: 4, marginTop: 3, width: 80 },
  barInner:      { height: 4, borderRadius: 4 },
  donutCard:     { borderRadius: 12, padding: "1rem 1.25rem", border: "0.5px solid #e0eae0" },
  dleg:          { marginTop: 4 },
  dlegRow:       { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, padding: "3px 0" },
  dlegLeft:      { display: "flex", alignItems: "center", gap: 6, color: "#6a7d6a" },
  dlegSq:        { width: 8, height: 8, borderRadius: 2, display: "inline-block" },
  dlegPct:       { fontWeight: 500, fontSize: 12, color: "#162416" },
};