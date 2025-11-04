import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroStadium from "@/assets/hero-stadium.jpg";
import { BarChart3, Video, Trophy, Calendar, ArrowRight, Target } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to next match (example: Feb 15, 2025)
  useEffect(() => {
    const countDownDate = new Date("Feb 15, 2025 15:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    { label: "Tournaments Organized", value: "87", icon: Trophy },
    { label: "Participating Teams", value: "342", icon: Target },
    { label: "Registered Athletes", value: "2400+", icon: Target },
    { label: "Events This Year", value: "45", icon: Trophy },
  ];

  const featuredTournaments = [
    { name: "Inter-School Football Championship", participants: "24 Teams", prize: "$5,000", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80" },
    { name: "Annual Basketball League", participants: "18 Teams", prize: "$3,500", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
    { name: "Multi-Sport Regional Cup", participants: "32 Teams", prize: "$8,000", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
  ];

  const upcomingEvents = [
    { title: "Football Championship Finals", date: "Feb 15", time: "3:00 PM", sport: "Football" },
    { title: "Basketball League Semi-Finals", date: "Feb 20", time: "6:00 PM", sport: "Basketball" },
    { title: "Regional Multi-Sport Tournament", date: "Mar 1", time: "TBD", sport: "Multi-Sport" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroStadium})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-slide-in">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas text-foreground mb-6">
            Sports Club <span className="text-primary text-glow">of SSC</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Organizing Excellence in Sports Competitions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analytics">
              <Button size="lg" className="text-xl font-bebas px-8 py-6 gradient-orange hover-lift">
                View Stats <BarChart3 className="ml-2" />
              </Button>
            </Link>
            <Link to="/media">
              <Button size="lg" variant="outline" className="text-xl font-bebas px-8 py-6 hover-lift border-2 border-primary hover:bg-primary hover:text-primary-foreground">
                Watch Highlights <Video className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90 text-primary" size={32} />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={stat.label} className="hover-lift text-center animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-8">
                  <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="text-5xl font-bebas text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Match Countdown */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="hover-lift gradient-hero border-primary/50">
            <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bebas text-foreground mb-2">Next Event</h2>
              <p className="text-xl text-muted-foreground mb-8">Football Championship Finals</p>
              
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-card rounded-lg p-4 border border-primary/30">
                    <p className="text-4xl md:text-6xl font-bebas text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground uppercase">{unit}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/club">
                <Button size="lg" className="mt-8 text-lg font-bebas px-8 py-6 gradient-orange hover-lift">
                  View All Events <Calendar className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Player Spotlight Carousel */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
              Featured <span className="text-primary">Tournaments</span>
            </h2>
            <p className="text-xl text-muted-foreground">Our premier sports competitions</p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {featuredTournaments.map((tournament, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="hover-lift overflow-hidden">
                    <div 
                      className="h-80 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${tournament.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-3xl font-bebas text-foreground mb-1">{tournament.name}</h3>
                        <p className="text-primary font-semibold mb-2">{tournament.participants}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-muted-foreground">🏆 Prize Pool: {tournament.prize}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground">Don't miss these exciting competitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 rounded-full gradient-orange flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bebas text-foreground mb-2">{event.title}</h3>
                  <p className="text-primary font-bold mb-1">{event.date} • {event.time}</p>
                  <p className="text-sm text-muted-foreground">{event.sport}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
