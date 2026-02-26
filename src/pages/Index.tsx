import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Users, Brain, TrendingDown } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Loading Bulqit...</h1>
      </div>
    </div>
  );
};

export default Index;
