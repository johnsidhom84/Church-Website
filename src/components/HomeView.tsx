import { motion } from 'motion/react';
import { MapPin, Phone, Heart, BookOpen, ChevronLeft } from 'lucide-react';
import { AnnouncementsSlider } from './AnnouncementsSlider';
import { LiveStreamWidget } from './LiveStreamWidget';
import heroImg from '../assets/images/hero.jpg';
import logoImg from '../assets/images/logo.png';

interface HomeViewProps {
  onTabChange?: (tab: string) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  return (
    <div className="space-y-12 pb-24 lg:pb-12 max-w-[1400px] mx-auto px-4">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[45vh] sm:h-[55vh] lg:h-[60vh] max-h-[550px] rounded-[1.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl bg-stone-900"
      >
        <img 
          src={heroImg} 
          alt="كنيسة مارمرقس بشبرا" 
          className="absolute inset-0 w-full h-full object-cover object-[center_65%]"
        />
  
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
  
        <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-16 z-10">
          <div className="space-y-4 w-full text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="arabic-serif font-bold text-white leading-tight drop-shadow-2xl text-xl sm:text-2xl lg:text-4xl">
                 مرحباً بكم في كنيسة القديس مارمرقس الرسولي بشبرا
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="arabic-sans text-stone-200 font-medium opacity-90 text-sm sm:text-base lg:text-lg max-w-2xl ml-auto"
            >
               بيت الله المفتوح للجميع.. حيث تلتقي الأصالة بالروحانية في قلب حي شبرا العريق.
              </motion.p>
            </div>
          </div>
        </motion.section>

      {/* Daily Reading Mini-Widget */}
      <section className="custom-panel flex flex-col md:flex-row items-center gap-8 group">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center shrink-0">
          <BookOpen className="w-8 h-8 lg:w-10 lg:h-10" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-right">
          <h2 className="arabic-serif text-xl lg:text-2xl font-bold text-stone-800">قراءات اليوم الروحية</h2>
          <p className="arabic-sans text-stone-500 italic leading-relaxed text-sm lg:text-base">
            "كُلُّ شَيْءٍ مُسْتَطَاعٌ لِلْمُؤْمِني." - (مرقس ٩ : ٢٣)
          </p>
        </div>
        <button 
          onClick={() => onTabChange?.('readings')}
          className="px-6 py-3 lg:px-8 lg:py-4 bg-stone-900 text-white rounded-2xl font-bold arabic-sans flex items-center gap-2 hover:bg-gold transition-colors text-sm lg:text-base"
        >
          <span>عرض القراءات والسنكسار</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </section>

      {/* Announcements Slider Section */}
      <section className="custom-panel !p-8 lg:!p-12">
        <AnnouncementsSlider />
      </section>

      {/* Live Stream Section */}
      <section className="custom-panel !p-6 lg:!p-10">
        <LiveStreamWidget />
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
            className="custom-panel text-center space-y-3 lg:space-y-4 !mb-0"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white text-gold rounded-full flex items-center justify-center mx-auto shadow-sm border border-gold/10 p-1">
              {typeof item.icon === 'string' ? (
                <img src={item.icon} alt={item.title} className="w-6 h-6 lg:w-8 lg:h-8 object-contain" />
              ) : (
                <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              )}
            </div>
            <h3 className="arabic-serif text-xl lg:text-2xl font-bold text-stone-800">{item.title}</h3>
            <p className="arabic-sans text-stone-500 text-sm lg:text-base">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Mission Section */}
      <section className="bg-gold rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-14 text-white overflow-hidden relative shadow-xl">
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 lg:space-y-6">
            <h2 className="arabic-serif text-2xl lg:text-4xl font-bold">رسالتنا الكنسية</h2>
            <p className="arabic-sans text-base lg:text-lg opacity-90 leading-relaxed text-justify max-w-xl">
              تأسست كنيستنا لتكون منارة روحية تقدم تعاليم الإنجيل والتقاليد الكنسية للأجيال المتعاقبة. نحن نؤمن بأن الكنيسة هي جماعة المؤمنين التي تسعى للنمو الروحي وخدمة المجتمع المحيط بكل حب وتفانٍ.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-xs lg:text-sm">١٣ شارع الشيخ أحمد رافع، شريف، الساحل، القاهرة</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Phone className="w-4 h-4 text-white/80" />
                <span className="text-xs lg:text-sm">0224316533</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden border-4 border-white/10 shadow-lg">
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
