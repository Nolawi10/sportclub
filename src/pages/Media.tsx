import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, Trophy, Youtube, ExternalLink } from "lucide-react";

const Media = () => {
  const interviews = [
    {
      id: "1",
      title: "Interviews with 10A and 11A Captains 🔥",
      youtubeId: "X58uhbCqUmA",
      description: "Exclusive post-match interviews with the captains of 10A and 11A discussing their strategies and game insights",
    },
    {
      id: "2",
      title: "Interviews with 10B and 9C Captains 🔥",
      youtubeId: "UGA4F7rEwaY",
      description: "Hear from the captains of 10B and 9C about their incredible comeback game and team spirit",
    },
  ];

  const highlights = [
    {
      id: "1",
      title: "11A 2-1 10A | One Man's Trash, Another Man's Treasure",
      youtubeId: "ji0evJ8ctq8",
      description: "Watch the thrilling match between 11A and 10A with an incredible finish",
    },
    {
      id: "2",
      title: "From Defeat to Glory: Incredible Last-Minute 2–1 Comeback | 10B 2-1 9C",
      youtubeId: "W-m0Bj53bDA",
      description: "An unbelievable last-minute comeback that had everyone on their feet!",
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
            <p className="text-xl text-muted-foreground mb-6">
              Interviews, highlights, and exclusive behind-the-scenes content
            </p>
            
            {/* YouTube Subscribe Banner */}
            <Card className="max-w-2xl mx-auto gradient-orange hover-lift">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Youtube className="h-12 w-12 text-primary-foreground" />
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bebas text-primary-foreground">Subscribe to Our Channel!</h3>
                    <p className="text-primary-foreground/80">@sportsclubofssc-s1e</p>
                  </div>
                  <a 
                    href="https://www.youtube.com/@sportsclubofssc-s1e" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="lg" className="font-bebas">
                      Subscribe <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
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
