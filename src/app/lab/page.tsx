"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend);

export default function UltimateAcademicLab() {
  const [activesection, setActiveSection] = useState<string>("main");
  
  // سجل المخرجات المتراكم
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[نظام المحاكاة]: تم تشغيل مركز المختبرات المطور. بانتظار اختيار البيئة الهندسية..."
  ]);
  const consoleEndRef = useRef<HTMLPreElement>(null);

  const addLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // --- 1. متغيرات أداة رسم الإشارات المتعددة ---
  const [waveType, setWaveType] = useState<string>("sine");
  const [customFormula, setCustomFormula] = useState<string>("Math.sin(t) * Math.cos(2 * t)");
  const [frequency, setFrequency] = useState<number>(2);
  const [amplitude, setAmplitude] = useState<number>(1);
  const [noiseLevel, setNoiseLevel] = useState<number>(0);

  // --- 2. متغيرات محاكاة الشبكات والتضمين والرموز ---
  const [modulationType, setModulationType] = useState<string>("bpsk"); 
  const [txAntennas, setTxAntennas] = useState<number>(4);
  const [rxAntennas, setRxAntennas] = useState<number>(4);
  const [snr, setSnr] = useState<number>(10);

  // --- 3. متغيرات أداة رسم الدوال الرياضية والمعادلات المخصصة ---
  const [mathFunction, setMathFunction] = useState<string>("fourier"); 
  const [userMathFormula, setUserMathFormula] = useState<string>("x**2 - 2*x"); // المعادلة الافتراضية المدخلة يدويًا
  const [yScale, setYScale] = useState<number>(4); // التحكم في حد المحور الصادي السعة

  // بيانات الرسم البياني الموحدة
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });

  const [pyCode, setPyCode] = useState<string>(
    `# معمل معالجة الإشارات والذكاء الاصطناعي\nimport numpy as np\n\ndef analyze_channel_capacity(Nt, Nr, snr_db):\n    snr_linear = 10**(snr_db / 10)\n    capacity = min(Nt, Nr) * np.log2(1 + snr_linear)\n    return capacity\n\nprint("SISO/MIMO Capacity Model Initialized.")`
  );

  // المحرك الرياضي التفاعلي لإنتاج المنحنيات بناء على المدخلات
  useEffect(() => {
    const labels = [];
    const primaryData = [];
    const secondaryData = [];

    if (activesection === "أداة رسم الإشارات المتعددة") {
      for (let i = 0; i < 100; i++) {
        const t = i / 20;
        let y = 0;

        if (waveType === "sine") y = amplitude * Math.sin(2 * Math.PI * frequency * t);
        else if (waveType === "cosine") y = amplitude * Math.cos(2 * Math.PI * frequency * t);
        else if (waveType === "square") y = amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * t));
        else if (waveType === "triangle") y = (2 * amplitude / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t));
        else if (waveType === "custom") {
          try {
            const evalY = new Function("t", `return ${customFormula}`);
            y = amplitude * evalY(t);
          } catch (e) { y = 0; }
        }

        const randomNoise = (Math.random() - 0.5) * noiseLevel;
        labels.push(`t: ${t.toFixed(2)}s`);
        primaryData.push(parseFloat(y.toFixed(3)));
        secondaryData.push(parseFloat((y + randomNoise).toFixed(3)));
      }

      setChartData({
        labels,
        datasets: [
          { label: "الإشارة النقية الأساسية", data: primaryData, borderColor: "#3b82f6", borderWidth: 2.5, pointRadius: 1, hoverRadius: 6, tension: 0.3 },
          { label: "الإشارة مع الضوضاء الفضائية", data: secondaryData, borderColor: "#ef4444", borderWidth: 1.5, pointRadius: 0, tension: 0.2 }
        ]
      });

    } else if (activesection === "محاكاة شبكات الاتصالات والتضمين") {
      const bits = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
      let bitIndex = 0;

      for (let i = 0; i < 100; i++) {
        const t = i / 10;
        if (i % 10 === 0 && i > 0) bitIndex = (bitIndex + 1) % bits.length;
        const currentBit = bits[bitIndex];

        let y = 0;
        if (modulationType === "bpsk") {
          const phase = currentBit === 1 ? 0 : Math.PI;
          y = amplitude * Math.sin(2 * Math.PI * 2 * t + phase);
        } else if (modulationType === "qpsk") {
          const phase = currentBit === 1 ? Math.PI / 4 : (3 * Math.PI) / 4;
          y = amplitude * Math.sin(2 * Math.PI * 2 * t + phase);
        } else if (modulationType === "16qam") {
          const ampFactor = currentBit === 1 ? 1.5 : 0.5;
          y = ampFactor * amplitude * Math.sin(2 * Math.PI * 2 * t);
        }

        const noiseFactor = Math.max(0, 30 - snr) / 15;
        const channelNoise = (Math.random() - 0.5) * noiseFactor;

        labels.push(`نقطة ${i}`);
        primaryData.push(parseFloat(y.toFixed(3)));
        secondaryData.push(parseFloat((y + channelNoise).toFixed(3)));
      }

      setChartData({
        labels,
        datasets: [
          { label: `الموجة المرسلة بتعديل (${modulationType.toUpperCase()})`, data: primaryData, borderColor: "#10b981", borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: "الموجة المستقبلة عبر الهوائيات (Noisy RX)", data: secondaryData, borderColor: "#f59e0b", borderWidth: 1.2, pointRadius: 0, tension: 0.1 }
        ]
      });

    } else if (activesection === "رسم الدوال الرياضية") {
      for (let i = -50; i < 50; i++) {
        const x = i / 10;
        let y = 0;

        if (mathFunction === "fourier") {
          y = Math.sin(x) + (1/3) * Math.sin(3 * x) + (1/5) * Math.sin(5 * x) + (1/7) * Math.sin(7 * x);
        } else if (mathFunction === "sinc") {
          y = x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);
        } else if (mathFunction === "gaussian") {
          y = Math.exp(-Math.pow(x, 2));
        } else if (mathFunction === "bessel") {
          y = Math.sin(x) / (x === 0 ? 1 : x) * Math.cos(0.3 * x);
        } else if (mathFunction === "step") {
          y = x >= 0 ? 1 : 0;
        } else if (mathFunction === "user_custom") {
  try {
    // 1. حماية: إذا كان المربع فارغاً، اجعل النتيجة صفراً فوراً وتجنب انهيار المحرك
    if (!userMathFormula || userMathFormula.trim() === "") {
      y = 0;
    } else {
      // معالجة صياغة بايثون للأسس x**2 وتحويلها لصياغة جافا سكريبت Math.pow
      let jsFormula = userMathFormula
        .replace(/x\*\*2/g, "Math.pow(x,2)")
        .replace(/x\*\*3/g, "Math.pow(x,3)")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan");

      const evalCustom = new Function("x", `return ${jsFormula}`);
      
      // 2. حماية: التأكد من أن النتيجة رقمية صالحة وليست NaN (Not a Number)
      const result = evalCustom(x);
      y = isNaN(result) ? 0 : result;
    }
  } catch (e) { 
    // 3. حماية: أثناء كتابة المستخدم (مثلاً كتب "x +" ولم يكمل)، سيحدث خطأ مؤقت، هنا نمسكه ونجعل y=0 لحين إكمال الكتابة
    y = 0; 
  }
}

        labels.push(`X: ${x.toFixed(1)}`);
        primaryData.push(parseFloat(y.toFixed(3)));
      }
      setChartData({
        labels,
        datasets: [{ label: `منحنى دالة العرض`, data: primaryData, borderColor: "#a855f7", backgroundColor: "rgba(168, 85, 247, 0.05)", borderWidth: 2.5, pointRadius: 2, hoverRadius: 7 }]
      });
    }
  }, [activesection, waveType, customFormula, frequency, amplitude, noiseLevel, modulationType, txAntennas, rxAntennas, snr, mathFunction, userMathFormula]);

  // بنية البيانات الموسعة للشروحات الأكاديمية للدوال والمعادلات
  const mathExplanations: Record<string, { formula: string; title: string; desc: string }> = {
    fourier: {
      title: "متسلسلات فورير (Fourier Series Approximation)",
      formula: "f(t) = ∑ [sin(n·t) / n] for n=1,3,5...",
      desc: "تفكيك وإعادة بناء الموجات الدورية المعقدة من خلال تجميع موجات جيبية نقية بترددات مضاعفة. هذا المبدأ هو الحجر الأساس في تقنية الـ OFDM المستخدمة لتقسيم الترددات في شبكات 5G و 6G لمنع تداخل الإشارات الترددية."
    },
    sinc: {
      title: "دالة النبضة الجيبية أو المعاينة (Sinc Function)",
      formula: "sinc(x) = sin(πx) / (πx)",
      desc: "تعتبر هذه الدالة الركيزة الأساسية لنظرية المعاينة (Nyquist-Shannon Sampling Theorem). تستخدم كفلاتر تمرير مثالية لمنع تداخل الرموز اللاسلكية (Inter-Symbol Interference) عند تحويل الإشارات من تماثلية إلى رقمية."
    },
    gaussian: {
      title: "منحنى التوزيع الطبيعي الغاوسي (Gaussian Bell Curve)",
      formula: "f(x) = exp(-x²)",
      desc: "الأساس الرياضي لنمذجة الضوضاء في الفضاء اللاسلكي والمعروفة بـ AWGN. في أبحاث الـ CSI وضغط القنوات، يتم دمج هذا التوزيع لاختبار قدرة شبكات Autoencoders على استرجاع المصفوفات الأصلية بدقة وسط بيئة مشوشة."
    },
    bessel: {
      title: "دوال بيسل من الجيل الأول (Bessel Function J_n)",
      formula: "J_n(x) = (1/π) ∫ cos(nθ - x sin θ) dθ",
      desc: "تُستخدم دوال بيسل على نطاق واسع في هندسة الاتصالات لحل معادلات انتشار الإشارات الكهرومغناطيسية داخل موجهات الموجات (Waveguides) وحساب التعديل الترددي العريض للفراغ المحيط بالمحطات."
    },
    step: {
      title: "دالة الخطوة اللحظية (Heaviside Step Function)",
      formula: "U(x) = 1 if x ≥ 0, else 0",
      desc: "تمثل دالة الخطوة الانتقال المثالي والمفاجئ في الأنظمة الرقمية (ON/OFF). تُستخدم هندسياً لاختبار استجابة الفلاتر والأنظمة الكهربائية للنبضات المفاجئة والتحقق من استقرار قنوات الاتصال."
    },
    user_custom: {
      title: "الدالة المخصصة من قبل المستخدم (User Defined Dynamic Function)",
      formula: `${userMathFormula}`,
      desc: "يقوم محرك المختبر الرياضي المدمج هنا بقراءة النص المدخل من قبلك، وتفكيكه ديناميكياً بدلالة المتغير X، ومن ثم رسمه مباشرة. تدعم الصيغة العمليات الحسابية القياسية والمثلثية مثل sin(x) و cos(x) والأسس مثل x**2."
    }
  };

  // تفاصيل خصائص الرموز (Symbol Mapping) لكل نوع تضمين
  const modulationDetails: Record<string, { bitsPerSymbol: number; constellation: string; efficiency: string }> = {
    bpsk: { bitsPerSymbol: 1, constellation: "نقطتان على محور الأفق (0° و 180°)", efficiency: "1 bit/symbol - مقاوِمة جداً للتشويش لكن سعتها منخفضة." },
    qpsk: { bitsPerSymbol: 2, constellation: "4 نقاط في المستوي القطبي (45°, 135°, 225°, 315°)", efficiency: "2 bits/symbol - تضاعف سرعة نقل البيانات بنفس النطاق الترددي." },
    "16qam": { bitsPerSymbol: 4, constellation: "مصفوفة شبكية من 16 نقطة (تعديل سعة وطور معاً)", efficiency: "4 bits/symbol - كفاءة طيفية عالية جداً، تستخدم في شبكات الجيل الخامس وتتطلب SNR مرتفع." }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col font-sans" dir="rtl">
      
      {/* الرأس الهيدر */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">مركز المختبرات التفاعلية المطور الأكاديمي</h1>
          <p className="text-xs text-slate-400 mt-1">
            {activesection === "main" ? "منظومة معالجة الإشارات الرقمية ومحاكاة شبكات 5G/6G اللاسلكية" : `المعمل 🧭 ${activesection}`}
          </p>
        </div>
        {activesection !== "main" && (
          <button
            onClick={() => { setActiveSection("main"); addLog(`تم الخروج والعودة للقائمة الرئيسية.`); }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            ↩ العودة للشاشة الرئيسية
          </button>
        )}
      </div>

      {/* 1. قائمة البطاقات الرئيسية */}
      {activesection === "main" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-auto">
          <div onClick={() => { setActiveSection("محاكاة شبكات الاتصالات والتضمين"); addLog("تم فتح مختبر شبكات الاتصالات والتضمين الرقمي."); }} className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 cursor-pointer transition-all hover:-translate-y-1 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
            <h3 className="font-bold text-lg text-blue-300 mb-2">محاكاة شبكات الاتصالات والتضمين</h3>
            <p className="text-xs text-slate-400 leading-relaxed">دراسة سلوك الإشارات تحت تقنيات التعديل كـ BPSK و QAM ومحاكاة قنوات MIMO اللاسلكية الحية.</p>
          </div>

          <div onClick={() => { setActiveSection("محرر الأكواد وخوارزميات (Python)"); addLog("تم فتح بيئة تحرير أكواد بايثون والخوارزميات."); }} className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500 cursor-pointer transition-all hover:-translate-y-1 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
            <h3 className="font-bold text-lg text-emerald-300 mb-2">محرر الأكواد والخوارزميات</h3>
            <p className="text-xs text-slate-400 leading-relaxed">بيئة بايثون متكاملة مجهزة لكتابة شيفرات ضغط قنوات الـ CSI ومصفوفات التعلم العميق.</p>
          </div>

          <div onClick={() => { setActiveSection("أداة رسم الإشارات المتعددة"); addLog("تم فتح أداة رسم ومعاينة الإشارات المتعددة التفاعلية."); }} className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500 cursor-pointer transition-all hover:-translate-y-1 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📈</div>
            <h3 className="font-bold text-lg text-amber-300 mb-2">رسم الإشارات المتعددة</h3>
            <p className="text-xs text-slate-400 leading-relaxed">توليد موجات جيبية مخصصة وإدخال معادلات يدوية لرؤية التعديل الترددي وتأثير التشويش العشوائي.</p>
          </div>

          <div onClick={() => { setActiveSection("رسم الدوال الرياضية"); addLog("تم فتح معمل رسم الدوال الرياضية وتحويلات فورير."); }} className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500 cursor-pointer transition-all hover:-translate-y-1 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🧮</div>
            <h3 className="font-bold text-lg text-purple-300 mb-2">رسم الدوال الرياضية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">تفكيك الإشارات عبر متسلسلات فورير وتوليد دوال هندسية معقدة وحرّة بكتابة المعادلات.</p>
          </div>
        </div>
      )}

      {/* 2. اللوحة الداخلية للمختبر المفتوح */}
      {activesection !== "main" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          
          {/* القائمة الجانبية للمدخلات */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
            <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">⚙️ المعطيات والتحكم</h3>
            
            {/* المحور المشترك للتحكم في السعة لكافة أقسام الرسم */}
            {!activesection.includes("الأكواد") && (
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1.5">
                <label className="block text-purple-400 font-semibold text-xs">🎛️ تكبير/تصغير محور السعة (Y-Scale): ±{yScale}</label>
                <input 
                  type="range" min="1" max="15" step="1" value={yScale} 
                  onChange={(e) => { setYScale(parseInt(e.target.value)); addLog(`تم تعديل دقة العرض لمحور السعة الصادي الصاعد إلى: ±${e.target.value}`); }} 
                  className="w-full accent-purple-500 bg-slate-800 rounded-lg h-2" 
                />
              </div>
            )}

            {/* خيارات الشبكات والتضمين */}
            {activesection === "محاكاة شبكات الاتصالات والتضمين" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block text-emerald-400 mb-2 font-semibold">نوع تقنية التضمين (Modulation):</label>
                  <select 
                    value={modulationType} onChange={(e) => { setModulationType(e.target.value); addLog(`تم تبديل تقنية التضمين الرقمي إلى (${e.target.value.toUpperCase()})`); }}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-200 font-bold"
                  >
                    <option value="bpsk">BPSK (Binary Phase Shift Keying)</option>
                    <option value="qpsk">QPSK (Quadrature Phase Shift Keying)</option>
                    <option value="16qam">16-QAM (Quadrature Amplitude Modulation)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">هوائيات الإرسال (MIMO Tx): {txAntennas}</label>
                  <input type="range" min="2" max="64" step="2" value={txAntennas} onChange={(e) => { setTxAntennas(parseInt(e.target.value)); addLog(`تعديل عدد هوائيات الإرسال بالمحطة إلى: ${e.target.value}`); }} className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">هوائيات الاستقبال (MIMO Rx): {rxAntennas}</label>
                  <input type="range" min="2" max="16" step="2" value={rxAntennas} onChange={(e) => { setRxAntennas(parseInt(e.target.value)); addLog(`تعديل هوائيات الهاتف المستلم إلى: ${e.target.value}`); }} className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">نسبة الـ SNR: {snr} dB</label>
                  <input type="range" min="0" max="30" step="2" value={snr} onChange={(e) => { setSnr(parseInt(e.target.value)); addLog(`تحديث شدة الإشارة ونسبة الضوضاء SNR لتصبح: ${e.target.value} dB`); }} className="w-full accent-blue-500 bg-slate-800 rounded-lg h-2" />
                </div>
              </div>
            )}

            {/* خيارات أداة رسم الإشارات */}
            {activesection === "أداة رسم الإشارات المتعددة" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-2">نوع الدالة / الموجة:</label>
                  <select value={waveType} onChange={(e) => { setWaveType(e.target.value); addLog(`تغيير شكل الموجة المرجعية إلى: ${e.target.value}`); }} className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-amber-400 font-bold">
                    <option value="sine">موجة جيبية (Sine Wave)</option>
                    <option value="cosine">موجة جيب تمام (Cosine)</option>
                    <option value="square">موجة مربعة (Square Wave)</option>
                    <option value="triangle">موجة مثلثية (Triangle)</option>
                    <option value="custom">✍️ كتابة دالة مخصصة يدوياً</option>
                  </select>
                </div>
                {waveType === "custom" && (
                  <div>
                    <label className="block text-amber-400 mb-1 font-semibold">المعادلة بدلالة (t):</label>
                    <input type="text" value={customFormula} onChange={(e) => { setCustomFormula(e.target.value); addLog(`تحديث المعادلة اليدوية المخصصة للموجة.`); }} className="w-full bg-slate-900 border border-slate-700 p-2 rounded-lg font-mono text-slate-200 text-left" dir="ltr" />
                  </div>
                )}
                <div>
                  <label className="block text-slate-400 mb-1">التردد: {frequency} Hz</label>
                  <input type="range" min="0.5" max="100" step="0.5" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">السعة (Amplitude): {amplitude}</label>
                  <input type="range" min="0.5" max="20" step="0.1" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} className="w-full accent-blue-500 bg-slate-800 rounded-lg h-2" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">مستوى الضوضاء: {noiseLevel}</label>
                  <input type="range" min="0" max="2" step="0.1" value={noiseLevel} onChange={(e) => setNoiseLevel(parseFloat(e.target.value))} className="w-full accent-red-500 bg-slate-800 rounded-lg h-2" />
                </div>
              </div>
            )}

            {/* خيارات أداة الدوال الرياضية الحرة */}
            {activesection === "رسم الدوال الرياضية" && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-2">اختر النمط الرياضي:</label>
                  <select value={mathFunction} onChange={(e) => { setMathFunction(e.target.value); addLog(`استدعاء الرسم الهندسي لنمط: ${e.target.value}`); }} className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-purple-400 font-bold">
                    <option value="fourier">تقريب متسلسلة فورير (Fourier Sine)</option>
                    <option value="sinc">دالة المعاينة الرقمية (Sinc Function)</option>
                    <option value="gaussian">التوزيع الطبيعي الغاوسي (Gaussian)</option>
                    <option value="bessel">دالة بيسل لانتشار الموجات (Bessel)</option>
                    <option value="step">دالة الخطوة اللحظية (Heaviside Step)</option>
                    <option value="user_custom">✍️ رسم معادلة حرة مخصصة (أي دالة)</option>
                  </select>
                </div>

                {mathFunction === "user_custom" && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 animate-fadeIn flex flex-col gap-2">
                    <label className="block text-purple-300 font-semibold">اكتب الدالة بدلالة المتغير x:</label>
                    <input 
                      type="text" 
                      value={userMathFormula} 
                      onChange={(e) => { setUserMathFormula(e.target.value); addLog(`تحديث المعادلة الحرة إلى: ${e.target.value}`); }}
                      placeholder="مثال: x**2 - 3*x + sin(x)"
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded-lg font-mono text-slate-200 text-left" 
                      dir="ltr"
                    />
                    <div className="text-[10px] text-slate-500 leading-relaxed">
                      💡 أمثلة صالحة للرسم الفوري:<br/>
                      • معادلة تربيعية: <code className="text-purple-400">x**2 - 4</code><br/>
                      • دالة مثلثية: <code className="text-purple-400">sin(x) * 2</code><br/>
                      • دالة مركبة: <code className="text-purple-400">x**3 - cos(x)</code>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={() => { setConsoleLogs(["[تطهير الكونسول]: تم تصفير سجل المخرجات الحالية بنجاح."]); }}
              className="mt-auto bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 font-bold text-xs p-2 rounded-xl transition-all"
            >
              تفريغ السجلات ومسح الشاشة 🗑️
            </button>
          </div>

          {/* ساحة العرض الكبرى والكونسول المتراكم */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-[75vh]">
            <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between overflow-y-auto max-h-[55vh]">
              
              {activesection.includes("الأكواد") ? (
                <div className="w-full h-full text-right">
                  <Editor
                    height="100%" defaultLanguage="python" theme="vs-dark"
                    value={pyCode} onChange={(val) => setPyCode(val || "")}
                    options={{ fontSize: 13, minimap: { enabled: false } }}
                  />
                </div>
              ) : (
                <div className="w-full flex-1 max-h-[38vh]">
                  <Line 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: "index", intersect: false },
                      plugins: {
                        legend: { labels: { color: "#94a3b8", font: { size: 11 } } },
                        tooltip: { enabled: true, backgroundColor: "#0f172a", titleColor: "#60a5fa", bodyColor: "#f8fafc" }
                      },
                      scales: {
                        x: { grid: { color: "#1e293b" }, ticks: { color: "#64748b"} },
                        y: { grid: { color: "#1e293b" }, ticks: { color: "#64748b" }, min: -yScale, max: yScale }, // تطبيق شريط التحكم الذكي في محور السعة
                      }
                    }} 
                  />
                </div>
              )}

              {/* قسم عرض الصيغة والشرح الأكاديمي الموسع */}
              {activesection === "رسم الدوال الرياضية" && mathExplanations[mathFunction] && (
                <div className="bg-slate-900/60 border border-purple-950/50 p-3 mt-3 rounded-xl text-right animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-1.5">
                    <span className="text-xs font-bold text-purple-400">📊 {mathExplanations[mathFunction].title}:</span>
                    <code className="text-xs font-mono text-slate-100 bg-slate-950 px-2 py-0.5 rounded dir-ltr text-left">
                      {mathExplanations[mathFunction].formula}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                    {mathExplanations[mathFunction].desc}
                  </p>
                </div>
              )}

              {/* تفاصيل وشرح خصائص التضمين الرقمي والرموز والبتات */}
              {activesection === "محاكاة شبكات الاتصالات والتضمين" && (
                <div className="bg-slate-900/60 border border-emerald-950/50 p-3 mt-3 rounded-xl text-right flex flex-col gap-2">
                  <div className="text-xs font-bold text-emerald-400 border-b border-slate-800 pb-1">💡 فك الرموز الرقمية وتحليل السعة الكلية (Symbol Telemetry Analysis):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-300">
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block">عدد البتات لكل رمز:</span>
                      <strong className="text-blue-400 text-xs font-mono">{modulationDetails[modulationType]?.bitsPerSymbol} Bits / Symbol</strong>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block">التوزيع القطبي (Constellation Map):</span>
                      <strong className="text-amber-400 text-[10px]">{modulationDetails[modulationType]?.constellation}</strong>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block">الكفاءة الطيفية والمقاومة:</span>
                      <strong className="text-emerald-400 text-[10px]">{modulationDetails[modulationType]?.efficiency}</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed text-justify mt-1">
                    الموجة المرسلة تتشكل بناءً على التوزيع القطبي أعلاه. سعة القناة الحالية ($MIMO\ Capacity$) تساوي <span className="text-emerald-400 font-bold font-mono">{(Math.min(txAntennas, rxAntennas) * Math.log2(1 + Math.pow(10, snr / 10))).toFixed(2)} bps/Hz</span>. زيادة الهوائيات إلى <span className="text-slate-200 font-bold">{txAntennas}x{rxAntennas}</span> تعزز دقة مصفوفة الـ CSI المرتدة عبر التعدد المكاني (Spatial Multiplexing).
                  </p>
                </div>
              )}
            </div>

            {/* شاشة الـ Console المتراكمة */}
            <div className="h-32 bg-slate-950 rounded-2xl border border-slate-800 p-3 flex flex-col font-mono text-xs">
              <span className="text-slate-500 font-bold mb-1 border-b border-slate-900 pb-1 block">📟 مراقب المخرجات المتراكم (Telemetry Output Log)</span>
              <pre 
                ref={consoleEndRef}
                className="text-slate-300 whitespace-pre-wrap overflow-y-auto flex-1 leading-relaxed text-[11px] scrollbar-thin scrollbar-thumb-slate-800"
              >
                {consoleLogs.map((log, index) => (
                  <div key={index} className="border-b border-slate-900/40 py-0.5">{log}</div>
                ))}
              </pre>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}