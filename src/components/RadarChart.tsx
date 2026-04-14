import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { DIMENSIONS, MODEL_INFO } from '../data/dimensions'
import { DimensionScores } from '../engine/scorer'

interface Props {
  scores: DimensionScores
}

export default function DimensionRadarChart({ scores }: Props) {
  const data = DIMENSIONS.map(dim => ({
    dimension: dim.code,
    fullName: `${dim.code} ${dim.name}`,
    value: scores[dim.code] ?? 50,
    color: MODEL_INFO[dim.model].color,
  }))

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#2A3040" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Agent Scores"
            dataKey="value"
            stroke="#00FF88"
            fill="#00FF88"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
