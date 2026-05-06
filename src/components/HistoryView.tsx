import { motion } from 'motion/react';
import { BookOpen, Calendar, Award, Building2, Users, Star, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import heroImg from '../assets/images/hero.jpg';
import logoImg from '../assets/images/logo.png';

export default function HistoryView() {
  const milestones = [
    { year: '١٩٠٨', title: 'البذور الأولى', desc: 'تأسيس جمعية أصدقاء الكتاب المقدس التي كانت صاحبة الفضل في التفكير في إنشاء الكنيسة.' },
    { year: '١٩٥٠', title: 'شراء الأرض', desc: 'شراء قطعة الأرض الحالية بمساحة ١٥٠٠ متر مربع بحدائق شبرا.' },
    { year: '٢٤ مايو ١٩٥٣', title: 'حجر الأساس التاريخي', desc: 'وضع حجر الأساس بيد الرئيس محمد نجيب في يوم عيد العنصرة، وهي أول كنيسة يضع رئيس جمهورية حجر أساسها بنفسه.' },
    { year: '١٩٦٠', title: 'البناء الخرساني', desc: 'بدء تشييد الهيكل الخرساني الحالي للكنيسة.' },
    { year: '١٩٦٩', title: 'افتتاح الكنيسة العلوية', desc: 'إقامة أول قداس إلهي بالكنيسة العلوية في عيد الميلاد المجيد.' },
    { year: '٢٠١٤', title: 'مقر أسقفية شبرا', desc: 'اختيار الكنيسة لتكون مقراً لنيافة الحبر الجليل الأنبا أنجيلوس أسقف عام كنائس شبرا الشمالية.' },
  ];

  const fathers = [
    { 
      name: 'القمص مرقس داود', 
      role: 'صديق الكتاب المقدس', 
      desc: 'العالم والمترجم القدير الذي وضع أسس التعليم والترجمة في الكنيسة.',
      image: '/src/assets/images/fr_markos_dawoud.jpg'
    },
    { 
      name: 'القمص ميخائيل إبراهيم', 
      role: 'سفير السماء والقديس المعاصر', 
      desc: 'أب الاعتراف والقديس الذي عاش بالروح والاتضاع، ومزاره الآن بالكاتدرائية المرقسية.',
      image: '/src/assets/images/fr_mikhail_ibrahim.jpg'
    },
    { 
      name: 'القمص يوحنا جرجس', 
      role: 'المعلم والأب', 
      desc: 'رجل الوعظ والتعليم وصاحب الصوت الرخيم الذي تتلمذت على يديه أجيال.',
      image: '/src/assets/images/fr_yuhanna_guirguis.jpg'
    },
    { 
      name: 'القمص إسطفانوس عازر', 
      role: 'رجل النشاط والتدبير', 
      desc: 'شعلة الخدمة الذي اهتم بالتعمير المعماري والروحي ومباني الخدمات.',
      image: '/src/assets/images/fr_stephanos_azar.jpg'
    },
  ];

  const galleryItems = [
    { year: '١٩٥٣', title: 'لحظة وضع حجر الأساس', image: '/src/assets/images/foundation_stone.jpg' },
    { year: '١٩٦٠', title: 'أثناء البناء الخرساني', image: '/src/assets/images/construction.jpg' },
    { year: '١٩٨٨', title: 'رسامة شمامسة', image: '/src/assets/images/ordination.jpg' },
    { year: '٢٠١٦', title: 'زيارة قداسة البابا', image: '/src/assets/images/pope_visit.jpg' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-24 lg:pb-0">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-bold arabic-sans border border-gold/20">
          <Star className="w-4 h-4 fill-gold" />
          تراث روحي يمتد لأكثر من ٧٠ عاماً
        </div>
        <h1 className="arabic-serif text-xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">تاريخ الكنيسة العريق</h1>
        <p className="arabic-sans text-stone-500 max-w-3xl mx-auto text-base leading-relaxed">
          حكاية إيمان بدأت بجمعية أصدقاء الكتاب المقدس واستمرت لتصبح شجرة مثمرة يستظل تحتها الكثيرون.
        </p>
      </motion.div>

      {/* Intro & History Grid */}
      <section className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="inline-flex p-3 bg-gold text-white rounded-2xl shadow-lg shadow-gold/20" id="intro-icon">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="arabic-serif text-xl lg:text-4xl font-bold text-stone-800">نشأة الكنيسة</h2>
          <div className="space-y-6 arabic-sans text-stone-600 leading-relaxed text-sm lg:text-base italic">
            <p className="relative pl-6 leading-relaxed">
              "إن يوم ٢٤ مايو ١٩٥٣ كان يوماً تاريخياً، لأنه اليوم الذي بدأت فيه أول نبتة لهذه الكنيسة..."
            </p>
            <ul className="space-y-4 not-italic list-disc list-inside text-stone-700">
              <li>تأسست الكنيسة بجهود جمعية أصدقاء الكتاب المقدس (تأسست ١٩٠٨).</li>
              <li>تميزت منذ بدايتها بمبدأ "مجانية الخدمة" ووضع الصناديق بدلاً من الأطباق.</li>
              <li>زارها وباركها بابوات الكنيسة (البابا كيرلس السادس، البابا شنودة الثالث، والبابا تواضروس الثاني).</li>
            </ul>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gold/10 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-all duration-500 opacity-20" />
          <div className="relative aspect-video lg:aspect-square bg-stone-100 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl" id="history-image-container">
            <img 
              src={heroImg} 
              alt="تاريخ الكنيسة" 
              className="w-full h-full object-cover transition-all group-hover:scale-110 duration-700"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-12 custom-panel !p-10 lg:!p-16">
        <h2 className="arabic-serif text-3xl lg:text-4xl font-bold text-center text-stone-800">أبرز المحطات التاريخية</h2>
        <div className="relative">
          <div className="absolute top-0 right-1/2 bottom-0 w-px bg-stone-200 hidden md:block" />
          
          <div className="space-y-16">
            {milestones.map((ms, i) => (
              <motion.div 
                key={ms.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 text-center ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'} space-y-3`}>
                  <div className="arabic-sans inline-block px-3 py-0.5 bg-gold/10 text-gold rounded font-bold text-sm mb-2">
                    {ms.year}
                  </div>
                  <h3 className="arabic-serif text-2xl font-bold text-stone-800">{ms.title}</h3>
                  <p className="arabic-sans text-stone-500 text-lg leading-relaxed">{ms.desc}</p>
                </div>
                
                <div className="relative z-10 w-14 h-14 bg-white border-4 border-gold rounded-full flex items-center justify-center shrink-0 shadow-xl shadow-gold/20">
                  <div className="w-4 h-4 bg-gold rounded-full" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Fathers */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="arabic-serif text-3xl lg:text-4xl font-bold text-stone-800">أعمدة الكنيسة الروحية</h2>
          <p className="arabic-sans text-stone-500 max-w-2xl mx-auto">قامات روحية تركت بصمة لا تُمحى في تاريخ الكنيسة وشعبها.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fathers.map((father) => (
            <motion.div 
              key={father.name}
              whileHover={{ y: -10 }}
              className="custom-panel !p-6 !mb-0 text-center space-y-4 transition-all"
            >
              <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-md border-4 border-white">
                <img 
                  src={father.image}
                  alt={father.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(father.name.split(' ').pop() || '')}&background=fef3c7&color=b45309&size=128&font-size=0.33`;
                  }}
                />
              </div>
              <h3 className="arabic-serif text-xl font-bold text-stone-800">{father.name}</h3>
              <div className="text-gold font-bold arabic-sans text-[10px] uppercase tracking-widest bg-gold/5 px-3 py-1 rounded-full inline-block">
                {father.role}
              </div>
              <p className="arabic-sans text-stone-500 text-xs leading-relaxed">{father.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Treasures & Relics */}
      <section className="bg-gold rounded-[3rem] p-12 lg:p-16 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl border border-white/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="arabic-serif text-3xl lg:text-4xl font-bold leading-tight">ذخائر الكنيسة المقدسة</h2>
            <p className="arabic-sans text-white/80 text-lg">
              تحتوي الكنيسة على ذخائر ثمينة تبارك كل من يطأ هذه العتبات المقدسة:
            </p>
            <ul className="space-y-4 arabic-sans text-white">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                جزء من رفات القديس "مار مرقس الرسول" شفيع الكنيسة.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                رفات كوكبة من الشهداء والقديسين (أكثر من مئة قديس).
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                قطعة غالية من خشبة صليب السيد المسيح وشوكة من إكليل الشوك.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                بقع من دم المسيح ظهرت على تونية الشماس يوسف إسكندر (١٩٦٣).
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-stone-100 rounded-3xl -rotate-6 scale-95" />
            <div className="relative aspect-square bg-stone-50 rounded-3xl border-8 border-stone-100 flex items-center justify-center p-8 shadow-inner overflow-hidden">
              <img 
                src={logoImg} 
                alt="St. Mark Icon" 
                className="w-full h-full object-contain opacity-20 contrast-125"
              />
              <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 flex flex-col items-center justify-center italic text-amber-900 arabic-sans text-[10px] text-center p-2">
                    <Star className="w-3 h-3 mb-1 text-amber-600" />
                    مقتنيات مقدسة {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="arabic-serif text-3xl lg:text-4xl font-bold text-stone-800 flex items-center gap-4">
              <ImageIcon className="w-10 h-10 text-gold" />
              ألبوم الذكريات
            </h2>
            <p className="arabic-sans text-stone-500">مشاهد تاريخية من حياة الكنيسة وخدمتها عبر السنين.</p>
          </div>
          <button className="px-8 py-3 bg-stone-900 text-white rounded-full arabic-sans font-bold hover:bg-gold transition-colors shadow-lg">
            عرض كل الصور
          </button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[3/4] bg-stone-200 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i + 45}/600/800?sepia=1`;
                    }}
                  />
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <div className="arabic-sans text-amber-400 font-bold text-xs mb-1">{item.year}</div>
                <div className="arabic-serif text-white text-lg font-bold">{item.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Stats Summary */}
      <section className="custom-panel !p-12 text-center space-y-8 !bg-stone-50/50">
        <h2 className="arabic-serif text-3xl font-bold text-stone-400 italic">"أمانة الآباء.. ورجاء الأبناء"</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'عام من الإيمان', val: '٧٠+', icon: Calendar },
            { label: 'كاهن تخرج منها', val: '٢٧+', icon: Users },
            { label: 'أدوات الخدمة', val: '١٥+', icon: Building2 },
            { label: 'نتاج الخدمة', val: 'مئات', icon: Award },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <stat.icon className="w-6 h-6 text-gold mx-auto" />
              <div className="text-4xl font-bold text-stone-900 leading-none">{stat.val}</div>
              <div className="arabic-sans text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
