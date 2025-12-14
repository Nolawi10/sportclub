import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroStadium from "@/assets/hero-stadium.jpg";
import teamOfWeekImg from "@/assets/team-of-week.png";
import playerOfWeekImg from "@/assets/player-of-week.png";
import { BarChart3, Video, Trophy, Calendar, ArrowRight, Target, Star, Users, Youtube, ExternalLink } from "lucide-react";
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

  useEffect(() => {
    const countDownDate = new Date("Feb 22, 2025 15:00:00").getTime();
    
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
    { label: "Total Goals", value: "47", icon: Target },
    { label: "Matches Played", value: "16", icon: Trophy },
    { label: "Teams Competing", value: "12", icon: Users },
    { label: "Week", value: "3", icon: Calendar },
  ];

  const topScorers = [
    { name: "Haileab", team: "11A", goals: 4 },
    { name: "Samson", team: "12C", goals: 3 },
    { name: "Elias", team: "12B", goals: 3 },
    { name: "Musse", team: "10B", goals: 3 },
    { name: "Dawit", team: "11A", goals: 2 },
  ];

  const standings = [
    { rank: 1, team: "11A", pts: 6, form: ["W", "W"] },
    { rank: 2, team: "12C", pts: 3, form: ["W"] },
    { rank: 2, team: "12B", pts: 3, form: ["W"] },
    { rank: 4, team: "12A", pts: 3, form: ["W"] },
    { rank: 4, team: "11B", pts: 3, form: ["W"] },
  ];

  const upcomingEvents = [
    { title: "11A vs 11C", date: "Feb 22", time: "3:00 PM", sport: "Football Finals", badge: "FINALS" },
    { title: "12B vs 11B", date: "Feb 24", time: "4:00 PM", sport: "Quarterfinals" },
    { title: "12C vs 12A", date: "Feb 25", time: "3:00 PM", sport: "Semifinals" },
  ];

  const recentResults = [
    { home: "11A", away: "10A", score: "2-1", competition: "Group Stage" },
    { home: "10B", away: "9C", score: "2-1", competition: "Group Stage" },
    { home: "12B", away: "9A", score: "6-0", competition: "Group Stage" },
    { home: "12C", away: "10C", score: "7-1", competition: "Group Stage" },
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
          <Badge className="mb-4 text-lg px-4 py-2 gradient-orange">Week 3 Now Live!</Badge>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas text-foreground mb-6">
            Sports Club <span className="text-primary text-glow">of SSC</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Inter-Class Football Championship • Grades 9-12
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analytics">
              <Button size="lg" className="text-xl font-bebas px-8 py-6 gradient-orange hover-lift">
                View Standings <BarChart3 className="ml-2" />
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
      <section className="py-16 bg-card">
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

      {/* Finals Countdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="hover-lift gradient-hero border-primary/50">
            <CardContent className="pt-12 pb-12 text-center">
              <Badge className="mb-4 text-lg px-4 py-2 bg-primary">🏆 CHAMPIONSHIP FINALS</Badge>
              <h2 className="text-4xl md:text-6xl font-bebas text-foreground mb-2">11A vs 11C</h2>
              <p className="text-xl text-muted-foreground mb-8">February 22, 2025 • 3:00 PM</p>
              
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-card rounded-lg p-4 border border-primary/30">
                    <p className="text-4xl md:text-6xl font-bebas text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground uppercase">{unit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Player & Team of the Week */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
              Week 3 <span className="text-primary">Stars</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Player of the Week */}
            <Card className="hover-lift overflow-hidden">
              <img src={playerOfWeekImg} alt="Player of the Week - Mussie" className="w-full" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="font-bebas text-primary">Player of the Week</span>
                </div>
                <h3 className="text-3xl font-bebas">Mussie (10B)</h3>
                <p className="text-muted-foreground mt-2">
                  Outstanding performance with composed touches and sharp decisions!
                </p>
              </CardContent>
            </Card>

            {/* Team of the Week */}
            <Card className="hover-lift overflow-hidden">
              <img src={teamOfWeekImg} alt="Team of the Week" className="w-full" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-bebas text-primary">Team of the Week</span>
                </div>
                <h3 className="text-3xl font-bebas">Week 3 Best XI</h3>
                <p className="text-muted-foreground mt-2">
                  Kaleab (GK) • Yohanan & Yared (DEF) • Reyan, Mussie, Haileab (MID) • Lewi (ST)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Standings & Top Scorers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mini Standings */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bebas flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" /> Standings
                  </h3>
                  <Link to="/analytics">
                    <Button variant="ghost" size="sm" className="font-bebas">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {standings.map((team, idx) => (
                    <div key={team.team} className={`flex items-center justify-between p-3 rounded-lg ${idx === 0 ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`font-bebas text-xl ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{team.rank}</span>
                        <span className="font-semibold">{team.team}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {team.form.map((f, i) => (
                          <Badge key={i} className={f === "W" ? "bg-green-500" : f === "D" ? "bg-yellow-500" : "bg-red-500"}>
                            {f}
                          </Badge>
                        ))}
                        <span className="font-bebas text-xl text-primary ml-2">{team.pts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bebas flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" /> Top Scorers
                  </h3>
                  <Link to="/analytics">
                    <Button variant="ghost" size="sm" className="font-bebas">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {topScorers.map((scorer, idx) => (
                    <div key={`${scorer.name}-${scorer.team}`} className={`flex items-center justify-between p-3 rounded-lg ${idx === 0 ? 'bg-primary/20 border border-primary' : 'bg-muted'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`font-bebas text-xl ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{idx + 1}</span>
                        <div>
                          <span className="font-semibold">{scorer.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({scorer.team})</span>
                        </div>
                      </div>
                      <span className="font-bebas text-2xl text-primary">{scorer.goals}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
              Recent <span className="text-primary">Results</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {recentResults.map((match, idx) => (
              <Card key={idx} className="hover-lift text-center">
                <CardContent className="py-6">
                  <p className="text-xs text-muted-foreground mb-2">{match.competition}</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="font-bebas text-2xl">{match.home}</span>
                    <span className="font-bebas text-3xl text-primary">{match.score}</span>
                    <span className="font-bebas text-2xl">{match.away}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
              Upcoming <span className="text-primary">Fixtures</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className={`hover-lift animate-slide-in ${event.badge ? 'border-2 border-primary' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-8 text-center">
                  {event.badge && <Badge className="mb-4 gradient-orange">{event.badge}</Badge>}
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

      {/* YouTube Subscribe */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <Card className="gradient-orange hover-lift max-w-3xl mx-auto">
            <CardContent className="py-12 text-center">
              <Youtube className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-4xl font-bebas text-primary-foreground mb-2">Subscribe to Our Channel!</h3>
              <p className="text-primary-foreground/80 mb-6">@sportsclubofssc-s1e • Highlights, Interviews & More</p>
              <a 
                href="https://www.youtube.com/@sportsclubofssc-s1e" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="font-bebas text-lg px-8">
                  Subscribe Now <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
