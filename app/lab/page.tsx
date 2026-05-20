import React from 'react';
import { Play, Sliders, Activity, Code, Settings } from 'lucide-react';

export default function LabPage() {
  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      
      {/* 1. اللوحة الجانبية: التحكم في الإشارات المدخلة (Signal Input Dashboard) */}
      <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-500" />
          <h2 className="font-bold text-lg text-white">لوحة الإشارات المدخلة</h2>
        </div>
        
        {/* خيارات توليد الإشارة القياسية */}
        <div className="p-4 flex-1 overflow-y-auto space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">نوع الإشارة الأساسية</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              <option value="sine">موجة جيبية (Sine Wave)</option>
              <option value="square">موجة مربعة (Square Wave)</option>
              <option value="sawtooth">موجة مثلثية (Sawtooth)</option>
              <option value="noise">ضوضاء بيضاء (Gaussian Noise)</option>
            </select>
          </div>

          {/* محددات الإشارة الديناميكية (Sliders) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">الخصائص الرياضية</h3>
            
            {/* التردد Frequency */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">التردد (Frequency - f)</span>
                <span className="text-blue-400 font-mono">5 Hz</span>
              </div>
              <input type="range" min="1" max="100" defaultValue="5" className="w-full accent-blue-500" />
            </div>

            {/* السعة Amplitude */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">السعة (Amplitude - A)</span>
                <span className="text-blue-400 font-mono">1.0</span>
              </div>
              <input type="range" min="0" max="5" step="0.1" defaultValue="1" className="w-full accent-blue-500" />
            </div>

            {/* معدل العينات Sampling Rate */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">معدل العينات (Fs)</span>
                <span className="text-blue-400 font-mono">1000 Hz</span>
              </div>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-300">
                <option value="500">500 Hz</option>
                <option value="1000">1000 Hz</option>
                <option value="2000">2000 Hz</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* مساحة العمل الرئيسية: تنقسم إلى محرر الكود والأشكال البيانية */}
      <main className="flex-1 flex flex-col h-full">
        
        {/* شريط الإجراءات العلوي */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono">Pyodide active</span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-600/10">
            <Play className="w-4 h-4 fill-current" />
            <span>تشغيل الخوارزمية</span>
          </button>
        </header>

        {/* محتوى الشاشة: تقسيم أفقي بين الكود والرسوم */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* 2. منطقة محرر الأكواد (Monaco Editor Container) */}
          <section className="flex-1 bg-[#1e1e1e] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>خوارزمية معالجة الإشارة (Python)</span>
            </div>
            {/* هنا سيتم تركيب محرر Monaco لاحقاً */}
            <div className="flex-1 p-4 font-mono text-sm text-slate-400 select-none">
              # اكتب خوارزمية الـ DSP الخاصة بك هنا..{"\n"}
              # x: الإشارة المدخلة الأصلية{"\n"}
              # output = edusignal.convolve(x, h)
            </div>
          </section>

          {/* 3. منطقة الرسوم البيانية التفاعلية (Signal Charts Workspace) */}
          <section className="w-full lg:w-[45%] bg-slate-950 p-4 overflow-y-auto space-y-4 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>التحليل البياني الآني</span>
            </div>

            {/* الرسم البياني 1: المجال الزمني للإشارة الأصلية */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-48 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-2">الإشارة الأصلية $x(t)$ (Time Domain)</span>
              <div className="flex-1 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-600 font-mono">
                [لوحة رسم الإشارة المدخلة]
              </div>
            </div>

            {/* الرسم البياني 2: المجال الزمني للإشارة المعالجة */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-48 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-2">الإشارة الناتجة $y(t)$ (Output Signal)</span>
              <div className="flex-1 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-600 font-mono">
                [لوحة رسم إشارة البايثون المخرجة]
              </div>
            </div>

            {/* الرسم البياني 3: طيف التردد */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-48 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-2">طيف التردد $|X(f)|$ (Frequency Spectrum - FFT)</span>
              <div className="flex-1 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-600 font-mono">
                [لوحة رسم الـ FFT وحجم الترددات]
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}