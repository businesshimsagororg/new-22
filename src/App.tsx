/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { 
  Shield, 
  Database, 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Leaf, 
  Truck, 
  Heart,
  Droplets,
  Search
} from "lucide-react";
import { motion } from "motion/react";

interface HealthStatus {
  ok: boolean;
  firebaseAdminConfigured: boolean;
  adminEmailsConfigured: boolean;
}

export default function App() {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Backend unreachable");
        return res.json();
      })
      .then((data) => setStatus(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#1B4332] p-2 rounded-xl">
              <Droplets className="w-6 h-6 text-[#95D5B2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1B4332]">PureOrigins</span>
              <p className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase">Authenticity</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-[#2D6A4F] transition-colors">আমাদের বৈশিষ্ট্য (Features)</a>
            <a href="#products" className="hover:text-[#2D6A4F] transition-colors">আমাদের পণ্য (Products)</a>
            <a href="#contact" className="hover:text-[#2D6A4F] transition-colors">যোগাযোগ করুন (Contact)</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${status?.ok ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></span>
              <span className="text-slate-400">SERVER: {status?.ok ? 'LIVE' : 'WAITING'}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-[0.03] pointer-events-none">
          <Leaf className="w-full h-full rotate-12" />
        </div>
        
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#1B4332] leading-[1.1] mb-6">
              প্রকৃতির বিশুদ্ধতা, <br />
              <span className="text-[#409167]">সরাসরি আপনার কাছে</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              PureOrigins এ আমরা সরাসরি কৃষক ও খামারিদের কাছ থেকে সংগ্রহ করি সেরা মানের পণ্য, যাতে আপনার টেবিলে পৌঁছে যায় শতভাগ বিশুদ্ধ খাবার।
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-[#1B4332] text-white rounded-full font-semibold shadow-xl shadow-emerald-900/10 hover:bg-[#2D6A4F] transition-all transform hover:-translate-y-0.5">
                কেনাকাটা শুরু করুন
              </button>
              <button className="px-8 py-4 bg-white text-[#1B4332] border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm">
                পণ্য সম্পর্কে জানুন
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="scroll-mt-24 py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">আমাদের মূল্যবোধ</h2>
            <div className="w-16 h-1 bg-[#409167] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid gap-10 md:grid-cols-3">
            <FeatureCard 
              icon={<Leaf className="w-6 h-6" />}
              title="সরাসরি উৎস"
              description="কোনো মধ্যস্বত্বভোগী নেই, আমরা সরাসরি মাঠ থেকে খাঁটি মানের পণ্য সংগ্রহ করি।"
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="মান পরীক্ষিত"
              description="উন্নত ল্যাবে পরীক্ষা করে প্রতিটি পণ্যের বিশুদ্ধতা নিশ্চিত করা হয়।"
            />
            <FeatureCard 
              icon={<Heart className="w-6 h-6" />}
              title="সততা ও স্বচ্ছতা"
              description="আমরা বিশ্বাস করি সততায়। পণ্যের প্রতিটি তথ্য আপনার সামনে স্পষ্ট থাকে।"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-24 py-20 bg-[#F8FAF9]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">আমাদের জনপ্রিয় পণ্যসমূহ (Products)</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm mt-3">সরাসরি কৃষক ও খামারিদের থেকে সংগৃহীত শতভাগ খাঁটি ও প্রাকৃতিক পণ্যসমূহ।</p>
            <div className="w-16 h-1 bg-[#409167] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard 
              image="https://images.unsplash.com/photo-1587049352847-4d4b1263d508?auto=format&fit=crop&w=400&q=80"
              title="খাঁটি সুন্দরবনের মধু"
              price="৳ ৮৫০"
              unit="১ কেজি"
              badge="বেস্ট সেলার"
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80"
              title="কালোজিরা তেল (কোল্ড প্রেস)"
              price="৳ ৪২০"
              unit="২৫০ মি.লি."
              badge="অর্গানিক"
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80"
              title="প্রিমিয়াম চিয়া সিডস"
              price="৳ ৩৫০"
              unit="২৫০ গ্রাম"
              badge="সুপারফুড"
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1540308001150-13f57ebd19b4?auto=format&fit=crop&w=400&q=80"
              title="কাঠের ঘানি ভাঙা সরিষার তেল"
              price="৳ ২৯০"
              unit="১ লিটার"
              badge="শতভাগ খাঁটি"
            />
          </div>
        </div>
      </section>

      {/* Admin Quick Scan */}
      <section className="py-20 bg-[#F8FAF9]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#1B4332] mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-[#409167]" /> System Infrastructure
              </h3>
              <div className="space-y-4">
                <AdminStatusItem label="API Backend" status={status?.ok ?? false} />
                <AdminStatusItem label="Firebase Config" status={status?.firebaseAdminConfigured ?? false} />
                <AdminStatusItem label="Admin Emails" status={status?.adminEmailsConfigured ?? false} />
              </div>
            </div>
            
            <div className="flex-1 bg-[#1B4332] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full"></div>
              <Activity className="w-8 h-8 text-[#95D5B2] mb-8" />
              <h4 className="text-xl font-bold mb-4">Instance Monitor</h4>
              <div className="space-y-4 font-mono text-xs opacity-80">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>PROJECT_ID:</span>
                  <span>{loading ? '...' : (status ? 'new-web-76da8' : 'NOT_SET')}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>REGION:</span>
                  <span>asia-east1</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>ADMIN_ACCESS:</span>
                  <span className={status?.adminEmailsConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                    {status?.adminEmailsConfigured ? 'CONFIGURED' : 'PENDING'}
                  </span>
                </div>
              </div>
              
              {!status?.firebaseAdminConfigured && !loading && (
                <div className="mt-8 p-4 bg-white/10 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-300 mt-0.5" />
                  <p className="text-xs leading-relaxed text-slate-200">
                    <strong>Notice:</strong> Please ensure your Firebase service account JSON credentials have been correctly mapped to your environment variables.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <footer id="contact" className="scroll-mt-24 bg-slate-900 py-16 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Droplets className="w-6 h-6 text-[#95D5B2]" />
              <span className="text-xl font-bold text-white tracking-tight">PureOrigins</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">প্রকৃতির বিশুদ্ধতা সরাসরি আপনার টেবিলে পৌঁছে দেওয়াই আমাদের মূল লক্ষ্য।</p>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-6">যোগাযোগ</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Gulshan, Dhaka</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +880 1234-567890</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> support@pureorigins.com</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">দ্রুত লিঙ্ক</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">আমাদের বৈশিষ্ট্য (Features)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">আমাদের পণ্য (Products)</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">যোগাযোগ করুন (Contact)</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">ডেলিভারি</h5>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 mt-0.5" />
                <span>সারা বাংলাদেশে নির্ভরযোগ্য ডেলিভারি সার্ভিস নিশ্চিত করা হয়।</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© 2024 PureOrigins Backend System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-[#F0F7F4] flex items-center justify-center rounded-2xl text-[#2D6A4F] mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-[#1B4332] mb-3">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ProductCard({ image, title, price, unit, badge }: { image: string, title: string, price: string, unit: string, badge?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
        <img referrerPolicy="no-referrer" src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        {badge && (
          <span className="absolute top-3 left-3 bg-[#1B4332] text-[#95D5B2] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#1B4332] mb-1.5 leading-snug">{title}</h4>
          <span className="text-[11px] text-slate-400 font-medium font-mono">{unit}</span>
        </div>
        <div className="flex items-center justify-between mt-4 border-t border-slate-100/55 pt-3">
          <span className="text-base font-bold text-[#2D6A4F] font-mono">{price}</span>
          <button className="text-[10px] font-bold bg-[#1B4332] text-white px-3.5 py-1.5 rounded-full hover:bg-[#2D6A4F] transition-colors uppercase tracking-wider">
            অর্ডার
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AdminStatusItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${status ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {status ? 'Active' : 'Pending'}
        </span>
        {status ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
      </div>
    </div>
  );
}

