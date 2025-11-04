import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import clubLogo from "@/assets/club-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Analytics", path: "/analytics" },
    { name: "Media", path: "/media" },
    { name: "Club", path: "/club" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={clubLogo} alt="Sports Club of SSC" className="h-12 w-12" />
              <div>
                <h3 className="text-xl font-bebas text-foreground">Sports Club of SSC</h3>
                <p className="text-xs text-muted-foreground">Excellence in Athletics</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Where passion meets precision. Join us in celebrating athletic excellence and team spirit.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bebas text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bebas text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Sports Club of SSC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
