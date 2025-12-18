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
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, Users, Trophy, Calendar, Plus, Trash2, Edit,
  Youtube, FileText, Shield, Award, Lock, Target, Coins, Save,
  User, Mail, Crown, LayoutDashboard, Table, Megaphone, 
  RefreshCw, Download, Upload, Clock, TrendingUp, Activity,
  CheckCircle, AlertCircle, Zap, Star, BarChart3
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

interface Standing {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  active: boolean;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  type: string;
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
    title: "", url: "", type: "highlight", date: "", views: "0"
  });

  // News Management
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    const stored = localStorage.getItem("ssc_news");
    return stored ? JSON.parse(stored) : [];
  });
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    title: "", excerpt: "", category: "Match Report", date: ""
  });

  // Match Results Management
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => {
    const stored = localStorage.getItem("ssc_match_results");
    return stored ? JSON.parse(stored) : [];
  });
  const [newResult, setNewResult] = useState<Partial<MatchResult>>({
    homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0, date: "", category: "Football",
    stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
    goals: []
  });
  const [newGoal, setNewGoal] = useState({ player: "", minute: "", assist: "", team: "home" });

  // Fantasy Players Management
  const [fantasyPlayers, setFantasyPlayers] = useState<FantasyPlayer[]>(() => {
    const stored = localStorage.getItem("ssc_fantasy_players");
    if (stored) return JSON.parse(stored);
    return [
      { id: "gk1", name: "Kaleab Fekadu", team: "10A", position: "GK", price: 8.5, points: 42, goals: 0, assists: 0 },
      { id: "gk2", name: "Bamlak", team: "9C", position: "GK", price: 7.0, points: 35, goals: 0, assists: 0 },
      { id: "def1", name: "Fikir", team: "12A", position: "DEF", price: 8.0, points: 40, goals: 2, assists: 0 },
      { id: "mid1", name: "Haileab Mulugeta", team: "11A", position: "MID", price: 13.0, points: 82, goals: 4, assists: 1 },
      { id: "mid2", name: "Abraham", team: "12C", position: "MID", price: 10.5, points: 62, goals: 3, assists: 2 },
      { id: "fwd1", name: "Daniel Eshetu", team: "11B", position: "FWD", price: 13.5, points: 80, goals: 4, assists: 0 },
      { id: "fwd2", name: "Samson", team: "12C", position: "FWD", price: 12.0, points: 72, goals: 4, assists: 1 },
    ];
  });
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);

  // League Standings
  const [standings, setStandings] = useState<Standing[]>(() => {
    const stored = localStorage.getItem("ssc_standings");
    if (stored) return JSON.parse(stored);
    return teams.map(team => ({ team, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 }));
  });

  // Announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const stored = localStorage.getItem("ssc_announcements");
    return stored ? JSON.parse(stored) : [];
  });
  const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; message: string; type: "info" | "warning" | "success" }>({ title: "", message: "", type: "info" });

  // Activity Log
  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    const stored = localStorage.getItem("ssc_activity_log");
    return stored ? JSON.parse(stored) : [];
  });

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

  // Quick Match Update State
  const [quickMatch, setQuickMatch] = useState({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });

  // Bulk Points Update
  const [bulkUpdates, setBulkUpdates] = useState<{[key: string]: number}>({});

  const teams = ["9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"];

  // Load registered users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("ssc_users") || "[]");
    const enrichedUsers = users.map((u: any) => {
      const fantasyData = localStorage.getItem(`ssc_fantasy_${u.id}`);
      const predictionData = localStorage.getItem(`ssc_predictions_${u.id}`);
      return {
        id: u.id, name: u.name, email: u.email,
        fantasyTeam: fantasyData ? JSON.parse(fantasyData).players : [],
        fantasyPoints: fantasyData ? JSON.parse(fantasyData).points : 0,
        predictions: predictionData ? JSON.parse(predictionData).count : 0
      };
    });
    setRegisteredUsers(enrichedUsers);
  }, []);

  const logActivity = (action: string, type: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      timestamp: new Date().toISOString(),
      type
    };
    const updated = [newLog, ...activityLog].slice(0, 50);
    setActivityLog(updated);
    localStorage.setItem("ssc_activity_log", JSON.stringify(updated));
  };

  const handleLogin = () => {
    if (username === "Nolawi" && password === "@Nolawi2010") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
      logActivity("Admin logged in", "auth");
      toast({ title: "Welcome back!", description: "You are now logged in as admin." });
    } else {
      toast({ title: "Invalid credentials", description: "Please check your username and password.", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_logged_in");
    logActivity("Admin logged out", "auth");
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
                  <Input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                </div>
                <Button onClick={handleLogin} className="w-full gradient-orange text-primary-foreground">Login</Button>
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
      id: `media-${Date.now()}`, title: newMedia.title || "", url: newMedia.url || "",
      type: newMedia.type as "highlight" | "interview" || "highlight",
      date: newMedia.date || new Date().toISOString(), views: newMedia.views || "0"
    };
    const updated = [...mediaItems, item];
    setMediaItems(updated);
    localStorage.setItem("ssc_media", JSON.stringify(updated));
    setNewMedia({ title: "", url: "", type: "highlight", date: "", views: "0" });
    logActivity(`Added media: ${item.title}`, "media");
    toast({ title: "Media added!", description: "New media item has been added." });
  };

  const removeMedia = (id: string) => {
    const item = mediaItems.find(m => m.id === id);
    const updated = mediaItems.filter(m => m.id !== id);
    setMediaItems(updated);
    localStorage.setItem("ssc_media", JSON.stringify(updated));
    logActivity(`Removed media: ${item?.title}`, "media");
    toast({ title: "Media removed" });
  };

  const addNews = () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const item: NewsItem = {
      id: `news-${Date.now()}`, title: newNews.title || "", excerpt: newNews.excerpt || "",
      category: newNews.category || "Match Report", date: newNews.date || new Date().toISOString()
    };
    const updated = [...newsItems, item];
    setNewsItems(updated);
    localStorage.setItem("ssc_news", JSON.stringify(updated));
    setNewNews({ title: "", excerpt: "", category: "Match Report", date: "" });
    logActivity(`Added news: ${item.title}`, "news");
    toast({ title: "News added!" });
  };

  const removeNews = (id: string) => {
    const updated = newsItems.filter(n => n.id !== id);
    setNewsItems(updated);
    localStorage.setItem("ssc_news", JSON.stringify(updated));
    logActivity("Removed news article", "news");
    toast({ title: "News removed" });
  };

  const addGoalToResult = () => {
    if (!newGoal.player || !newGoal.minute) return;
    const goals = [...(newResult.goals || []), {
      player: newGoal.player, minute: newGoal.minute,
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
      id: `result-${Date.now()}`, homeTeam: newResult.homeTeam || "", awayTeam: newResult.awayTeam || "",
      homeScore: newResult.homeScore || 0, awayScore: newResult.awayScore || 0,
      date: newResult.date || new Date().toISOString().split('T')[0], category: newResult.category || "Football",
      stats: newResult.stats || { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: newResult.goals || []
    };
    const updated = [...matchResults, result];
    setMatchResults(updated);
    localStorage.setItem("ssc_match_results", JSON.stringify(updated));
    
    // Auto-update standings
    updateStandingsFromResult(result);
    
    setNewResult({
      homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0, date: "", category: "Football",
      stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: []
    });
    logActivity(`Added result: ${result.homeTeam} ${result.homeScore}-${result.awayScore} ${result.awayTeam}`, "match");
    toast({ title: "Match result added!" });
  };

  const updateStandingsFromResult = (result: MatchResult) => {
    const newStandings = [...standings];
    const homeIdx = newStandings.findIndex(s => s.team === result.homeTeam);
    const awayIdx = newStandings.findIndex(s => s.team === result.awayTeam);
    
    if (homeIdx !== -1 && awayIdx !== -1) {
      newStandings[homeIdx].played++;
      newStandings[awayIdx].played++;
      newStandings[homeIdx].gf += result.homeScore;
      newStandings[homeIdx].ga += result.awayScore;
      newStandings[awayIdx].gf += result.awayScore;
      newStandings[awayIdx].ga += result.homeScore;
      
      if (result.homeScore > result.awayScore) {
        newStandings[homeIdx].won++;
        newStandings[homeIdx].points += 3;
        newStandings[awayIdx].lost++;
      } else if (result.homeScore < result.awayScore) {
        newStandings[awayIdx].won++;
        newStandings[awayIdx].points += 3;
        newStandings[homeIdx].lost++;
      } else {
        newStandings[homeIdx].drawn++;
        newStandings[awayIdx].drawn++;
        newStandings[homeIdx].points++;
        newStandings[awayIdx].points++;
      }
      
      setStandings(newStandings);
      localStorage.setItem("ssc_standings", JSON.stringify(newStandings));
    }
  };

  const removeMatchResult = (id: string) => {
    const updated = matchResults.filter(m => m.id !== id);
    setMatchResults(updated);
    localStorage.setItem("ssc_match_results", JSON.stringify(updated));
    logActivity("Removed match result", "match");
    toast({ title: "Result removed" });
  };

  const updateFantasyPlayer = (id: string, updates: Partial<FantasyPlayer>) => {
    const updated = fantasyPlayers.map(p => p.id === id ? { ...p, ...updates } : p);
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    setEditingPlayer(null);
    logActivity(`Updated player: ${updates.name || id}`, "fantasy");
    toast({ title: "Player updated!" });
  };

  const addFantasyPlayer = () => {
    const newPlayer: FantasyPlayer = {
      id: `player-${Date.now()}`, name: "New Player", team: "9A",
      position: "MID", price: 5.0, points: 0, goals: 0, assists: 0
    };
    const updated = [...fantasyPlayers, newPlayer];
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    setEditingPlayer(newPlayer.id);
    logActivity("Added new fantasy player", "fantasy");
    toast({ title: "Player added!" });
  };

  const removeFantasyPlayer = (id: string) => {
    const updated = fantasyPlayers.filter(p => p.id !== id);
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    logActivity("Removed fantasy player", "fantasy");
    toast({ title: "Player removed" });
  };

  const applyBulkPointsUpdate = () => {
    const updated = fantasyPlayers.map(p => ({
      ...p,
      points: p.points + (bulkUpdates[p.id] || 0)
    }));
    setFantasyPlayers(updated);
    localStorage.setItem("ssc_fantasy_players", JSON.stringify(updated));
    setBulkUpdates({});
    logActivity("Applied bulk points update", "fantasy");
    toast({ title: "Bulk update applied!", description: "All player points have been updated." });
  };

  const savePlayerOfWeek = () => {
    localStorage.setItem("ssc_player_of_week", JSON.stringify(playerOfWeek));
    logActivity(`Set Player of Week: ${playerOfWeek.name}`, "awards");
    toast({ title: "Saved!" });
  };

  const saveTeamOfWeek = () => {
    localStorage.setItem("ssc_team_of_week", JSON.stringify(teamOfWeek));
    logActivity("Updated Team of the Week", "awards");
    toast({ title: "Saved!" });
  };

  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const announcement: Announcement = {
      id: `ann-${Date.now()}`, title: newAnnouncement.title, message: newAnnouncement.message,
      type: newAnnouncement.type, active: true, createdAt: new Date().toISOString()
    };
    const updated = [...announcements, announcement];
    setAnnouncements(updated);
    localStorage.setItem("ssc_announcements", JSON.stringify(updated));
    setNewAnnouncement({ title: "", message: "", type: "info" });
    logActivity(`Added announcement: ${announcement.title}`, "announcement");
    toast({ title: "Announcement added!" });
  };

  const toggleAnnouncement = (id: string) => {
    const updated = announcements.map(a => a.id === id ? { ...a, active: !a.active } : a);
    setAnnouncements(updated);
    localStorage.setItem("ssc_announcements", JSON.stringify(updated));
  };

  const removeAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("ssc_announcements", JSON.stringify(updated));
    toast({ title: "Announcement removed" });
  };

  const updateStanding = (team: string, field: keyof Standing, value: number) => {
    const updated = standings.map(s => {
      if (s.team === team) {
        const newStanding = { ...s, [field]: value };
        newStanding.points = newStanding.won * 3 + newStanding.drawn;
        return newStanding;
      }
      return s;
    });
    setStandings(updated);
    localStorage.setItem("ssc_standings", JSON.stringify(updated));
  };

  const quickAddResult = () => {
    if (!quickMatch.homeTeam || !quickMatch.awayTeam) {
      toast({ title: "Error", description: "Select both teams.", variant: "destructive" });
      return;
    }
    const result: MatchResult = {
      id: `result-${Date.now()}`, homeTeam: quickMatch.homeTeam, awayTeam: quickMatch.awayTeam,
      homeScore: quickMatch.homeScore, awayScore: quickMatch.awayScore,
      date: new Date().toISOString().split('T')[0], category: "Football",
      stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: []
    };
    const updated = [...matchResults, result];
    setMatchResults(updated);
    localStorage.setItem("ssc_match_results", JSON.stringify(updated));
    updateStandingsFromResult(result);
    setQuickMatch({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
    logActivity(`Quick result: ${result.homeTeam} ${result.homeScore}-${result.awayScore} ${result.awayTeam}`, "match");
    toast({ title: "Result added!" });
  };

  const exportData = () => {
    const data = {
      media: mediaItems, news: newsItems, results: matchResults,
      fantasy: fantasyPlayers, standings, announcements, 
      playerOfWeek, teamOfWeek, exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssc-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    logActivity("Exported data backup", "system");
    toast({ title: "Data exported!", description: "Backup file downloaded." });
  };

  const resetStandings = () => {
    const reset = teams.map(team => ({ team, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 }));
    setStandings(reset);
    localStorage.setItem("ssc_standings", JSON.stringify(reset));
    logActivity("Reset league standings", "system");
    toast({ title: "Standings reset!" });
  };

  // Stats for dashboard
  const totalMatches = matchResults.length;
  const totalUsers = registeredUsers.length;
  const totalPlayers = fantasyPlayers.length;
  const activeAnnouncements = announcements.filter(a => a.active).length;
  const topScorer = fantasyPlayers.reduce((max, p) => p.goals > max.goals ? p : max, fantasyPlayers[0]);

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
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="flex flex-wrap justify-start gap-1 mb-8 h-auto p-2">
              <TabsTrigger value="dashboard" className="font-bebas text-xs">
                <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="results" className="font-bebas text-xs">
                <Target className="h-4 w-4 mr-1" /> Results
              </TabsTrigger>
              <TabsTrigger value="standings" className="font-bebas text-xs">
                <Table className="h-4 w-4 mr-1" /> Standings
              </TabsTrigger>
              <TabsTrigger value="fantasy" className="font-bebas text-xs">
                <Coins className="h-4 w-4 mr-1" /> Fantasy
              </TabsTrigger>
              <TabsTrigger value="users" className="font-bebas text-xs">
                <Users className="h-4 w-4 mr-1" /> Users
              </TabsTrigger>
              <TabsTrigger value="announce" className="font-bebas text-xs">
                <Megaphone className="h-4 w-4 mr-1" /> Announce
              </TabsTrigger>
              <TabsTrigger value="media" className="font-bebas text-xs">
                <Video className="h-4 w-4 mr-1" /> Media
              </TabsTrigger>
              <TabsTrigger value="news" className="font-bebas text-xs">
                <FileText className="h-4 w-4 mr-1" /> News
              </TabsTrigger>
              <TabsTrigger value="awards" className="font-bebas text-xs">
                <Award className="h-4 w-4 mr-1" /> Awards
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Overview */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/20">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{totalMatches}</p>
                        <p className="text-sm text-muted-foreground">Matches Played</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-500/20">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{totalUsers}</p>
                        <p className="text-sm text-muted-foreground">Registered Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-500/20">
                        <Star className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{totalPlayers}</p>
                        <p className="text-sm text-muted-foreground">Fantasy Players</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-yellow-500/20">
                        <Megaphone className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{activeAnnouncements}</p>
                        <p className="text-sm text-muted-foreground">Active Alerts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Quick Match Result
                    </CardTitle>
                    <CardDescription>Quickly add a match score without detailed stats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <Select value={quickMatch.homeTeam} onValueChange={(v) => setQuickMatch({...quickMatch, homeTeam: v})}>
                        <SelectTrigger><SelectValue placeholder="Home" /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input type="number" min="0" className="text-center" value={quickMatch.homeScore} onChange={(e) => setQuickMatch({...quickMatch, homeScore: parseInt(e.target.value) || 0})} />
                      <span className="text-center font-bold">vs</span>
                      <Input type="number" min="0" className="text-center" value={quickMatch.awayScore} onChange={(e) => setQuickMatch({...quickMatch, awayScore: parseInt(e.target.value) || 0})} />
                      <Select value={quickMatch.awayTeam} onValueChange={(v) => setQuickMatch({...quickMatch, awayTeam: v})}>
                        <SelectTrigger><SelectValue placeholder="Away" /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={quickAddResult} className="w-full mt-4 gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add Result
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Top Performer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {topScorer && (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{topScorer.name}</p>
                          <p className="text-muted-foreground">{topScorer.team} • {topScorer.goals} Goals</p>
                          <Badge variant="outline" className="mt-1">{topScorer.points} Fantasy Points</Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-bebas flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {activityLog.slice(0, 20).map((log) => (
                        <div key={log.id} className="flex items-center gap-3 p-2 bg-muted rounded">
                          <Badge variant={log.type === "match" ? "default" : log.type === "fantasy" ? "secondary" : "outline"} className="text-xs">
                            {log.type}
                          </Badge>
                          <span className="text-sm flex-1">{log.action}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      {activityLog.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No activity yet</p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Match Results */}
            <TabsContent value="results">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Add Match Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label>Home Team</Label>
                        <Select value={newResult.homeTeam} onValueChange={(v) => setNewResult({...newResult, homeTeam: v})}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
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
                          <SelectContent className="bg-background border z-50">
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
                          <SelectContent className="bg-background border z-50">
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

                    <div className="border-t pt-4">
                      <Label className="text-lg font-bebas">Goal Scorers</Label>
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        <Input placeholder="Player" value={newGoal.player} onChange={(e) => setNewGoal({...newGoal, player: e.target.value})} />
                        <Input placeholder="Min" value={newGoal.minute} onChange={(e) => setNewGoal({...newGoal, minute: e.target.value})} />
                        <Input placeholder="Assist" value={newGoal.assist} onChange={(e) => setNewGoal({...newGoal, assist: e.target.value})} />
                        <Select value={newGoal.team} onValueChange={(v) => setNewGoal({...newGoal, team: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="away">Away</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2" onClick={addGoalToResult}>
                        <Plus className="h-4 w-4 mr-1" /> Add Goal
                      </Button>
                      {newResult.goals && newResult.goals.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {newResult.goals.map((g, i) => (
                            <Badge key={i} variant="secondary">{g.player} ({g.minute}')</Badge>
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
                    <ScrollArea className="h-[600px]">
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
                            <div className="text-xs text-muted-foreground">{result.category} • {result.date}</div>
                            {result.goals.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {result.goals.map((g, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{g.player} {g.minute}'</Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {matchResults.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No results yet</p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* League Standings */}
            <TabsContent value="standings">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-bebas flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        League Standings
                      </CardTitle>
                      <CardDescription>Manually edit or auto-update from results</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetStandings}>
                      <RefreshCw className="h-4 w-4 mr-1" /> Reset All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Team</th>
                          <th className="text-center p-2">P</th>
                          <th className="text-center p-2">W</th>
                          <th className="text-center p-2">D</th>
                          <th className="text-center p-2">L</th>
                          <th className="text-center p-2">GF</th>
                          <th className="text-center p-2">GA</th>
                          <th className="text-center p-2">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga)).map((s, i) => (
                          <tr key={s.team} className={`border-b ${i < 3 ? 'bg-primary/5' : ''}`}>
                            <td className="p-2 font-medium">{s.team}</td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.played} onChange={(e) => updateStanding(s.team, 'played', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.won} onChange={(e) => updateStanding(s.team, 'won', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.drawn} onChange={(e) => updateStanding(s.team, 'drawn', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.lost} onChange={(e) => updateStanding(s.team, 'lost', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.gf} onChange={(e) => updateStanding(s.team, 'gf', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-1">
                              <Input type="number" min="0" className="w-12 h-8 text-center" value={s.ga} onChange={(e) => updateStanding(s.team, 'ga', parseInt(e.target.value) || 0)} />
                            </td>
                            <td className="text-center p-2 font-bold text-primary">{s.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fantasy Players */}
            <TabsContent value="fantasy">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-bebas flex items-center gap-2">
                          <Coins className="h-5 w-5 text-primary" />
                          Fantasy Players
                        </CardTitle>
                        <Button onClick={addFantasyPlayer}><Plus className="h-4 w-4 mr-2" /> Add</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-2">
                          {fantasyPlayers.map((player) => (
                            <div key={player.id} className="p-3 bg-muted rounded-lg">
                              {editingPlayer === player.id ? (
                                <div className="grid grid-cols-8 gap-2 items-center">
                                  <Input value={player.name} onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, name: e.target.value} : p))} />
                                  <Select value={player.team} onValueChange={(v) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, team: v} : p))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-background border z-50">{teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                  </Select>
                                  <Select value={player.position} onValueChange={(v) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, position: v} : p))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-background border z-50">
                                      <SelectItem value="GK">GK</SelectItem>
                                      <SelectItem value="DEF">DEF</SelectItem>
                                      <SelectItem value="MID">MID</SelectItem>
                                      <SelectItem value="FWD">FWD</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input type="number" step="0.5" value={player.price} onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, price: parseFloat(e.target.value) || 0} : p))} />
                                  <Input type="number" value={player.points} onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, points: parseInt(e.target.value) || 0} : p))} />
                                  <Input type="number" value={player.goals} onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, goals: parseInt(e.target.value) || 0} : p))} />
                                  <Input type="number" value={player.assists} onChange={(e) => setFantasyPlayers(fantasyPlayers.map(p => p.id === player.id ? {...p, assists: parseInt(e.target.value) || 0} : p))} />
                                  <div className="flex gap-1">
                                    <Button size="sm" onClick={() => updateFantasyPlayer(player.id, player)}><Save className="h-4 w-4" /></Button>
                                    <Button size="sm" variant="destructive" onClick={() => removeFantasyPlayer(player.id)}><Trash2 className="h-4 w-4" /></Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Badge variant={player.position === "GK" ? "default" : player.position === "DEF" ? "secondary" : player.position === "MID" ? "outline" : "destructive"}>{player.position}</Badge>
                                    <span className="font-medium">{player.name}</span>
                                    <span className="text-muted-foreground text-sm">{player.team}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-primary font-bold">£{player.price}M</span>
                                    <span className="text-sm">{player.points}pts</span>
                                    <span className="text-xs text-muted-foreground">{player.goals}G {player.assists}A</span>
                                    <Button variant="ghost" size="sm" onClick={() => setEditingPlayer(player.id)}><Edit className="h-4 w-4" /></Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Bulk Points Update
                    </CardTitle>
                    <CardDescription>Add points to multiple players at once</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {fantasyPlayers.map((player) => (
                          <div key={player.id} className="flex items-center gap-2">
                            <span className="flex-1 text-sm truncate">{player.name}</span>
                            <Input 
                              type="number" 
                              className="w-20 h-8 text-center" 
                              placeholder="+0"
                              value={bulkUpdates[player.id] || ""}
                              onChange={(e) => setBulkUpdates({...bulkUpdates, [player.id]: parseInt(e.target.value) || 0})}
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <Button onClick={applyBulkPointsUpdate} className="w-full mt-4">
                      <CheckCircle className="h-4 w-4 mr-2" /> Apply All Updates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bebas flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Registered Users ({registeredUsers.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {registeredUsers.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>No registered users yet</p>
                            </div>
                          ) : (
                            registeredUsers.map((user) => (
                              <div key={user.id} className="p-4 bg-muted rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                      <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{user.name}</p>
                                      <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4 text-center">
                                    <div>
                                      <p className="text-xl font-bold text-primary">{user.fantasyPoints || 0}</p>
                                      <p className="text-xs text-muted-foreground">Fantasy</p>
                                    </div>
                                    <div>
                                      <p className="text-xl font-bold">{user.predictions || 0}</p>
                                      <p className="text-xs text-muted-foreground">Predictions</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bebas flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        Fantasy Leaderboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {registeredUsers.sort((a, b) => (b.fantasyPoints || 0) - (a.fantasyPoints || 0)).slice(0, 5).map((user, i) => (
                          <div key={user.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className={`font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-500' : ''}`}>#{i + 1} {user.name}</span>
                            <span className="font-bold text-primary">{user.fantasyPoints || 0}</span>
                          </div>
                        ))}
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
                        {registeredUsers.sort((a, b) => (b.predictions || 0) - (a.predictions || 0)).slice(0, 5).map((user, i) => (
                          <div key={user.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className={`font-bold ${i === 0 ? 'text-yellow-500' : ''}`}>#{i + 1} {user.name}</span>
                            <span className="font-bold">{user.predictions || 0}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Announcements */}
            <TabsContent value="announce">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-primary" />
                      Create Announcement
                    </CardTitle>
                    <CardDescription>Create banners that display across the site</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input placeholder="Match Day Update" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="Today's match between 11A and 12B starts at 3PM..." value={newAnnouncement.message} onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newAnnouncement.type} onValueChange={(v: "info" | "warning" | "success") => setNewAnnouncement({...newAnnouncement, type: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="info">Info (Blue)</SelectItem>
                          <SelectItem value="warning">Warning (Yellow)</SelectItem>
                          <SelectItem value="success">Success (Green)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addAnnouncement} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Create Announcement
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Active Announcements ({announcements.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {announcements.map((ann) => (
                          <div key={ann.id} className={`p-4 rounded-lg border-l-4 ${ann.type === 'info' ? 'bg-blue-500/10 border-blue-500' : ann.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' : 'bg-green-500/10 border-green-500'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold">{ann.title}</span>
                              <div className="flex items-center gap-2">
                                <Switch checked={ann.active} onCheckedChange={() => toggleAnnouncement(ann.id)} />
                                <Button variant="ghost" size="sm" onClick={() => removeAnnouncement(ann.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{ann.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={ann.active ? "default" : "secondary"}>{ann.active ? "Active" : "Inactive"}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(ann.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                        {announcements.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No announcements yet</p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Media */}
            <TabsContent value="media">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-primary" />
                      Add Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Title" value={newMedia.title} onChange={(e) => setNewMedia({...newMedia, title: e.target.value})} />
                    <Input placeholder="YouTube URL" value={newMedia.url} onChange={(e) => setNewMedia({...newMedia, url: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={newMedia.type} onValueChange={(v) => setNewMedia({...newMedia, type: v as "highlight" | "interview"})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="highlight">Highlight</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="date" value={newMedia.date} onChange={(e) => setNewMedia({...newMedia, date: e.target.value})} />
                    </div>
                    <Button onClick={addMedia} className="w-full"><Plus className="h-4 w-4 mr-2" /> Add</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="font-bebas">Media ({mediaItems.length})</CardTitle></CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {mediaItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div><p className="font-medium text-sm">{item.title}</p><p className="text-xs text-muted-foreground">{item.type} • {item.date}</p></div>
                            <Button variant="ghost" size="sm" onClick={() => removeMedia(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* News */}
            <TabsContent value="news">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Add News
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Title" value={newNews.title} onChange={(e) => setNewNews({...newNews, title: e.target.value})} />
                    <Textarea placeholder="Content excerpt..." value={newNews.excerpt} onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={newNews.category} onValueChange={(v) => setNewNews({...newNews, category: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="Match Report">Match Report</SelectItem>
                          <SelectItem value="Announcement">Announcement</SelectItem>
                          <SelectItem value="Player Spotlight">Player Spotlight</SelectItem>
                          <SelectItem value="Tournament">Tournament</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="date" value={newNews.date} onChange={(e) => setNewNews({...newNews, date: e.target.value})} />
                    </div>
                    <Button onClick={addNews} className="w-full"><Plus className="h-4 w-4 mr-2" /> Add</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="font-bebas">News ({newsItems.length})</CardTitle></CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {newsItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div><p className="font-medium text-sm">{item.title}</p><p className="text-xs text-muted-foreground">{item.category} • {item.date}</p></div>
                            <Button variant="ghost" size="sm" onClick={() => removeNews(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Awards */}
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
                    <Input placeholder="Player Name" value={playerOfWeek.name} onChange={(e) => setPlayerOfWeek({...playerOfWeek, name: e.target.value})} />
                    <Select value={playerOfWeek.team} onValueChange={(v) => setPlayerOfWeek({...playerOfWeek, team: v})}>
                      <SelectTrigger><SelectValue placeholder="Team" /></SelectTrigger>
                      <SelectContent className="bg-background border z-50">{teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                    <Textarea placeholder="Description..." value={playerOfWeek.description} onChange={(e) => setPlayerOfWeek({...playerOfWeek, description: e.target.value})} />
                    <Button onClick={savePlayerOfWeek} className="w-full">Save</Button>
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
                    <Textarea placeholder="Starting XI..." value={teamOfWeek.players} onChange={(e) => setTeamOfWeek({...teamOfWeek, players: e.target.value})} />
                    <Textarea placeholder="Substitutes..." value={teamOfWeek.subs} onChange={(e) => setTeamOfWeek({...teamOfWeek, subs: e.target.value})} />
                    <Textarea placeholder="Description..." value={teamOfWeek.description} onChange={(e) => setTeamOfWeek({...teamOfWeek, description: e.target.value})} />
                    <Button onClick={saveTeamOfWeek} className="w-full">Save</Button>
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
