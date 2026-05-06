import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Heart, BookOpen, ChevronLeft } from 'lucide-react';
import { AnnouncementsSlider } from './AnnouncementsSlider';
import { LiveStreamWidget } from './LiveStreamWidget';
import heroImg from '../assets/images/hero.jpg';
import logoImg from '../assets/images/logo.png';

interface HomeViewProps {
  onTabChange?: (tab: string) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="space-y-12 pb-24 lg:pb-0">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[45vh] sm:h-[60vh] lg:h-[75vh] rounded-[1.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl"
      >
        <motion.img 
          style={{ y: parallaxY }}
          src={heroImg} 
          alt="كنيسة مارمرقس بشبرا" 
          className="absolute inset-x-0 -top-1/4 w-full h-[150%] lg:h-[130%] lg:-top-0 object-cover object-center hidden lg:block"
        />
        <img 
          src={heroImg} 
          alt="كنيسة مارمرقس بشبرا" 
          className="absolute inset-0 w-full h-full object-cover object-center lg:hidden"
        />
        {/* Enhanced Multi-layer Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-24">
          <div className="space-y-4 lg:space-y-6 max-w-4xl text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="arabic-serif text-2xl sm:text-4xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                مرحباً بكم في كنيسة القديس مارمرقس الرسولي بشبرا
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="arabic-sans text-stone-200 text-sm sm:text-lg lg:text-3xl leading-relaxed max-w-2xl ml-auto"
            >
              بيت الله المفتوح للجميع.. حيث تلتقي الأصالة بالروحانية في قلب حي شبرا العريق.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Live Stream Section */}
      <section className="custom-panel !p-8 lg:!p-12">
        <LiveStreamWidget />
      </section>

      {/* Announcements Slider Section */}
      <section className="custom-panel !p-12 lg:!p-20">
        <AnnouncementsSlider />
      </section>

      {/* Daily Reading Mini-Widget */}
      <section className="custom-panel flex flex-col md:flex-row items-center gap-8 group">
        <div className="w-20 h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center shrink-0">
          <BookOpen className="w-10 h-10" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-right">
          <h2 className="arabic-serif text-2xl font-bold text-stone-800">قراءات اليوم الروحية</h2>
          <p className="arabic-sans text-stone-500 italic leading-relaxed">
            "كُلُّ شَيْءٍ مُسْتَطَاعٌ لِلْمُؤْمِنِ." - (مرقس ٩ : ٢٣)
          </p>
        </div>
        <button 
          onClick={() => onTabChange?.('readings')}
          className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold arabic-sans flex items-center gap-2 hover:bg-gold transition-colors"
        >
          <span>عرض القراءات والسنكسار</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Heart, title: 'المحبة', desc: 'نخدم الجميع بروح الحب والتواضع' },
          { icon: logoImg, title: 'العبادة', desc: 'صلوات وطقوس كنسية يومية' },
          { icon: Phone, title: 'الخدمة', desc: 'متواجدون دائماً للاستماع والإرشاد' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="custom-panel text-center space-y-4 !mb-0"
          >
            <div className="w-12 h-12 bg-white text-gold rounded-full flex items-center justify-center mx-auto shadow-sm border border-gold/10 p-1">
              {typeof item.icon === 'string' ? (
                <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
              ) : (
                <item.icon className="w-6 h-6" />
              )}
            </div>
            <h3 className="arabic-serif text-2xl font-bold text-stone-800">{item.title}</h3>
            <p className="arabic-sans text-stone-500">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-gold rounded-[3rem] p-8 lg:p-16 text-white overflow-hidden relative shadow-xl">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="arabic-serif text-lg lg:text-5xl font-bold">رسالتنا الكنسية</h2>
            <p className="arabic-sans text-lg opacity-90 leading-relaxed text-justify">
              تأسست كنيستنا لتكون منارة روحية تقدم تعاليم الإنجيل والتقاليد الكنسية للأجيال المتعاقبة. نحن نؤمن بأن الكنيسة هي جماعة المؤمنين التي تسعى للنمو الروحي وخدمة المجتمع المحيط بكل حب وتفانٍ.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">١٣ شارع الشيخ أحمد رافع، شريف، الساحل، القاهرة</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Phone className="w-4 h-4" />
                <span className="text-sm">0224316533</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative h-80 rounded-2xl overflow-hidden border-4 border-white/10">
            <img 
              src={heroImg} 
              alt="Church Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

