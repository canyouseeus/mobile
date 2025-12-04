import { Menu, Search, X, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'HOME', href: '#' },
  { label: 'SHOP', href: '#' },
  {
    label: 'THE LOST ARCHIVES',
    subItems: [
      { label: 'ALL ARTICLES', href: '#' },
      { label: 'BOOK CLUB', href: '#' },
      { label: 'GEARHEADS', href: '#' },
      { label: 'EDGE OF THE BORDERLANDS', href: '#' },
      { label: 'SCIENCE COLUMN', href: '#' },
      { label: 'NEW THEORY', href: '#' },
    ]
  },
  {
    label: 'MORE',
    subItems: [
      { label: 'ABOUT', href: '#' },
      { label: 'PRIVACY POLICY', href: '#' },
      { label: 'TERMS AND CONDITIONS', href: '#' },
    ]
  },
  { label: 'LOG IN', href: '#' },
];

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <header className="sticky top-0 bg-black z-50 border-b border-gray-800">
      <div className="px-4 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold whitespace-nowrap text-xl tracking-tight">THE LOST+UNFOUNDS</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900">
              <Search className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-black"
            >
              <ul className="flex flex-col border-t border-gray-800 mt-4">
                {MENU_ITEMS.map((item) => (
                  <li key={item.label} className="border-b border-gray-800 last:border-b-0">
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between py-4 text-white hover:bg-gray-900 transition-colors uppercase text-sm tracking-wide font-medium"
                        >
                          {item.label}
                          <Play 
                            className={`w-3 h-3 fill-current transition-transform duration-200 ${openSubmenus[item.label] ? 'rotate-90' : ''}`} 
                          />
                        </button>
                        <AnimatePresence>
                          {openSubmenus[item.label] && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-black pb-2"
                            >
                              {item.subItems.map((subItem) => (
                                <li key={subItem.label}>
                                  <a 
                                    href={subItem.href} 
                                    className="block py-3 pl-4 pr-4 text-gray-400 hover:text-white hover:bg-gray-900 text-sm uppercase tracking-wide border-t border-gray-900"
                                  >
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a 
                        href={item.href} 
                        className="block py-4 text-white hover:bg-gray-900 transition-colors uppercase text-sm tracking-wide font-medium"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}