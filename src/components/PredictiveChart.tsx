import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { PredictiveData } from '../types';

interface Props {
  data: PredictiveData[] | any[];
  title: string;
}

export const PredictiveChart: React.FC<Props> = ({ data, title }) => {
  const getLines = () => {
    const keys = Object.keys(data[0]).filter(key => key !== 'date');
    return keys.map((key, index) => (
      <Line
        key={key}
        type="monotone"
        dataKey={key}
        stroke={index === 0 ? '#2563eb' : '#16a34a'}
        strokeWidth={2}
        strokeDasharray={key.includes('predicted') ? '5 5' : undefined}
        dot={false}
        name={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              formatter={(value) => [typeof value === 'number' ? value.toLocaleString() : value, '']}
            />
            <Legend />
            {getLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};