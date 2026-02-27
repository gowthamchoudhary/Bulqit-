import { Toaster } from "sonner";
import "./bulqit-mobile.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import { RegisterPage } from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GroupFormPage from "./pages/GroupFormPage";
import { GroupDetailsPage } from "./pages/GroupDetailsPage";
import { PaymentPage } from "./pages/PaymentPage";
import EmailResultPage from "./pages/EmailResultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { BuyersDirectoryPage } from "./pages/BuyersDirectoryPage";
import NotFound from "./pages/NotFound";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { NegotiationCenterPage } from "./pages/NegotiationCenterPage";
import { AboutPage } from "./pages/AboutPage";
import { PricingPage } from "./pages/PricingPage";
import { AIChatWidget } from "./components/features/AIChatWidget";
import { SavingsCalculatorPage } from "./pages/SavingsCalculatorPage";
import { SupplierRegistrationPage } from "./pages/SupplierRegistrationPage";
import { SupplierDashboard } from "./pages/SupplierDashboard";

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
            <Route path="/group/:groupId" element={<GroupDetailsPage />} />
            <Route path="/payment/:groupId" element={<PaymentPage />} />
            <Route path="/email-result" element={<EmailResultPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route
              path="/supplier/register"
              element={<SupplierRegistrationPage />}
            />
            <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
            <Route path="/buyers" element={<BuyersDirectoryPage />} />
            <Route path="/negotiate" element={<NegotiationCenterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route
              path="/savings-calculator"
              element={<SavingsCalculatorPage />}
            />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatWidget />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
