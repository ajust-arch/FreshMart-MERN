import { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { LogIn, LogOut, LayoutDashboard, PlusCircle, Package, ChevronRight, ShoppingCart } from "lucide-react";
import freshmartlogo from "../assets/freshmart-logo.svg";
import { adminNavbarStyles as s } from '../assets/dummyStyles';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("freshmart_user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const menuItems = [
    { name: "Dashboard", Icon: LayoutDashboard, href: "/dashboard" },
    { name: "Add Item", Icon: PlusCircle, href: "/add-items" },
    { name: "Item List", Icon: Package, href: "/item-list" },
    { name: "Add Hookah", Icon: PlusCircle, href: "/add-hookah" },
    { name: "Hookah List", Icon: Package, href: "/hookah-list" },
    { name: "Orders", Icon: ShoppingCart, href: "/orders" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("freshmart_user");
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={s.headerBase}>
      {/* 🚨 NO RESPONSIVE HIDING HERE. ALWAYS FLEX. */}
      <div className="flex w-full items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className={s.logoWrapper}>
          <div className={s.logoImageWrapper}>
            <img src={freshmartlogo} alt="FreshMart" className={s.logoImage} />
          </div>
          <div className={s.logoTextWrapper}>
            <p className={s.logoLabel}>Admin Panel</p>
            <h1 className={s.logoTitle}>Fresh Mart</h1>
          </div>
        </div>

        {/* Nav Links - Forced to show */}
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {menuItems.map((item) => {
            const Icon = item.Icon;
            const active = isActive(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-300 ${
                  active 
                    ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
                    : "border-yellow-400/20 bg-white/5 text-white/80 hover:bg-yellow-400 hover:text-black"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-black" : "text-yellow-300"}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Auth Buttons - Forced to show */}
        <div className="flex items-center">
          {user ? (
            <button onClick={handleLogout} className={s.logoutButton}>
              <LogOut className={s.authIcon} /> Logout
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className={s.loginButton}>
              <LogIn className={s.authIcon} /> Login
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;