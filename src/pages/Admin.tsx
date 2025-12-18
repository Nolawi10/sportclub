import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, Users, Trophy, Calendar, Plus, Trash2, Edit,
  Youtube, FileText, Shield, Award, Lock, Target, Coins, Save,
  User, Mail, Crown
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

interface MatchResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  category: string;
  stats: {
    homeShots: number;
    awayShots: number;
    homeShotsOnTarget: number;
    awayShotsOnTarget: number;
    homeFouls: number;
    awayFouls: number;
    homeCorners: number;
    awayCorners: number;
    homePasses: number;
    awayPasses: number;
  };
  goals: { player: string; minute: string; assist?: string; team: string }[];
}

interface FantasyPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  price: number;
  points: number;
  goals: number;
  assists: number;
}

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  fantasyTeam?: string[];
  fantasyPoints?: number;
  predictions?: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
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

  // Match Results Management
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => {
    const stored = localStorage.getItem("ssc_match_results");
    return stored ? JSON.parse(stored) : [];
  });
  const [newResult, setNewResult] = useState<Partial<MatchResult>>({
    homeTeam: "",
    awayTeam: "",
    homeScore: 0,
    awayScore: 0,
    date: "",
    category: "Football",
    stats: {
      homeShots: 0, awayShots: 0,
      homeShotsOnTarget: 0, awayShotsOnTarget: 0,
      homeFouls: 0, awayFouls: 0,
      homeCorners: 0, awayCorners: 0,
      homePasses: 0, awayPasses: 0
    },
    goals: []
  });
  const [newGoal, setNewGoal] = useState({ player: "", minute: "", assist: "", team: "home" });

  // Fantasy Players Management
  const [fantasyPlayers, setFantasyPlayers] = useState<FantasyPlayer[]>(() => {
    const stored = localStorage.getItem("ssc_fantasy_players");
    if (stored) return JSON.parse(stored);
    // Default players
    return [
      { id: "gk1", name: "Kaleab Fekadu", team: "10A", position: "GK", price: 8.5, points: 42, goals: 0, assists: 0 },
      { id: "gk2", name: "Bamlak", team: "9C", position: "GK", price: 7.0, points: 35, goals: 0, assists: 0 },
      { id: "gk3", name: "Haleluya", team: "9A", position: "GK", price: 6.0, points: 28, goals: 0, assists: 0 },
      { id: "def1", name: "Fikir", team: "12A", position: "DEF", price: 8.0, points: 40, goals: 2, assists: 0 },
      { id: "def2", name: "Yohannan Birhane", team: "11A", position: "DEF", price: 8.5, points: 45, goals: 0, assists: 0 },
      { id: "mid1", name: "Haileab Mulugeta", team: "11A", position: "MID", price: 13.0, points: 82, goals: 4, assists: 1 },
      { id: "mid2", name: "Abraham", team: "12C", position: "MID", price: 10.5, points: 62, goals: 3, assists: 2 },
      { id: "mid3", name: "Emran", team: "12C", position: "MID", price: 10.0, points: 58, goals: 0, assists: 3 },
      { id: "fwd1", name: "Daniel Eshetu", team: "11B", position: "FWD", price: 13.5, points: 80, goals: 4, assists: 0 },
      { id: "fwd2", name: "Samson", team: "12C", position: "FWD", price: 12.0, points: 72, goals: 4, assists: 1 },
      { id: "fwd3", name: "Dawit Fasil", team: "11A", position: "FWD", price: 11.0, points: 65, goals: 2, assists: 0 },
    ];
  });
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);

  // Users Management
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

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

  // Load registered users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("ssc_users") || "[]");
    const enrichedUsers = users.map((u: any) => {
      const fantasyData = localStorage.getItem(`ssc_fantasy_${u.id}`);
      const predictionData = localStorage.getItem(`ssc_predictions_${u.id}`);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        fantasyTeam: fantasyData ? JSON.parse(fantasyData).players : [],
        fantasyPoints: fantasyData ? JSON.parse(fantasyData).points : 0,
        predictions: predictionData ? JSON.parse(predictionData).count : 0
      };
    });
    setRegisteredUsers(enrichedUsers);
  }, []);

  const handleLogin = () => {
    if (username === "Nolawi" && password === "@Nolawi2010") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
      toast({ title: "Welcome back!", description: "You are now logged in as admin." });
    } else {
      toast({ title: "Invalid credentials", description: "Please check your username and password.", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_logged_in");
    toast({ title: "Logged out", description: "You have been logged out." });
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <div className="w-20 h-20 rounded-full gradient-orange flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-bebas">
                  Admin <span className="text-primary">Login</span>
                </CardTitle>
                <CardDescription>Enter your credentials to access the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full gradient-orange text-primary-foreground">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Save functions
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

  const addGoalToResult = () => {
    if (!newGoal.player || !newGoal.minute) return;
    const goals = [...(newResult.goals || []), {
      player: newGoal.player,
      minute: newGoal.minute,
      assist: newGoal.assist || undefined,
      team: newGoal.team === "home" ? (newResult.homeTeam || "") : (newResult.awayTeam || "")
    }];
    setNewResult({ ...newResult, goals });
    setNewGoal({ player: "", minute: "", assist: "", team: "home" });
  };

  const addMatchResult = () => {
    if (!newResult.homeTeam || !newResult.awayTeam) {
      toast({ title: "Error", description: "Please select both teams.", variant: "destructive" });
      return;
    }
    const result: MatchResult = {
      id: `result-${Date.now()}`,
      homeTeam: newResult.homeTeam || "",
      awayTeam: newResult.awayTeam || "",
      homeScore: newResult.homeScore || 0,
      awayScore: newResult.awayScore || 0,
      date: newResult.date || new Date().toISOString().split('T')[0],
      category: newResult.category || "Football",
      stats: newResult.stats || {
        homeShots: 0, awayShots: 0,
        homeShotsOnTarget: 0, awayShotsOnTarget: 0,
        homeFouls: 0, awayFouls: 0,
        homeCorners: 0, awayCorners: 0,
        homePasses: 0, awayPasses: 0
      },
      goals: newResult.goals || []
    };
    const updated = [...matchResults, result];
    setMatchResults(updated);
    localStorage.setItem("ssc_match_results", JSON.stringify(updated));
    setNewResult({
      homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0, date: "", category: "Football",
      stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: []
    });
    toast({ title: "Match result added!", description: "The match result and stats have been saved." });
  };

  const removeMatchResult = (id: string) => {
    const updated = matchResults.filter(m => m.id !== id);
    setMatchResults(updated);
    localStorage.setItem("ssc_match_results", JSON.stringify(updated));
    toast({ title: "Result removed", description: "Match result has been deleted." });
  };

  const updateFantasyPlayer = (id: string, updates: Partial<FantasyPlayer>) => {
    const updated = fantasyPlayers.map(p => p.id === id ? { ...p, ...updates } : p);
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    setEditingPlayer(null);
    toast({ title: "Player updated!", description: "Fantasy player data has been saved." });
  };

  const addFantasyPlayer = () => {
    const newPlayer: FantasyPlayer = {
      id: `player-${Date.now()}`,
      name: "New Player",
      team: "9A",
      position: "MID",
      price: 5.0,
      points: 0,
      goals: 0,
      assists: 0
    };
    const updated = [...fantasyPlayers, newPlayer];
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    setEditingPlayer(newPlayer.id);
    toast({ title: "Player added!", description: "New fantasy player created. Edit the details." });
  };

  const removeFantasyPlayer = (id: string) => {
    const updated = fantasyPlayers.filter(p => p.id !== id);
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    toast({ title: "Player removed", description: "Fantasy player has been deleted." });
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bebas text-foreground">
                <Shield className="inline h-10 w-10 text-primary mr-2" />
                Admin <span className="text-primary text-glow">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Manage all content and settings</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="results" className="font-bebas text-xs md:text-sm">
                <Target className="h-4 w-4 mr-1" /> Results
              </TabsTrigger>
              <TabsTrigger value="fantasy" className="font-bebas text-xs md:text-sm">
                <Coins className="h-4 w-4 mr-1" /> Fantasy
              </TabsTrigger>
              <TabsTrigger value="users" className="font-bebas text-xs md:text-sm">
                <Users className="h-4 w-4 mr-1" /> Users
              </TabsTrigger>
              <TabsTrigger value="media" className="font-bebas text-xs md:text-sm">
                <Video className="h-4 w-4 mr-1" /> Media
              </TabsTrigger>
              <TabsTrigger value="news" className="font-bebas text-xs md:text-sm">
                <FileText className="h-4 w-4 mr-1" /> News
              </TabsTrigger>
              <TabsTrigger value="awards" className="font-bebas text-xs md:text-sm">
                <Award className="h-4 w-4 mr-1" /> Awards
              </TabsTrigger>
              <TabsTrigger value="matches" className="font-bebas text-xs md:text-sm">
                <Calendar className="h-4 w-4 mr-1" /> Fixtures
              </TabsTrigger>
            </TabsList>

            {/* Match Results Management */}
            <TabsContent value="results">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Add Match Result
                    </CardTitle>
                    <CardDescription>Add final scores and detailed match statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label>Home Team</Label>
                        <Select value={newResult.homeTeam} onValueChange={(v) => setNewResult({...newResult, homeTeam: v})}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Score</Label>
                        <div className="flex items-center gap-2">
                          <Input type="number" min="0" className="text-center" value={newResult.homeScore} onChange={(e) => setNewResult({...newResult, homeScore: parseInt(e.target.value) || 0})} />
                          <span>-</span>
                          <Input type="number" min="0" className="text-center" value={newResult.awayScore} onChange={(e) => setNewResult({...newResult, awayScore: parseInt(e.target.value) || 0})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Away Team</Label>
                        <Select value={newResult.awayTeam} onValueChange={(v) => setNewResult({...newResult, awayTeam: v})}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={newResult.category} onValueChange={(v) => setNewResult({...newResult, category: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Football">Football</SelectItem>
                            <SelectItem value="Basketball">Basketball</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" value={newResult.date} onChange={(e) => setNewResult({...newResult, date: e.target.value})} />
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="border-t pt-4">
                      <Label className="text-lg font-bebas">Match Statistics</Label>
                      <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                        <Label className="text-center text-muted-foreground">{newResult.homeTeam || "Home"}</Label>
                        <Label className="text-center">Stat</Label>
                        <Label className="text-center text-muted-foreground">{newResult.awayTeam || "Away"}</Label>
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeShots} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeShots: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Shots</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayShots} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayShots: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeShotsOnTarget} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeShotsOnTarget: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">On Target</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayShotsOnTarget} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayShotsOnTarget: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homePasses} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homePasses: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Passes</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayPasses} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayPasses: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeCorners} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeCorners: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Corners</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayCorners} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayCorners: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeFouls} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeFouls: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Fouls</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayFouls} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayFouls: parseInt(e.target.value) || 0}})} />
                      </div>
                    </div>

                    {/* Goals Section */}
                    <div className="border-t pt-4">
                      <Label className="text-lg font-bebas">Goal Scorers</Label>
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        <Input placeholder="Player" value={newGoal.player} onChange={(e) => setNewGoal({...newGoal, player: e.target.value})} />
                        <Input placeholder="Minute" value={newGoal.minute} onChange={(e) => setNewGoal({...newGoal, minute: e.target.value})} />
                        <Input placeholder="Assist (optional)" value={newGoal.assist} onChange={(e) => setNewGoal({...newGoal, assist: e.target.value})} />
                        <Select value={newGoal.team} onValueChange={(v) => setNewGoal({...newGoal, team: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="away">Away</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2" onClick={addGoalToResult}>
                        <Plus className="h-4 w-4 mr-1" /> Add Goal
                      </Button>
                      {newResult.goals && newResult.goals.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {newResult.goals.map((g, i) => (
                            <Badge key={i} variant="secondary" className="mr-1">
                              {g.player} ({g.minute}') {g.assist && `- Assist: ${g.assist}`} [{g.team}]
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button onClick={addMatchResult} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Save Match Result
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Saved Results ({matchResults.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-3">
                        {matchResults.map((result) => (
                          <div key={result.id} className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-lg">
                                {result.homeTeam} {result.homeScore} - {result.awayScore} {result.awayTeam}
                              </span>
                              <Button variant="ghost" size="sm" onClick={() => removeMatchResult(result.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">{result.category} • {result.date}</div>
                            <div className="grid grid-cols-3 gap-1 text-xs">
                              <span className="text-right">{result.stats.homeShots}</span>
                              <span className="text-center text-muted-foreground">Shots</span>
                              <span>{result.stats.awayShots}</span>
                              <span className="text-right">{result.stats.homeFouls}</span>
                              <span className="text-center text-muted-foreground">Fouls</span>
                              <span>{result.stats.awayFouls}</span>
                            </div>
                            {result.goals.length > 0 && (
                              <div className="mt-2 pt-2 border-t">
                                <span className="text-xs font-medium">Goals: </span>
                                {result.goals.map((g, i) => (
                                  <Badge key={i} variant="outline" className="text-xs mr-1">
                                    {g.player} {g.minute}'
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {matchResults.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No match results yet</p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fantasy Players Management */}
            <TabsContent value="fantasy">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-bebas flex items-center gap-2">
                        <Coins className="h-5 w-5 text-primary" />
                        Fantasy Players Management
                      </CardTitle>
                      <CardDescription>Edit player prices, points, goals, and assists</CardDescription>
                    </div>
                    <Button onClick={addFantasyPlayer}>
                      <Plus className="h-4 w-4 mr-2" /> Add Player
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-2">
                      {fantasyPlayers.map((player) => (
                        <div key={player.id} className="p-4 bg-muted rounded-lg">
                          {editingPlayer === player.id ? (
                            <div className="grid grid-cols-8 gap-2 items-center">
                              <Input 
                                value={player.name} 
                                onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, name: e.target.value} : p))}
                                placeholder="Name"
                              />
                              <Select value={player.team} onValueChange={(v) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, team: v} : p))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <Select value={player.position} onValueChange={(v) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, position: v} : p))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GK">GK</SelectItem>
                                  <SelectItem value="DEF">DEF</SelectItem>
                                  <SelectItem value="MID">MID</SelectItem>
                                  <SelectItem value="FWD">FWD</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input 
                                type="number" 
                                step="0.5"
                                value={player.price} 
                                onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, price: parseFloat(e.target.value) || 0} : p))}
                                placeholder="Price"
                              />
                              <Input 
                                type="number" 
                                value={player.points} 
                                onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, points: parseInt(e.target.value) || 0} : p))}
                                placeholder="Points"
                              />
                              <Input 
                                type="number" 
                                value={player.goals} 
                                onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, goals: parseInt(e.target.value) || 0} : p))}
                                placeholder="Goals"
                              />
                              <Input 
                                type="number" 
                                value={player.assists} 
                                onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, assists: parseInt(e.target.value) || 0} : p))}
                                placeholder="Assists"
                              />
                              <div className="flex gap-1">
                                <Button size="sm" onClick={() => updateFantasyPlayer(player.id, player)}>
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => removeFantasyPlayer(player.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Badge variant={player.position === "GK" ? "default" : player.position === "DEF" ? "secondary" : player.position === "MID" ? "outline" : "destructive"}>
                                  {player.position}
                                </Badge>
                                <span className="font-medium">{player.name}</span>
                                <span className="text-muted-foreground">{player.team}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-bold">£{player.price}M</span>
                                <span>{player.points} pts</span>
                                <span className="text-muted-foreground">{player.goals}G {player.assists}A</span>
                                <Button variant="ghost" size="sm" onClick={() => setEditingPlayer(player.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bebas flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Registered Users ({registeredUsers.length})
                  </CardTitle>
                  <CardDescription>View all users, their fantasy teams, and prediction scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3">
                      {registeredUsers.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No registered users yet</p>
                          <p className="text-sm">Users who sign up will appear here</p>
                        </div>
                      ) : (
                        registeredUsers.map((user) => (
                          <div key={user.id} className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> {user.email}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-primary">{user.fantasyPoints || 0}</p>
                                  <p className="text-xs text-muted-foreground">Fantasy Pts</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold">{user.predictions || 0}</p>
                                  <p className="text-xs text-muted-foreground">Predictions</p>
                                </div>
                              </div>
                            </div>
                            {user.fantasyTeam && user.fantasyTeam.length > 0 && (
                              <div className="mt-2 pt-2 border-t">
                                <p className="text-xs font-medium mb-1">Fantasy Team:</p>
                                <div className="flex flex-wrap gap-1">
                                  {user.fantasyTeam.map((player, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">{player}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Leaderboard Summary */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Fantasy Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {registeredUsers
                        .sort((a, b) => (b.fantasyPoints || 0) - (a.fantasyPoints || 0))
                        .slice(0, 5)
                        .map((user, i) => (
                          <div key={user.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-500' : ''}`}>
                                #{i + 1}
                              </span>
                              <span>{user.name}</span>
                            </div>
                            <span className="font-bold text-primary">{user.fantasyPoints || 0} pts</span>
                          </div>
                        ))}
                      {registeredUsers.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No users yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Top Predictors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {registeredUsers
                        .sort((a, b) => (b.predictions || 0) - (a.predictions || 0))
                        .slice(0, 5)
                        .map((user, i) => (
                          <div key={user.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-500' : ''}`}>
                                #{i + 1}
                              </span>
                              <span>{user.name}</span>
                            </div>
                            <span className="font-bold">{user.predictions || 0} correct</span>
                          </div>
                        ))}
                      {registeredUsers.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No users yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

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
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
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
                    </ScrollArea>
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
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
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
                    </ScrollArea>
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
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Outstanding performance with..."
                        value={playerOfWeek.description}
                        onChange={(e) => setPlayerOfWeek({...playerOfWeek, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={savePlayerOfWeek} className="w-full">
                      Save Player of the Week
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
                      <Label>Starting XI</Label>
                      <Textarea
                        placeholder="Kaleab (GK), Yohanan, Yared (DEF)..."
                        value={teamOfWeek.players}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, players: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Substitutes</Label>
                      <Textarea
                        placeholder="Player 1, Player 2..."
                        value={teamOfWeek.subs}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, subs: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Week 3 standout performers..."
                        value={teamOfWeek.description}
                        onChange={(e) => setTeamOfWeek({...teamOfWeek, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={saveTeamOfWeek} className="w-full">
                      Save Team of the Week
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fixtures Management */}
            <TabsContent value="matches">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Add Upcoming Match
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Home Team</Label>
                        <Select 
                          value={newMedia.title} 
                          onValueChange={(v) => {}}
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
                        <Select>
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
                    <p className="text-sm text-muted-foreground">
                      Fixtures can be added in the Results tab before the match, then updated with scores after.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
