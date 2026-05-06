import { Calendar, Home, Book, Megaphone, LayoutGrid } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'readings', label: 'القراءات', icon: Book },
    { id: 'services', label: 'خدمات الكنيسة', icon: LayoutGrid },
    { id: 'announcements', label: 'الإعلانات', icon: Megaphone },
    { id: 'events', label: 'المواعيد', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto bg-white/95 backdrop-blur-md border-t lg:border-t-0 lg:border-b-2 border-gold/20 lg:border-gold z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Mobile Header Branding */}
        <div className="lg:hidden flex items-center justify-between h-14 border-b border-stone-100 mb-1 px-2">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-lg shadow-sm border border-gold/10">
              <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="arabic-serif font-bold text-base text-stone-800">كنيسة مارمرقس بشبرا</span>
          </div>
        </div>

        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="hidden lg:flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl shadow-sm border border-gold/10">
              <img 
                src={logoImg} 
                alt="Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="arabic-serif font-bold text-xl text-stone-800">كنيسة مارمرقس بشبرا</span>
          </div>
          
          <div className="flex flex-1 justify-around lg:justify-end lg:gap-6 max-w-lg lg:max-w-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'text-gold lg:bg-gold/10 font-bold' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs lg:text-base arabic-sans">{tab.label}</span>
                  {isActive && (
                    <div className="lg:hidden w-1.5 h-1.5 bg-gold rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
