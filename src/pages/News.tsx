import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User } from "lucide-react";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "11A Claims Victory Over 11C in Dramatic Finals!",
      excerpt: "After an intense battle, 11A secured the championship title by defeating 11C in the finals. This marks 11A's 4th consecutive finals appearance, showcasing their consistent dominance in the tournament.",
      author: "Sports Club of SSC",
      date: "Feb 20, 2025",
      category: "Match Recap",
      image: "/src/assets/match-1.png",
    },
    {
      id: 2,
      title: "Finalists Confirmed: 11A and 11C Set for Epic Showdown",
      excerpt: "The stage is set! 11A defeated 11B with a 2-1 scoreline to reach the finals for the 4th time back-to-back. They will face 11C in what promises to be an unforgettable championship match.",
      author: "Tournament Officials",
      date: "Feb 19, 2025",
      category: "Match Recap",
      image: "/src/assets/match-2.png",
    },
    {
      id: 3,
      title: "11A vs 11B Semifinal: Who Will Face 11C in the Finals?",
      excerpt: "Tomorrow, February 19th, 11A and 11B face each other in the semifinals. Both teams won their quarter-finals via penalties, with goalkeepers being the heroes. Who will advance to face 11C?",
      author: "Match Preview Team",
      date: "Feb 18, 2025",
      category: "Tournament",
      image: "/src/assets/match-3.png",
    },
    {
      id: 4,
      title: "⚽️ Charity Tournament Week Recap ⚽️",
      excerpt: "This week's charity tournament reminded us that Sports Club is more than just games — it's about passion, teamwork, and purpose. All matches were tight, ending with just one-goal differences. Special shoutout to Haileab, this week's Top Scorer with 3 goals!",
      author: "Community Outreach",
      date: "Feb 15, 2025",
      category: "Achievement",
      image: "/src/assets/charity-1.png",
    },
    {
      id: 5,
      title: "Player of the Tournament Voting Now Open",
      excerpt: "Vote for your Player of the Tournament! Nominees: Fiker Tilahun (11A), Abreham Wogayehu (11C), Nahom Feseha (11A), and Samson Fikre (11C). These players demonstrated remarkable skill and sportsmanship throughout the competition.",
      author: "Sports Club of SSC",
      date: "Feb 20, 2025",
      category: "Announcement",
      image: "/src/assets/match-4.png",
    },
    {
      id: 6,
      title: "Multi-Sport Tournament Success: Chess, Basketball & Volleyball",
      excerpt: "Our multi-sport tournament featuring Chess, Basketball, and Volleyball competitions from grades 9-12 (sections A-C) concluded successfully with record participation across all sports disciplines.",
      author: "Tournament Director",
      date: "Feb 10, 2025",
      category: "Club News",
      image: "/src/assets/match-5.png",
    },
  ];

  const categoryColors: Record<string, string> = {
    "Match Recap": "bg-primary",
    "Announcement": "bg-secondary",
    "Achievement": "bg-primary",
    "Tournament": "bg-secondary",
    "Program Update": "bg-muted",
    "Club News": "bg-muted",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Club <span className="text-primary text-glow">News</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Latest updates, match recaps, and announcements
            </p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 hover-lift overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="h-64 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${newsArticles[0].image})` }} />
              <div className="p-8">
                <Badge className={categoryColors[newsArticles[0].category]}>{newsArticles[0].category}</Badge>
                <h2 className="text-4xl font-bebas text-foreground mt-4 mb-4">{newsArticles[0].title}</h2>
                <p className="text-muted-foreground mb-6">{newsArticles[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{newsArticles[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{newsArticles[0].date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(1).map((article, index) => (
              <Card key={article.id} className="hover-lift overflow-hidden animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
                <CardHeader>
                  <Badge className={`w-fit ${categoryColors[article.category]}`}>{article.category}</Badge>
                  <CardTitle className="text-2xl font-bebas mt-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
