import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Housing from '@/pages/Housing';
import Eligibility from '@/pages/Eligibility';
import Programs from '@/pages/Programs';
import CitizenDashboard from '@/pages/CitizenDashboard';
import ProviderDashboard from '@/pages/ProviderDashboard';
import AdminDashboard from '@/pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
