import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, Video, Users, Trophy, Calendar, Plus, Trash2, Save, 
  Youtube, FileText, Shield, Award, Edit, ArrowLeft
} from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: "highlight" | "interview";
  date: string;
  views: string;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

interface MatchItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  category: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Media Management
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const stored = localStorage.getItem("ssc_media");
    return stored ? JSON.parse(stored) : [];
  });
  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({
    title: "",
    url: "",
    type: "highlight",
    date: "",
    views: "0"
  });

  // News Management
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    const stored = localStorage.getItem("ssc_news");
    return stored ? JSON.parse(stored) : [];
  });
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    title: "",
    excerpt: "",
    category: "Match Report",
    date: ""
  });

  // Match Management
  const [matches, setMatches] = useState<MatchItem[]>(() => {
    const stored = localStorage.getItem("ssc_matches");
    return stored ? JSON.parse(stored) : [];
  });
  const [newMatch, setNewMatch] = useState<Partial<MatchItem>>({
    homeTeam: "",
    awayTeam: "",
    date: "",
    category: "Football"
  });

  // Player of the Week
  const [playerOfWeek, setPlayerOfWeek] = useState(() => {
    const stored = localStorage.getItem("ssc_player_of_week");
    return stored ? JSON.parse(stored) : { name: "", team: "", description: "" };
  });

  // Team of the Week
  const [teamOfWeek, setTeamOfWeek] = useState(() => {
    const stored = localStorage.getItem("ssc_team_of_week");
    return stored ? JSON.parse(stored) : { players: "", subs: "", description: "" };
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate("/auth");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  // Save functions
  const saveMedia = () => {
    localStorage.setItem("ssc_media", JSON.stringify(mediaItems));
    toast({ title: "Media saved!", description: "Media items have been updated." });
  };

  const addMedia = () => {
    if (!newMedia.title || !newMedia.url) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const item: MediaItem = {
      id: `media-${Date.now()}`,
      title: newMedia.title || "",
      url: newMedia.url || "",
      type: newMedia.type as "highlight" | "interview" || "highlight",
      date: newMedia.date || new Date().toISOString(),
      views: newMedia.views || "0"
    };
    const updated = [...mediaItems, item];
    setMediaItems(updated);
    localStorage.setItem("ssc_media", JSON.stringify(updated));
    setNewMedia({ title: "", url: "", type: "highlight", date: "", views: "0" });
    toast({ title: "Media added!", description: "New media item has been added." });
  };

  const removeMedia = (id: string) => {
    const updated = mediaItems.filter(m => m.id !== id);
    setMediaItems(updated);
    localStorage.setItem("ssc_media", JSON.stringify(updated));
    toast({ title: "Media removed", description: "Media item has been deleted." });
  };

  const addNews = () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const item: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNews.title || "",
      excerpt: newNews.excerpt || "",
      category: newNews.category || "Match Report",
      date: newNews.date || new Date().toISOString()
    };
    const updated = [...newsItems, item];
    setNewsItems(updated);
    localStorage.setItem("ssc_news", JSON.stringify(updated));
    setNewNews({ title: "", excerpt: "", category: "Match Report", date: "" });
    toast({ title: "News added!", description: "New news item has been added." });
  };

  const removeNews = (id: string) => {
    const updated = newsItems.filter(n => n.id !== id);
    setNewsItems(updated);
    localStorage.setItem("ssc_news", JSON.stringify(updated));
    toast({ title: "News removed", description: "News item has been deleted." });
  };

  const addMatch = () => {
    if (!newMatch.homeTeam || !newMatch.awayTeam) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const item: MatchItem = {
      id: `match-${Date.now()}`,
      homeTeam: newMatch.homeTeam || "",
      awayTeam: newMatch.awayTeam || "",
      date: newMatch.date || new Date().toISOString(),
      category: newMatch.category || "Football"
    };
    const updated = [...matches, item];
    setMatches(updated);
    localStorage.setItem("ssc_matches", JSON.stringify(updated));
    setNewMatch({ homeTeam: "", awayTeam: "", date: "", category: "Football" });
    toast({ title: "Match added!", description: "New match has been added." });
  };

  const removeMatch = (id: string) => {
    const updated = matches.filter(m => m.id !== id);
    setMatches(updated);
    localStorage.setItem("ssc_matches", JSON.stringify(updated));
    toast({ title: "Match removed", description: "Match has been deleted." });
  };

  const savePlayerOfWeek = () => {
    localStorage.setItem("ssc_player_of_week", JSON.stringify(playerOfWeek));
    toast({ title: "Saved!", description: "Player of the Week has been updated." });
  };

  const saveTeamOfWeek = () => {
    localStorage.setItem("ssc_team_of_week", JSON.stringify(teamOfWeek));
    toast({ title: "Saved!", description: "Team of the Week has been updated." });
  };

  const teams = ["9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bebas text-foreground">
                <Shield className="inline h-10 w-10 text-primary mr-2" />
                Admin <span className="text-primary text-glow">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Manage all content and settings</p>
            </div>
          </div>

          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="media" className="font-bebas">
                <Video className="h-4 w-4 mr-2" /> Media
              </TabsTrigger>
              <TabsTrigger value="news" className="font-bebas">
                <FileText className="h-4 w-4 mr-2" /> News
              </TabsTrigger>
              <TabsTrigger value="matches" className="font-bebas">
                <Calendar className="h-4 w-4 mr-2" /> Matches
              </TabsTrigger>
              <TabsTrigger value="awards" className="font-bebas">
                <Award className="h-4 w-4 mr-2" /> Awards
              </TabsTrigger>
              <TabsTrigger value="users" className="font-bebas">
                <Users className="h-4 w-4 mr-2" /> Users
              </TabsTrigger>
            </TabsList>

            {/* Media Management */}
            <TabsContent value="media">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-primary" />
                      Add New Media
                    </CardTitle>
                    <CardDescription>Add YouTube videos for highlights and interviews</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="11A 2-1 10A | Match Highlights"
                        value={newMedia.title}
                        onChange={(e) => setNewMedia({...newMedia, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>YouTube URL</Label>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newMedia.url}
                        onChange={(e) => setNewMedia({...newMedia, url: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select 
                          value={newMedia.type} 
                          onValueChange={(v) => setNewMedia({...newMedia, type: v as "highlight" | "interview"})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="highlight">Highlight</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newMedia.date}
                          onChange={(e) => setNewMedia({...newMedia, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={addMedia} className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Media
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Current Media ({mediaItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {mediaItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.type} • {item.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeMedia(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      {mediaItems.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No media items yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* News Management */}
            <TabsContent value="news">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Add News Article
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="11A Wins the Finals!"
                        value={newNews.title}
                        onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Excerpt</Label>
                      <Textarea
                        placeholder="In an exciting match..."
                        value={newNews.excerpt}
                        onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select 
                          value={newNews.category} 
                          onValueChange={(v) => setNewNews({...newNews, category: v})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Match Report">Match Report</SelectItem>
                            <SelectItem value="Announcement">Announcement</SelectItem>
                            <SelectItem value="Player Spotlight">Player Spotlight</SelectItem>
                            <SelectItem value="Tournament">Tournament</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newNews.date}
                          onChange={(e) => setNewNews({...newNews, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={addNews} className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add News
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Current News ({newsItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {newsItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.category} • {item.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeNews(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      {newsItems.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No news items yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Match Management */}
            <TabsContent value="matches">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Add Match
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Home Team</Label>
                        <Select 
                          value={newMatch.homeTeam} 
                          onValueChange={(v) => setNewMatch({...newMatch, homeTeam: v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map(team => (
                              <SelectItem key={team} value={team}>{team}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Away Team</Label>
                        <Select 
                          value={newMatch.awayTeam} 
                          onValueChange={(v) => setNewMatch({...newMatch, awayTeam: v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map(team => (
                              <SelectItem key={team} value={team}>{team}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select 
                          value={newMatch.category} 
                          onValueChange={(v) => setNewMatch({...newMatch, category: v})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Football">Football</SelectItem>
                            <SelectItem value="Basketball">Basketball</SelectItem>
                            <SelectItem value="Volleyball">Volleyball</SelectItem>
                            <SelectItem value="Chess">Chess</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newMatch.date}
                          onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={addMatch} className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Match
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Upcoming Matches ({matches.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {matches.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{item.homeTeam} vs {item.awayTeam}</p>
                            <p className="text-xs text-muted-foreground">{item.category} • {item.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeMatch(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      {matches.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No matches yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Awards Management */}
            <TabsContent value="awards">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Player of the Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Player Name</Label>
                        <Input
                          placeholder="Mussie"
                          value={playerOfWeek.name}
                          onChange={(e) => setPlayerOfWeek({...playerOfWeek, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Team</Label>
                        <Select 
                          value={playerOfWeek.team} 
                          onValueChange={(v) => setPlayerOfWeek({...playerOfWeek, team: v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map(team => (
                              <SelectItem key={team} value={team}>{team}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="This week, he didn't just continue his momentum..."
                        value={playerOfWeek.description}
                        onChange={(e) => setPlayerOfWeek({...playerOfWeek, description: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button onClick={savePlayerOfWeek} className="w-full">
                      <Save className="h-4 w-4 mr-2" /> Save Player of the Week
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Team of the Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Starting Players (comma separated)</Label>
                      <Textarea
                        placeholder="GK: Kaleab, DEF: Yohanan, Yared, MID: Reyan, Mussie, FWD: Haileab, Lewi"
                        value={teamOfWeek.players}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, players: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Substitutes</Label>
                      <Input
                        placeholder="ST: Girum, CAM: Naol, CB: Biruk, GK: Bamlak"
                        value={teamOfWeek.subs}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, subs: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Another week, another show from these great players..."
                        value={teamOfWeek.description}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <Button onClick={saveTeamOfWeek} className="w-full">
                      <Save className="h-4 w-4 mr-2" /> Save Team of the Week
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bebas flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Registered Users
                  </CardTitle>
                  <CardDescription>View all registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {JSON.parse(localStorage.getItem("ssc_users") || "[]").map((user: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">ID: {user.id}</span>
                      </div>
                    ))}
                    {JSON.parse(localStorage.getItem("ssc_users") || "[]").length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No registered users yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
