import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import clubLogo from "@/assets/club-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Match Analytics", path: "/analytics" },
    { name: "Media", path: "/media" },
    { name: "Fantasy Club", path: "/club" },
    { name: "News", path: "/news" },
    { name: "Predictions", path: "/predictions" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <img src={clubLogo} alt="Sports Club of SSC Logo" className="h-12 w-12" />
            <div className="hidden md:block">
              <h1 className="text-2xl font-bebas text-foreground">Sports Club</h1>
              <p className="text-xs text-muted-foreground -mt-1">OF SSC</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md font-inter text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                {user?.isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Shield className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="ml-2">
                  <User className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md font-inter font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="px-4 py-3 border-t border-border mt-2">
                <p className="text-sm text-muted-foreground mb-2">Signed in as {user?.name}</p>
                {user?.isAdmin && (
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full mb-2">
                      <Shield className="h-4 w-4 mr-2" /> Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="w-full">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-4 py-3">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
