import { motion } from 'motion/react';
import React from 'react';
import { Phone, Heart, UserCheck, Calendar } from 'lucide-react';

const CLERGY = [
  {
    name: 'أبونا القمص مرقس داود',
    ordination: '1948 م.',
    promotion: '12 سبتمبر 1975 م.',
    status: 'تنيح',
    note: '',
    image: '/src/assets/images/fr_markos_dawoud.jpg'
  },
  {
    name: 'أبونا القمص اسطفانوس عازر سرجيوس',
    ordination: '24 مايو 1966 م.',
    promotion: '19 فبراير 1988 م.',
    status: 'تنيح',
    note: ''
  },
  {
    name: 'أبونا القمص يوحنا جرجس',
    ordination: '',
    promotion: '14 نوفمبر 1975 م.',
    status: 'تنيح',
    note: ''
  },
  {
    name: 'أبونا القمص ميخائيل إبراهيم يوسف',
    ordination: '16 سبتمبر 1951 م.',
    promotion: 'مايو 1952 م.',
    status: 'تنيح',
    note: '',
    image: '/src/assets/images/fr_mikhail_ibrahim.jpg'
  },
  {
    name: 'أبونا القمص مينا ميخائيل',
    ordination: '28 مايو 1972 م.',
    promotion: '2 مارس 1975 م.',
    status: 'سابق',
    note: 'يخدم بكنيسة أخرى'
  },
  {
    name: 'أبونا القمص ميخائيل نجيب غالي',
    ordination: '13 إبريل 1975 م.',
    promotion: '3 يونيو 2003 م.',
    status: 'تنيح',
    note: ''
  },
  {
    name: 'أبونا القمص لوقا قسطنطين عوض الله',
    ordination: '14 يناير 1979 م.',
    promotion: '14 نوفمبر 1998 م.',
    status: 'تنيح',
    note: ''
  },
  {
    name: 'أبونا القمص بيمن جورج سعيد عبد السيد',
    ordination: '19 فبراير 1988 م.',
    promotion: '17 مارس 2017 م.',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القمص برسوم بشرى جرجس',
    ordination: '19 فبراير 1988 م.',
    promotion: '17 مارس 2017 م.',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القمص مرقس فتحي صادق حنا',
    ordination: '19 يونيو 1994 م.',
    promotion: '3 مارس 2013 م.',
    status: 'سابق',
    note: 'يخدم بكنيسة أخرى'
  },
  {
    name: 'أبونا القس يوسف يوسف يوسف رزق',
    ordination: '14 نوفمبر 1999 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس كيرلس كمال فخري سوريال',
    ordination: '7 يونيو 2009 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس أنطونيوس مفيد محارب',
    ordination: '7 يونيو 2009 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس ميخائيل مقار ثابت قلته',
    ordination: '7 يونيو 2009 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس مرقس منير سمير ميخائيل',
    ordination: '16 نوفمبر 2014 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس يوحنا محفوظ',
    ordination: '16 نوفمبر 2014 م.',
    promotion: '',
    status: 'تنيح',
    note: ''
  },
  {
    name: 'أبونا القس متي جوزيف',
    ordination: '19 فبراير 2026 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس لوقا فهمي',
    ordination: '19 فبراير 2026 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس يوحنا سعد',
    ordination: '19 فبراير 2026 م.',
    promotion: '',
    status: 'حالي',
    note: ''
  },
  {
    name: 'أبونا القس بيشوي عهدى',
    ordination: '',
    promotion: '',
    status: 'حالي',
    note: ''
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function ClergyView() {
  const currentClergy = CLERGY.filter(p => p.status === 'حالي');
  const pastClergy = CLERGY.filter(p => p.status !== 'حالي');

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24 lg:pb-0 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <h1 className="arabic-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">الآباء الكهنة</h1>
        <p className="arabic-sans text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
          "رُعَاةٌ حَسَبَ قَلْبِي، فَيَرْعَوْنَكُمْ بِالْمَعْرِفَةِ وَالْفَهْمِ." - إرميا ٣ : ١٥
        </p>
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-stone-200 flex-1" />
          <h2 className="arabic-serif text-2xl font-bold text-gold">الآباء الحاليون</h2>
          <div className="h-px bg-stone-200 flex-1" />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentClergy.map((priest, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="custom-panel space-y-4 !mb-0"
            >
              <div className="flex items-center gap-4 border-b border-stone-50 pb-4">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="arabic-serif text-xl font-bold text-stone-900">{priest.name}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="arabic-sans text-stone-400">تاريخ السيامة</span>
                  <span className="arabic-sans font-bold text-stone-700">{priest.ordination}</span>
                </div>
                {priest.promotion && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="arabic-sans text-stone-400">تاريخ القمصية</span>
                    <span className="arabic-sans font-bold text-gold">{priest.promotion}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="space-y-8 p-8 lg:p-12 custom-panel !bg-stone-50/30">
        <div className="flex items-center gap-4">
          <div className="h-px bg-stone-200 flex-1" />
          <h2 className="arabic-serif text-2xl font-bold text-stone-500">آباء خدموا بالكنيسة</h2>
          <div className="h-px bg-stone-200 flex-1" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pastClergy.map((priest, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className={`p-6 rounded-[2rem] border transition-all space-y-4 flex flex-col items-center text-center ${
                priest.status === 'تنيح' 
                ? 'bg-gold/5 border-gold/10 shadow-sm' 
                : 'bg-transparent border-stone-200/60'
              }`}
            >
              {priest.image && (
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md mb-2">
                  <img src={priest.image} alt={priest.name} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex flex-col items-center gap-4 border-b border-stone-50/50 pb-4 w-full">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  priest.status === 'تنيح' ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-500'
                }`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="arabic-serif text-xl font-bold text-stone-900">{priest.name}</h3>
                  <div className="flex justify-center gap-2 mt-1">
                    {priest.status === 'تنيح' && (
                      <span className="text-[10px] bg-stone-800 text-stone-100 px-2 py-0.5 rounded-full arabic-sans">تنيح</span>
                    )}
                    {priest.note && (
                      <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full arabic-sans">{priest.note}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2 w-full">
                {priest.ordination && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="arabic-sans text-stone-400">تاريخ السيامة</span>
                    <span className="arabic-sans font-bold text-stone-700">{priest.ordination}</span>
                  </div>
                )}
                {priest.promotion && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="arabic-sans text-stone-400">تاريخ القمصية</span>
                    <span className="arabic-sans font-bold text-gold text-xs">{priest.promotion}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="bg-stone-900 rounded-[3rem] p-12 text-center space-y-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32" />
        <h3 className="arabic-serif text-3xl font-bold">لطلب سر الاعتراف أو الإرشاد الروحي</h3>
        <p className="arabic-sans text-stone-400 max-w-xl mx-auto leading-relaxed">
          يمكنكم التواصل مع الآباء في المواعيد المعلنة بالكنيسة، أو الحضور لمقابلة الأب الكاهن المسؤول. جميع المحادثات والاعترافات سرية تماماً.
        </p>
      </div>
    </div>
  );
}
