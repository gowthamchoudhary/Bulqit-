import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import { RegisterPage } from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GroupFormPage from "./pages/GroupFormPage";
import EmailResultPage from "./pages/EmailResultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { BuyersDirectoryPage } from "./pages/BuyersDirectoryPage";
import NotFound from "./pages/NotFound";
import { HowItWorksPage } from "./pages/HowItWorksPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/group-form" element={<GroupFormPage />} />
            <Route path="/email-result" element={<EmailResultPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/buyers" element={<BuyersDirectoryPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


