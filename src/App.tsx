import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MetricCard } from './components/MetricCard';
import { PredictiveChart } from './components/PredictiveChart';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ProfitabilityHeatmap } from './components/ProfitabilityHeatmap';
import { Navigation } from './components/Navigation';
import { FileUpload } from './components/FileUpload';
import { PredictionOptions } from './components/PredictionOptions';
import { FlipCard } from './components/FlipCard';
import { RiskGraph } from './components/RiskGraph';
import { NavSection, PredictionType, PredictiveData, RiskMetric, CostCategory, CostRecommendation } from './types';

const metrics = [
  {
    title: 'Revenue',
    value: '$125,000',
    change: 12.5,
    icon: 'DollarSign'
  },
  {
    title: 'Customers',
    value: '1,240',
    change: 8.2,
    icon: 'Users'
  },
  {
    title: 'Risk Score',
    value: '85/100',
    change: -2.4,
    icon: 'AlertTriangle'
  },
  {
    title: 'Efficiency',
    value: '94%',
    change: 5.1,
    icon: 'TrendingUp'
  }
];

const risks: RiskMetric[] = [
  { category: 'Market Volatility', value: 75, status: 'high' },
  { category: 'Operational Risk', value: 45, status: 'medium' },
  { category: 'Credit Risk', value: 30, status: 'low' },
  { category: 'Compliance Risk', value: 60, status: 'medium' }
];

const costCategories: CostCategory[] = [
  {
    name: 'Operations',
    currentCost: 50000,
    previousCost: 55000,
    predictedReduction: 3000,
    efficiency: 92
  },
  {
    name: 'Marketing',
    currentCost: 30000,
    previousCost: 28000,
    predictedReduction: 2000,
    efficiency: 85
  },
  {
    name: 'Technology',
    currentCost: 25000,
    previousCost: 22000,
    predictedReduction: 1500,
    efficiency: 88
  }
];

const recommendations: CostRecommendation[] = [
  {
    category: 'Operations Optimization',
    impact: 'high',
    potentialSavings: 15000,
    description: 'Streamline operational processes through automation',
    actionItems: [
      'Implement automated inventory management',
      'Optimize workforce scheduling',
      'Reduce manual data entry tasks'
    ]
  },
  {
    category: 'Marketing Efficiency',
    impact: 'medium',
    potentialSavings: 8000,
    description: 'Improve marketing ROI through targeted campaigns',
    actionItems: [
      'Focus on high-performing channels',
      'Implement A/B testing',
      'Optimize ad spend allocation'
    ]
  }
];

const flipCards = [
  {
    title: 'Risk Assessment',
    frontContent: 'AI-powered risk scoring and automated alert system for proactive risk management.',
    backContent: 'Comprehensive analysis of potential risks and mitigation strategies.',
    icon: 'AlertTriangle',
    riskPercentage: 75,
    tip: 'Implement automated risk monitoring systems to reduce exposure by 30%'
  },
  {
    title: 'Demand Forecasting',
    frontContent: 'Machine learning algorithms analyzing historical data and market trends.',
    backContent: 'Advanced predictive modeling for future market demand.',
    icon: 'LineChart',
    riskPercentage: 45,
    tip: 'Utilize historical data patterns to improve forecast accuracy by 25%'
  },
  {
    title: 'Market Analysis',
    frontContent: 'Real-time competitor tracking and market opportunity identification.',
    backContent: 'Deep insights into market trends and competitive landscape.',
    icon: 'BarChart2',
    riskPercentage: 60,
    tip: 'Diversify market presence to reduce dependency on primary segments'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionType>('risk');
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [riskData, setRiskData] = useState(() => generateInitialData());
  const [revenueData, setRevenueData] = useState(() => generateRevenueData());
  const [marketData, setMarketData] = useState(() => generateMarketData());

  function generateInitialData() {
    const data = [];
    const startDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString(),
        riskScore: 50 + Math.random() * 30,
        threshold: 70
      });
    }
    return data;
  }

  function generateRevenueData() {
    const data = [];
    const startDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString(),
        actual: i < 15 ? 50000 + Math.random() * 10000 : undefined,
        predicted: 52000 + Math.random() * 12000
      });
    }
    return data;
  }

  function generateMarketData() {
    const data = [];
    const startDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toISOString(),
        marketShare: 25 + Math.random() * 10,
        competitorShare: 20 + Math.random() * 8
      });
    }
    return data;
  }

  const handleFileSelect = (file: File) => {
    toast.success('File uploaded successfully! Analyzing data...', {
      duration: 3000,
      position: 'top-right',
      icon: '📊'
    });

    // Simulate data update based on prediction type
    setTimeout(() => {
      switch (selectedPrediction) {
        case 'risk':
          setRiskData(generateInitialData());
          break;
        case 'revenue':
          setRevenueData(generateRevenueData());
          break;
        case 'market':
          setMarketData(generateMarketData());
          break;
      }
      setHasUploadedFile(true);
    }, 1500);
  };

  const renderPredictionGraph = () => {
    if (!hasUploadedFile) return null;

    switch (selectedPrediction) {
      case 'risk':
        return <RiskGraph data={riskData} />;
      case 'revenue':
        return <PredictiveChart data={revenueData} title="Revenue Forecast" />;
      case 'market':
        return <PredictiveChart data={marketData} title="Market Share Analysis" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <PredictiveChart data={generateRevenueData()} title="Revenue Trends" />
              </div>
              <div>
                <RiskAnalysis risks={risks} />
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profitability Optimization</h2>
              <ProfitabilityHeatmap 
                costCategories={costCategories}
                recommendations={recommendations}
              />
            </div>
          </>
        );

      case 'predictions':
        return (
          <>
            <FileUpload 
              onFileSelect={handleFileSelect} 
              showReupload={hasUploadedFile}
            />
            <PredictionOptions
              selectedOption={selectedPrediction}
              onOptionSelect={setSelectedPrediction}
            />
            {renderPredictionGraph()}
            {selectedPrediction && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {flipCards.map((card, index) => (
                  <FlipCard key={index} {...card} />
                ))}
              </div>
            )}
          </>
        );

      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;