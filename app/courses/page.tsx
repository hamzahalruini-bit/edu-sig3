import { BookOpen, Award, ArrowLeft, Play } from 'lucide-react';

export default function CoursesPage() {
  const units = [
    { id: 1, title: "الوحدة الأولى: أساسيات الإشارات المستمرة والمتقطعة", count: "4 دروس", level: "مبتدئ" },
    { id: 2, title: "الوحدة الثانية: نظام LTI والالتفاف (Convolution)", count: "6 دروس", level: "متوسط" },
    { id: 3, title: "الوحدة الثالثة: تحليل فورير وطيف التردد (Fourier Analysis)", count: "8 دروس", level: "متقدم" },
  ];

  return (
    <div className="min-h-screen bg-slate-955 bg-slate-950 p-6 text-slate-100 font-sans antialiased rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">المناهج والمختبرات التعليمية</h1>
          <p className="text-slate-400">اختر الوحدة الدراسية لتبدأ المحاكاة وتطبيق خوارزميات البايثون.</p>
        </div>

        <div className="grid gap-4">
          {units.map((unit) => (
            <div key={unit.id} className="group bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">{unit.level}</span>
                  <h3 className="text-lg font-bold text-slate-200 mt-1 group-hover:text-white transition-colors">{unit.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">محتويات الوحدة: {unit.count}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all group-hover:translate-x-[-4px]">
                <span>دخول المعمل</span>
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}