import { Terminal, CheckCircle, Clock, Zap } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { id: 1, label: "الخوارزميات المنفذة", value: "24 كود", icon: Terminal, color: "text-blue-400 bg-blue-500/10" },
    { id: 2, label: "تجارب ناجحة", value: "18 تجربة", icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/10" },
    { id: 3, label: "ساعات المحاكاة", value: "5.4 ساعة", icon: Clock, color: "text-amber-400 bg-amber-500/10" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100 font-sans antialiased rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">لوحة التحكم الشخصية</h1>
          <p className="text-slate-400">مرحباً بك مجدداً. تابع أدائك في مختبرات الإشارات الرقمية.</p>
        </div>

        {/* شبكة الإحصائيات (Stats Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white font-mono mt-0.5">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* قسم آخر الأنشطة المنجزة */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-lg text-slate-200 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>آخر النشاطات البرمجية</span>
          </h3>
          <div className="divide-y divide-slate-800 text-sm">
            <div className="py-3 flex justify-between text-slate-300">
              <span>برمجة خوارزمية الـ Discrete Fourier Transform (DFT)</span>
              <span className="text-xs text-slate-500 font-mono">منذ ساعتين</span>
            </div>
            <div className="py-3 flex justify-between text-slate-300">
              <span>توليد موجة جيبية بتردد 50Hz مع إضافة ضوضاء Gaussian</span>
              <span className="text-xs text-slate-500 font-mono">أمس</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}