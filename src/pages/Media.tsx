import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, Trophy } from "lucide-react";

const Media = () => {
  const interviews = [
    {
      id: "1",
      title: "Captain's Post-Match Interview - Victory Against Rivals",
      youtubeId: "dQw4w9WgXcQ",
      description: "Our captain shares thoughts on the incredible comeback victory",
    },
    {
      id: "2",
      title: "Coach's Season Preview - What to Expect This Year",
      youtubeId: "dQw4w9WgXcQ",
      description: "Head coach discusses tactics and goals for the new season",
    },
    {
      id: "3",
      title: "Star Player's Journey - From Rookie to MVP",
      youtubeId: "dQw4w9WgXcQ",
      description: "An inspiring story of dedication and perseverance",
    },
  ];

  const highlights = [
    {
      id: "1",
      title: "Top 10 Goals of the Season",
      youtubeId: "dQw4w9WgXcQ",
      description: "The most spectacular goals from this season's matches",
    },
    {
      id: "2",
      title: "Championship Final - Full Match Highlights",
      youtubeId: "dQw4w9WgXcQ",
      description: "Relive the thrilling championship victory",
    },
    {
      id: "3",
      title: "Best Saves & Defensive Plays",
      youtubeId: "dQw4w9WgXcQ",
      description: "Outstanding defensive performances and goalkeeper heroics",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Media <span className="text-primary text-glow">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Interviews, highlights, and exclusive behind-the-scenes content
            </p>
          </div>

          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="highlights" className="text-lg font-bebas">
                <Trophy className="mr-2 h-5 w-5" />
                Highlights
              </TabsTrigger>
              <TabsTrigger value="interviews" className="text-lg font-bebas">
                <Video className="mr-2 h-5 w-5" />
                Interviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="highlights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {highlights.map((video, index) => (
                  <Card key={video.id} className="hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bebas">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interviews">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {interviews.map((video, index) => (
                  <Card key={video.id} className="hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bebas">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Media;
