import { Construction, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SubPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex flex-col justify-center items-center px-6 relative overflow-hidden font-sans rtl">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md text-center space-y-6 relative z-10">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <Construction className="w-8 h-8"/>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">القسم قيد التطوير الأكاديمي</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            تم بناء مسار الصفحة بنجاح في المنصة. قريباً سيتم ربط هذا القسم بالأبحاث والمحاكيات التفاعلية والمحتوى البرمجي المخصص.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl font-medium transition-all">
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180"/>
          </Link>
        </div>
      </div>
    </div>
  );
}