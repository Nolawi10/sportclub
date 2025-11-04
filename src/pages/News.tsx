import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User } from "lucide-react";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Stunning Comeback Victory Against Regional Champions",
      excerpt: "In a thrilling match that went down to the wire, our football team staged an incredible comeback, scoring three goals in the final 15 minutes to secure a 4-3 victory.",
      author: "Coach Martinez",
      date: "Feb 5, 2025",
      category: "Match Recap",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    },
    {
      id: 2,
      title: "New Training Facility Opens Next Month",
      excerpt: "We're excited to announce the opening of our state-of-the-art training facility, featuring indoor courts, a gym, and advanced analytics equipment.",
      author: "Admin Team",
      date: "Feb 3, 2025",
      category: "Announcement",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    },
    {
      id: 3,
      title: "Three Players Selected for State Team",
      excerpt: "Congratulations to Marcus Johnson, Sarah Williams, and James Rodriguez for being selected to represent our state in the upcoming national championship.",
      author: "Sports Director",
      date: "Jan 30, 2025",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    },
    {
      id: 4,
      title: "Winter Tournament Schedule Announced",
      excerpt: "The complete schedule for our winter tournament has been released. Check out the fixtures and get ready for some exciting basketball action.",
      author: "Events Coordinator",
      date: "Jan 28, 2025",
      category: "Tournament",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    },
    {
      id: 5,
      title: "Youth Development Program Expands",
      excerpt: "Due to overwhelming interest, we're expanding our youth development program to include more age groups and specialized coaching sessions.",
      author: "Youth Coordinator",
      date: "Jan 25, 2025",
      category: "Program Update",
      image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80",
    },
    {
      id: 6,
      title: "Record-Breaking Attendance at Home Game",
      excerpt: "Last weekend's home game saw a record-breaking 2,500 spectators, creating an electric atmosphere that pushed our team to victory.",
      author: "PR Team",
      date: "Jan 22, 2025",
      category: "Club News",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
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
