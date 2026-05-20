"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Sparkles, LogIn, Mail, Lock, UserPlus, ArrowRight, Shield, Layers, HelpCircle, GraduationCap } from "lucide-react";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // بيانات الكروت العائمة
  const features = [
    {
      title: "مختبر محاكاة رقمي متكامل",
      desc: "بيئة تطبيقية تحاكي مختبرات هندسة الاتصالات الحقيقية، تمكنك من توليد الإشارات الجيبية، وإضافة الضوضاء وفلترتها برمجياً لمعاينة التأثير الفوري.",
      imgPlaceholder: "مخطط معالجة الإشارات المستمرة والمتقطعة (DSP Simulation Plot)",
      color: "from-blue-500/20 to-indigo-500/5 hover:border-blue-500/40"
    },
    {
      title: "تحليل طيف التردد (Frequency Domain)",
      desc: "انتقل بسلاسة بين المجال الزمني والترددي باستخدام خوارزميات تحويل فورير السريع (FFT). شاهد توزيع الطاقة وطيف الترددات للإشارة الراديوية الركيزة.",
      imgPlaceholder: "رسم بياني لتحليل فورير وطيف التردد (FFT Analysis Graph)",
      color: "from-purple-500/20 to-pink-500/5 hover:border-purple-500/40"
    },
    {
      title: "أكواد برمجية جاهزة للتنفيذ",
      desc: "لا حاجة لبناء الأكواد من الصفر، نوفر قوالب مبنية مسبقاً بلغة Python و NumPy تغطي خوارزميات الالتفاف (Convolution) وتصميم المرشحات (FIR/IIR Filters).",
      imgPlaceholder: "نافذة محرر الأكواد والنتائج الحوسبية (Python Code Terminal UI)",
      color: "from-cyan-500/20 to-emerald-500/5 hover:border-cyan-500/40"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      
      {/* 1. قسم البداية (Hero Section) */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 relative overflow-hidden text-center border-b border-slate-900">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بيئة تفاعلية لمهندسي الاتصالات والإشارات</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            منصة محاكاة الإشارات والأنظمة <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              التعليمية والأكاديمية الأولى
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            امزج بين المفاهيم النظرية والتطبيق البرمجي الفوري. اكتب خوارزميات معالجة الإشارات واستعرض الرسوم البيانية بدقة عالية مباشرة عبر المتصفح.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/lab" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all text-sm">
              <span>دخول المختبر</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
            
            <button 
              onClick={() => { setIsSignUp(false); setShowAuthModal(true); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-8 py-4 rounded-xl font-semibold transition-all text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول للمنصة</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. قسم القطع العائمة (Floating Explainers Section) */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-20">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ماذا تقدم لك منصة Edusignal؟</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">تصفح ركائز النظام المصممة لتسهيل استيعاب المواد الهندسية المعقدة.</p>
        </div>

        <div className="space-y-12">
          {features.map((feat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-b ${feat.color} border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 items-center transform hover:-translate-y-2 transition-all duration-300 group`}
            >
              {/* النصوص والتوضيحات */}
              <div className="flex-1 space-y-4 text-right">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>

              {/* الصورة التوضيحية (بشكل بطاقة رسم هندسي متناسق) */}
              <div className="w-full md:w-80 h-48 bg-slate-950/60 border border-slate-800/60 rounded-xl flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                <span className="text-xs text-center font-mono text-slate-500 leading-normal relative z-10">{feat.imgPlaceholder}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. نافذة تسجيل الدخول المنبثقة (Auth Modal) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div onClick={() => setShowAuthModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-6 rounded-2xl relative z-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">{isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول للمنصة"}</h3>
              <p className="text-slate-400 text-xs">أدخل بياناتك للوصول إلى مختبر الإشارات الرقمية وحفظ تجاربك.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 block font-medium">الاسم الكامل</label>
                  <div className="relative">
                    <input type="text" placeholder="المهندس/ة..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all font-sans" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 block font-medium">البريد الإلكتروني</label>
                <div className="relative">
                  <input type="email" placeholder="name@university.edu" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono text-left" />
                  <Mail className="w-4 h-4 text-slate-600 absolute right-4 top-3.5 pointer-events-none hidden" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 block font-medium">كلمة المرور</label>
                <div className="relative">
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono text-left" />
                  <Lock className="w-4 h-4 text-slate-600 absolute right-4 top-3.5 pointer-events-none hidden" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-blue-600/10 mt-2">
                {isSignUp ? "تسجيل حساب جديد" : "دخول آمن"}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-800/60">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:underline"
              >
                {isSignUp ? "تملك حساباً بالفعل؟ سجل دخولك" : "لا تملك حساباً؟ أنشئ بريداً أكاديمياً الآن"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. التذييل الشامل الممتد (Global Extended Footer) */}
      <footer className="bg-slate-900 border-t border-slate-800 text-sm mt-12">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 col-span-2 md:col-span-1">
            <span className="text-lg font-black text-blue-500 font-mono">Edu<span className="text-white">signal</span></span>
            <p className="text-xs text-slate-400 leading-relaxed">
              منصة سحابية متكاملة لتبسيط وهيكلة مساقات معالجة الإشارات وأنظمة الاتصالات الحديثة لطلاب الهندسة والباحثين.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>التعليم والتدريب</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/courses" className="hover:text-white transition-colors">الدروس والمناهج</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">الدورات المكثفة</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">المحاضرات المسجلة</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">المراجع الأكاديمية</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>المختبرات والبحوث</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/lab" className="hover:text-white transition-colors">المختبرات والمحاكاة</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">الأبحاث والأوراق العلمية</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">المقالات الهندسية</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">الشبكات والاتصالات</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>العضويات والترقيات</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => { setIsSignUp(true); setShowAuthModal(true); }} className="hover:text-white transition-colors text-right">الاشتراكات الأكاديمية</button></li>
              <li><Link href="#" className="hover:text-white transition-colors">الترقيات والشهادات</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">حول المنصة</Link></li>
            </ul>
          </div>

        </div>

        {/* الشريط السفلي الأخير لحقوق الملكية */}
        <div className="bg-slate-950/80 py-4 border-t border-slate-800/40 text-center text-xs text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} Edusignal.جميع الحقوق محفوظة enghom.
          </div>
      </footer>
      
    </div>
  );
}