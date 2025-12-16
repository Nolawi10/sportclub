import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, Trophy, Youtube, ExternalLink, Play, Clock, Eye } from "lucide-react";

const Media = () => {
  const recentResults = [
    { home: "11B", away: "12A", score: "9-0" },
    { home: "11A", away: "10A", score: "2-1" },
    { home: "10B", away: "9C", score: "2-1" },
    { home: "12B", away: "9A", score: "6-0" },
    { home: "12C", away: "10C", score: "7-1" },
  ];

  const highlights = [
    {
      id: "1",
      title: "11A 2-1 10A | One Man's Trash, Another Man's Treasure",
      youtubeId: "ji0evJ8ctq8",
      description: "Watch the thrilling match between 11A and 10A with an incredible finish",
      views: "1.2K",
      uploadedAt: "3 hours ago",
      duration: "8:45",
    },
    {
      id: "2",
      title: "From Defeat to Glory: Incredible Last-Minute 2–1 Comeback | 10B 2-1 9C",
      youtubeId: "W-m0Bj53bDA",
      description: "An unbelievable last-minute comeback that had everyone on their feet!",
      views: "982",
      uploadedAt: "5 hours ago",
      duration: "7:32",
    },
    {
      id: "3",
      title: "11B 9-0 12A | Complete Domination",
      youtubeId: "ji0evJ8ctq8",
      description: "11B delivers a stunning 9-0 victory against 12A",
      views: "2.3K",
      uploadedAt: "1 day ago",
      duration: "9:15",
    },
    {
      id: "4",
      title: "12B 6-0 9A | Senior Power Display",
      youtubeId: "W-m0Bj53bDA",
      description: "12B shows their dominance with a commanding 6-0 win",
      views: "645",
      uploadedAt: "1 day ago",
      duration: "6:48",
    },
    {
      id: "5",
      title: "12C vs 10C | 7-1 Goal Fest",
      youtubeId: "ji0evJ8ctq8",
      description: "12C puts 7 past 10C in an incredible goal-scoring display",
      views: "534",
      uploadedAt: "2 days ago",
      duration: "8:12",
    },
    {
      id: "6",
      title: "11C 1-1 12B | The Draw That Shocked Everyone",
      youtubeId: "W-m0Bj53bDA",
      description: "A nail-biting draw that keeps the league standings tight",
      views: "489",
      uploadedAt: "2 days ago",
      duration: "7:55",
    },
    {
      id: "7",
      title: "10A vs 9C | Goals Galore - 4 Goal Thriller",
      youtubeId: "ji0evJ8ctq8",
      description: "An incredible match with 4 goals and non-stop action",
      views: "423",
      uploadedAt: "3 days ago",
      duration: "10:22",
    },
    {
      id: "8",
      title: "Semi-Final: 11A vs 12A | The Big One",
      youtubeId: "W-m0Bj53bDA",
      description: "Semi-final clash between the two top teams in the tournament",
      views: "1.5K",
      uploadedAt: "4 days ago",
      duration: "12:30",
    },
    {
      id: "9",
      title: "Best Saves Compilation Week 3",
      youtubeId: "ji0evJ8ctq8",
      description: "Top goalkeeper saves from Week 3 of the tournament",
      views: "378",
      uploadedAt: "5 days ago",
      duration: "5:18",
    },
    {
      id: "10",
      title: "Top 10 Goals of the Tournament So Far",
      youtubeId: "W-m0Bj53bDA",
      description: "The best goals scored in the tournament compiled for you",
      views: "2.1K",
      uploadedAt: "1 week ago",
      duration: "6:45",
    },
  ];

  const interviews = [
    {
      id: "1",
      title: "Interviews with 10A and 11A Captains 🔥",
      youtubeId: "X58uhbCqUmA",
      description: "Exclusive post-match interviews with the captains of 10A and 11A discussing their strategies and game insights",
      views: "856",
      uploadedAt: "4 hours ago",
      duration: "5:32",
    },
    {
      id: "2",
      title: "Interviews with 10B and 9C Captains 🔥",
      youtubeId: "UGA4F7rEwaY",
      description: "Hear from the captains of 10B and 9C about their incredible comeback game and team spirit",
      views: "734",
      uploadedAt: "6 hours ago",
      duration: "6:15",
    },
    {
      id: "3",
      title: "Player of the Week - Mussie Speaks",
      youtubeId: "X58uhbCqUmA",
      description: "Exclusive interview with Player of the Week Mussie from 10B",
      views: "1.1K",
      uploadedAt: "1 day ago",
      duration: "4:48",
    },
    {
      id: "4",
      title: "Coach's Corner: Tournament Strategy",
      youtubeId: "UGA4F7rEwaY",
      description: "Insights from the coaches about their tournament preparation",
      views: "567",
      uploadedAt: "2 days ago",
      duration: "7:22",
    },
    {
      id: "5",
      title: "12A Captain Fikir on Leading His Team",
      youtubeId: "X58uhbCqUmA",
      description: "The Grade 12A captain shares his leadership experience",
      views: "445",
      uploadedAt: "3 days ago",
      duration: "5:55",
    },
    {
      id: "6",
      title: "Rising Stars: Grade 9 Talents",
      youtubeId: "UGA4F7rEwaY",
      description: "Spotlight on the best freshman talents in the tournament",
      views: "623",
      uploadedAt: "4 days ago",
      duration: "6:30",
    },
    {
      id: "7",
      title: "Team of the Week Players React",
      youtubeId: "X58uhbCqUmA",
      description: "Reactions from players who made Team of the Week",
      views: "512",
      uploadedAt: "5 days ago",
      duration: "8:12",
    },
    {
      id: "8",
      title: "Haileab: The Story Behind the Skills",
      youtubeId: "UGA4F7rEwaY",
      description: "Deep dive into Haileab's journey and football development",
      views: "889",
      uploadedAt: "6 days ago",
      duration: "9:45",
    },
    {
      id: "9",
      title: "Pre-Match: 11A vs 11C Finals Preview",
      youtubeId: "X58uhbCqUmA",
      description: "Both teams share their thoughts ahead of the finals",
      views: "1.3K",
      uploadedAt: "1 week ago",
      duration: "7:18",
    },
    {
      id: "10",
      title: "Tournament Organizers Share Vision",
      youtubeId: "UGA4F7rEwaY",
      description: "Behind the scenes with Sports Club of SSC organizers",
      views: "342",
      uploadedAt: "1 week ago",
      duration: "10:05",
    },
  ];

  const VideoCard = ({ video, index }: { video: typeof highlights[0], index: number }) => (
    <Card className="group hover-lift animate-slide-in overflow-hidden" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="relative aspect-video overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
        <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Play className="h-3 w-3" />
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bebas text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {video.views} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.uploadedAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-slide-in">
            <Badge variant="secondary" className="mb-4 text-sm">
              <Play className="h-3 w-3 mr-1" /> Latest Videos
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Media <span className="text-primary text-glow">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interviews, highlights, and exclusive behind-the-scenes content from Sports Club of SSC
            </p>
            
            {/* YouTube Subscribe Banner */}
            <Card className="max-w-3xl mx-auto gradient-orange hover-lift border-none">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="relative">
                    <Youtube className="h-16 w-16 text-primary-foreground animate-pulse" />
                    <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full font-bold">
                      LIVE
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bebas text-primary-foreground">Subscribe to Our Channel!</h3>
                    <p className="text-primary-foreground/80 text-lg">@sportsclubofssc-s1e • 20+ Videos</p>
                  </div>
                  <a 
                    href="https://www.youtube.com/@sportsclubofssc-s1e" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="lg" className="font-bebas text-lg">
                      Subscribe Now <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Last 5 Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bebas text-center mb-6">Last 5 <span className="text-primary">Results</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {recentResults.map((match, idx) => (
                <Card key={idx} className="text-center hover-lift">
                  <CardContent className="py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bebas text-lg">{match.home}</span>
                      <span className="font-bebas text-2xl text-primary">{match.score}</span>
                      <span className="font-bebas text-lg">{match.away}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <Card className="text-center p-4">
              <p className="text-3xl font-bebas text-primary">20+</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-3xl font-bebas text-primary">15K+</p>
              <p className="text-sm text-muted-foreground">Views</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-3xl font-bebas text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Subscribers</p>
            </Card>
          </div>

          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-12 h-14">
              <TabsTrigger value="highlights" className="text-xl font-bebas h-full">
                <Trophy className="mr-2 h-5 w-5" />
                Highlights ({highlights.length})
              </TabsTrigger>
              <TabsTrigger value="interviews" className="text-xl font-bebas h-full">
                <Video className="mr-2 h-5 w-5" />
                Interviews ({interviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="highlights">
              {/* Featured Highlight */}
              <Card className="mb-8 overflow-hidden gradient-dark hover-lift">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${highlights[0].youtubeId}`}
                      title={highlights[0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 gradient-orange text-primary-foreground">
                      🔥 Featured Highlight
                    </Badge>
                    <h2 className="text-3xl font-bebas mb-3">{highlights[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{highlights[0].description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {highlights[0].views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {highlights[0].uploadedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* All Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.slice(1).map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interviews">
              {/* Featured Interview */}
              <Card className="mb-8 overflow-hidden gradient-dark hover-lift">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${interviews[0].youtubeId}`}
                      title={interviews[0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 gradient-orange text-primary-foreground">
                      🎤 Featured Interview
                    </Badge>
                    <h2 className="text-3xl font-bebas mb-3">{interviews[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{interviews[0].description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {interviews[0].views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {interviews[0].uploadedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* All Interviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.slice(1).map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <Card className="mt-12 text-center p-8 gradient-dark">
            <Youtube className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bebas mb-2">Want More Content?</h3>
            <p className="text-muted-foreground mb-4">Subscribe to our YouTube channel for weekly highlights and interviews!</p>
            <a 
              href="https://www.youtube.com/@sportsclubofssc-s1e" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="gradient-orange text-primary-foreground font-bebas">
                Subscribe on YouTube <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Media;