"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Terminal, LayoutDashboard, Home, Info, ChevronDown, Users, Newspaper, Bookmark, Radio } from "lucide-react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // إغلاق القوائم المنسدلة عند الضغط في أي مكان خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // هيكل بيانات التبويبات والقوائم المنسدلة الصغيرة الجديدة
  // هيكل بيانات التبويبات المحسن بالمسارات الحقيقية
  const navLinks = [
    {
      id: "networks",
      label: "الشبكات والاتصالات",
      icon: Radio,
      items: [
        { label: "أنظمة الجيل الخامس 5G", href: "/5g" },
        { label: "أبحاث الجيل السادس 6G", href: "/6g" },
        { label: "تخطيط وهندسة الشبكات", href: "/network-planning" },
        { label: "الذكاء الاصطناعي في الاتصالات", href: "/ai-telecom" }
      ]
    },
    {
      id: "communities",
      label: "مجتمعات عامة",
      icon: Users,
      items: [
        { label: "منتدى مهندسي DSP", href: "/dsp-forum" },
        { label: "مجموعات النقاش البحثي", href: "/research-discussions" },
        { label: "مشاريع التخرج المميزة", href: "/graduation-projects" }
      ]
    },
    {
      id: "research",
      label: "الأبحاث والأخبار",
      icon: Newspaper,
      items: [
        { label: "آخر أبحاث IEEE", href: "/ieee-research" },
        { label: "أبرز أخبار منصة Edusignal", href: "/edusignal-news" },
        { label: "مؤتمرات الاتصالات القادمة", href: "/telecom-conferences" }
      ]
    },
    {
      id: "resources",
      label: "المصادر والمراجع",
      icon: Bookmark,
      items: [
        { label: "كتب هندسة الإشارات الرقمية", href: "/dsp-books" },
        { label: "أكواد ومكتبات Python الجاهزة", href: "/python-libraries" },
        { label: "أوراق علمية مصنفة (APA/IEEE)", href: "/academic-papers" }
      ]
    }
  ];

  // تبويبات القائمة الجانبية الأساسية
  const sidebarItems = [
    { label: "الرئيسية", icon: Home, href: "/" },
    { label: "المختبر التفاعلي (محرر الأكواد)", icon: Terminal, href: "/lab" },
    { label: "لوحة التحكم الشخصية", icon: LayoutDashboard, href: "/dashboard" },
    { label: "المناهج الأساسية", icon: BookOpen, href: "/courses" },
  ];

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
        
        {/* شريط التصفح العلوي الذكي */}
        <nav className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* زر فتح القائمة الجانبية */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* الشعار */}
            <Link href="/" className="text-xl font-black tracking-wider text-blue-500 font-mono shrink-0">
              Edu<span className="text-white">signal</span>
            </Link>

            {/* الروابط العلوية مع القوائم المنسدلة (تظهر على الشاشات الكبيرة فقط) */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300 relative">
              {navLinks.map((link) => (
                <div key={link.id} className="relative">
                  <button
                    onClick={() => toggleDropdown(link.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                      activeDropdown === link.id 
                        ? "bg-slate-800 text-blue-400" 
                        : "hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.id ? "rotate-180 text-blue-400" : "text-slate-500"}`} />
                  </button>

                  {/* القائمة المنسدلة الصغيرة الساقطة (Dropdown Card) */}
                  {activeDropdown === link.id && (
                    <div className="absolute top-full right-0 mt-2 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-right"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* أزرار سريعة في الجانب الأيسر للشريط */}
          <div className="flex items-center gap-3">
            <Link href="/lab" className="hidden sm:flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs px-3.5 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
              <Terminal className="w-3.5 h-3.5" />
              <span>المختبر الفوري</span>
            </Link>
            <div className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700 font-mono hidden md:block">
              v0.1 - Research Mode
            </div>
          </div>
        </nav>

        {/* القائمة الجانبية المنسدلة بالكامل (Sidebar Drawer) */}
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div onClick={() => setIsSidebarOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className={`absolute top-0 right-0 h-full w-72 bg-slate-900 border-l border-slate-800 p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-black text-blue-500">Edu<span className="text-white">navigation</span></span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* تبويبات الأيقونات في القائمة الجانبية */}
              <div className="space-y-1 pt-2">
                {sidebarItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={idx} 
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all font-medium text-sm border border-transparent hover:border-slate-800"
                    >
                      <Icon className="w-5 h-5 text-blue-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono border-t border-slate-800 pt-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-600" />
              <span>Edusignal Core Architecture</span>
            </div>
          </div>
        </div>

        {/* محتوى الصفحات الديناميكي */}
        <main>{children}</main>

      </body>
    </html>
  );
}