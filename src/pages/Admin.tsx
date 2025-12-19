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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useData, type MatchResult, type FantasyPlayer, type Standing } from "@/contexts/DataContext";
import { 
  Video, Users, Trophy, Calendar, Plus, Trash2, Edit,
  FileText, Shield, Award, Lock, Target, Coins, Save,
  User, Crown, LayoutDashboard, Table, Megaphone, 
  RefreshCw, Download, Clock, TrendingUp, Activity,
  CheckCircle, Zap, Star, BarChart3
} from "lucide-react";

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  fantasyTeam?: string[];
  fantasyPoints?: number;
  predictions?: number;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  type: string;
}

const Admin = () => {
  const { toast } = useToast();
  const data = useData();
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Local state for forms
  const [newResult, setNewResult] = useState<Partial<MatchResult>>({
    homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0, date: "", category: "Football",
    stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
    goals: []
  });
  const [newGoal, setNewGoal] = useState({ player: "", minute: "", assist: "", team: "home" });
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  const [editingPlayerData, setEditingPlayerData] = useState<FantasyPlayer | null>(null);
  const [quickMatch, setQuickMatch] = useState({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
  const [bulkUpdates, setBulkUpdates] = useState<{[key: string]: number}>({});
  
  // Announcements form
  const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; message: string; type: "info" | "warning" | "success" }>({ title: "", message: "", type: "info" });
  
  // News form
  const [newNews, setNewNews] = useState({ title: "", excerpt: "", category: "Match Report", date: "" });
  
  // Media form
  const [newMedia, setNewMedia] = useState({ title: "", url: "", type: "highlight" as "highlight" | "interview", date: "", views: "0" });
  
  // Upcoming match form
  const [newUpcoming, setNewUpcoming] = useState({ homeTeam: "", awayTeam: "", date: "", time: "", competition: "" });
  
  // Activity Log
  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    const stored = localStorage.getItem("ssc_activity_log");
    return stored ? JSON.parse(stored) : [];
  });

  // Users Management
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

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

  // Login screen
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

  // Actions
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

  const handleAddMatchResult = () => {
    if (!newResult.homeTeam || !newResult.awayTeam) {
      toast({ title: "Error", description: "Please select both teams.", variant: "destructive" });
      return;
    }
    data.addMatchResult({
      homeTeam: newResult.homeTeam || "", awayTeam: newResult.awayTeam || "",
      homeScore: newResult.homeScore || 0, awayScore: newResult.awayScore || 0,
      date: newResult.date || new Date().toISOString().split('T')[0], category: newResult.category || "Football",
      stats: newResult.stats || { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: newResult.goals || []
    });
    logActivity(`Added result: ${newResult.homeTeam} ${newResult.homeScore}-${newResult.awayScore} ${newResult.awayTeam}`, "match");
    setNewResult({
      homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0, date: "", category: "Football",
      stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: []
    });
    toast({ title: "Match result added!" });
  };

  const quickAddResult = () => {
    if (!quickMatch.homeTeam || !quickMatch.awayTeam) {
      toast({ title: "Error", description: "Select both teams.", variant: "destructive" });
      return;
    }
    data.addMatchResult({
      homeTeam: quickMatch.homeTeam, awayTeam: quickMatch.awayTeam,
      homeScore: quickMatch.homeScore, awayScore: quickMatch.awayScore,
      date: new Date().toISOString().split('T')[0], category: "Football",
      stats: { homeShots: 0, awayShots: 0, homeShotsOnTarget: 0, awayShotsOnTarget: 0, homeFouls: 0, awayFouls: 0, homeCorners: 0, awayCorners: 0, homePasses: 0, awayPasses: 0 },
      goals: []
    });
    logActivity(`Quick result: ${quickMatch.homeTeam} ${quickMatch.homeScore}-${quickMatch.awayScore} ${quickMatch.awayTeam}`, "match");
    setQuickMatch({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
    toast({ title: "Result added!" });
  };

  const updateStanding = (team: string, field: keyof Standing, value: number) => {
    const updated = data.standings.map(s => {
      if (s.team === team) {
        const newStanding = { ...s, [field]: value };
        newStanding.points = newStanding.won * 3 + newStanding.drawn;
        return newStanding;
      }
      return s;
    });
    data.updateStandings(updated);
  };

  const resetStandings = () => {
    const reset = data.teams.map(team => ({ team, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 }));
    data.updateStandings(reset);
    logActivity("Reset league standings", "system");
    toast({ title: "Standings reset!" });
  };

  const startEditPlayer = (player: FantasyPlayer) => {
    setEditingPlayer(player.id);
    setEditingPlayerData({ ...player });
  };

  const savePlayerEdit = () => {
    if (editingPlayerData) {
      data.updateFantasyPlayer(editingPlayerData.id, editingPlayerData);
      logActivity(`Updated player: ${editingPlayerData.name}`, "fantasy");
      toast({ title: "Player updated!" });
    }
    setEditingPlayer(null);
    setEditingPlayerData(null);
  };

  const handleAddPlayer = () => {
    data.addFantasyPlayer({
      name: "New Player", team: "9A", position: "MID", price: 5.0, points: 0, goals: 0, assists: 0
    });
    logActivity("Added new fantasy player", "fantasy");
    toast({ title: "Player added!" });
  };

  const applyBulkPointsUpdate = () => {
    Object.entries(bulkUpdates).forEach(([id, points]) => {
      if (points !== 0) {
        const player = data.fantasyPlayers.find(p => p.id === id);
        if (player) {
          data.updateFantasyPlayer(id, { points: player.points + points });
        }
      }
    });
    setBulkUpdates({});
    logActivity("Applied bulk points update", "fantasy");
    toast({ title: "Points updated!" });
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast({ title: "Error", description: "Fill in all fields.", variant: "destructive" });
      return;
    }
    data.addAnnouncement({ ...newAnnouncement, active: true });
    logActivity(`Created announcement: ${newAnnouncement.title}`, "announce");
    setNewAnnouncement({ title: "", message: "", type: "info" });
    toast({ title: "Announcement created!" });
  };

  const handleAddNews = () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({ title: "Error", description: "Fill in all fields.", variant: "destructive" });
      return;
    }
    data.addNewsItem({ ...newNews, date: newNews.date || new Date().toISOString() });
    logActivity(`Added news: ${newNews.title}`, "news");
    setNewNews({ title: "", excerpt: "", category: "Match Report", date: "" });
    toast({ title: "News added!" });
  };

  const handleAddMedia = () => {
    if (!newMedia.title || !newMedia.url) {
      toast({ title: "Error", description: "Fill in all fields.", variant: "destructive" });
      return;
    }
    data.addMediaItem({ ...newMedia, date: newMedia.date || new Date().toISOString() });
    logActivity(`Added media: ${newMedia.title}`, "media");
    setNewMedia({ title: "", url: "", type: "highlight", date: "", views: "0" });
    toast({ title: "Media added!" });
  };

  const handleAddUpcomingMatch = () => {
    if (!newUpcoming.homeTeam || !newUpcoming.awayTeam) {
      toast({ title: "Error", description: "Select both teams.", variant: "destructive" });
      return;
    }
    data.addUpcomingMatch(newUpcoming);
    logActivity(`Added upcoming: ${newUpcoming.homeTeam} vs ${newUpcoming.awayTeam}`, "match");
    setNewUpcoming({ homeTeam: "", awayTeam: "", date: "", time: "", competition: "" });
    toast({ title: "Upcoming match added!" });
  };

  const exportData = () => {
    const exportObj = {
      matchResults: data.matchResults,
      standings: data.standings,
      fantasyPlayers: data.fantasyPlayers,
      announcements: data.announcements,
      newsItems: data.newsItems,
      mediaItems: data.mediaItems,
      upcomingMatches: data.upcomingMatches,
      playerOfWeek: data.playerOfWeek,
      teamOfWeek: data.teamOfWeek,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssc-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    logActivity("Exported data backup", "system");
    toast({ title: "Data exported!" });
  };

  // Stats for dashboard
  const totalMatches = data.matchResults.length;
  const totalUsers = registeredUsers.length;
  const totalPlayers = data.fantasyPlayers.length;
  const activeAnnouncements = data.announcements.filter(a => a.active).length;
  const topScorer = data.fantasyPlayers.length > 0 ? data.fantasyPlayers.reduce((max, p) => p.goals > max.goals ? p : max, data.fantasyPlayers[0]) : null;

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
              <TabsTrigger value="upcoming" className="font-bebas text-xs">
                <Calendar className="h-4 w-4 mr-1" /> Upcoming
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
                    <CardDescription>Quickly add a match score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <Select value={quickMatch.homeTeam} onValueChange={(v) => setQuickMatch({...quickMatch, homeTeam: v})}>
                        <SelectTrigger><SelectValue placeholder="Home" /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          {data.teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input type="number" min="0" className="text-center" value={quickMatch.homeScore} onChange={(e) => setQuickMatch({...quickMatch, homeScore: parseInt(e.target.value) || 0})} />
                      <span className="text-center font-bold">vs</span>
                      <Input type="number" min="0" className="text-center" value={quickMatch.awayScore} onChange={(e) => setQuickMatch({...quickMatch, awayScore: parseInt(e.target.value) || 0})} />
                      <Select value={quickMatch.awayTeam} onValueChange={(v) => setQuickMatch({...quickMatch, awayTeam: v})}>
                        <SelectTrigger><SelectValue placeholder="Away" /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          {data.teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
                            {data.teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
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
                            {data.teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
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
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeCorners} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeCorners: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Corners</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayCorners} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayCorners: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homeFouls} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homeFouls: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Fouls</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayFouls} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayFouls: parseInt(e.target.value) || 0}})} />
                        
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.homePasses} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, homePasses: parseInt(e.target.value) || 0}})} />
                        <span className="text-center py-2">Passes</span>
                        <Input type="number" min="0" className="text-center" value={newResult.stats?.awayPasses} onChange={(e) => setNewResult({...newResult, stats: {...newResult.stats!, awayPasses: parseInt(e.target.value) || 0}})} />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <Label className="text-lg font-bebas">Goal Scorers</Label>
                      <div className="grid grid-cols-5 gap-2 mt-3">
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
                        <Button onClick={addGoalToResult}><Plus className="h-4 w-4" /></Button>
                      </div>
                      {(newResult.goals || []).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(newResult.goals || []).map((g, i) => (
                            <Badge key={i} variant="outline">{g.player} ({g.minute}){g.assist && ` - ${g.assist}`}</Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button onClick={handleAddMatchResult} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add Match Result
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Previous Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-2">
                        {data.matchResults.slice().reverse().map((result) => (
                          <div key={result.id} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {result.homeTeam} {result.homeScore} - {result.awayScore} {result.awayTeam}
                              </span>
                              <Button variant="ghost" size="sm" onClick={() => data.removeMatchResult(result.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">{result.category} • {result.date}</div>
                            {result.goals.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {result.goals.map((g, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{g.player} {g.minute}</Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        {data.matchResults.length === 0 && (
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
                      <CardDescription>Edit standings or reset to recalculate from results</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => data.recalculateStandings()}>
                        <RefreshCw className="h-4 w-4 mr-1" /> Recalculate
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetStandings}>
                        <Trash2 className="h-4 w-4 mr-1" /> Reset All
                      </Button>
                    </div>
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
                        {[...data.standings].sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga)).map((s, i) => (
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

            {/* Upcoming Matches */}
            <TabsContent value="upcoming">
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
                        <Select value={newUpcoming.homeTeam} onValueChange={(v) => setNewUpcoming({...newUpcoming, homeTeam: v})}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            {data.teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Away Team</Label>
                        <Select value={newUpcoming.awayTeam} onValueChange={(v) => setNewUpcoming({...newUpcoming, awayTeam: v})}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            {data.teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input value={newUpcoming.date} onChange={(e) => setNewUpcoming({...newUpcoming, date: e.target.value})} placeholder="Dec 20" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input value={newUpcoming.time} onChange={(e) => setNewUpcoming({...newUpcoming, time: e.target.value})} placeholder="3:00 PM" />
                      </div>
                      <div className="space-y-2">
                        <Label>Competition</Label>
                        <Input value={newUpcoming.competition} onChange={(e) => setNewUpcoming({...newUpcoming, competition: e.target.value})} placeholder="Semifinals" />
                      </div>
                    </div>
                    <Button onClick={handleAddUpcomingMatch} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add Match
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Scheduled Matches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {data.upcomingMatches.map((match) => (
                          <div key={match.id} className="p-3 bg-muted rounded-lg flex items-center justify-between">
                            <div>
                              <p className="font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                              <p className="text-xs text-muted-foreground">{match.date} • {match.time} • {match.competition}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => data.removeUpcomingMatch(match.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        {data.upcomingMatches.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No upcoming matches</p>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
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
                        <Button onClick={handleAddPlayer}><Plus className="h-4 w-4 mr-2" /> Add</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-2">
                          {data.fantasyPlayers.map((player) => (
                            <div key={player.id} className="p-3 bg-muted rounded-lg">
                              {editingPlayer === player.id && editingPlayerData ? (
                                <div className="grid grid-cols-8 gap-2 items-center">
                                  <Input value={editingPlayerData.name} onChange={(e) => setEditingPlayerData({...editingPlayerData, name: e.target.value})} />
                                  <Select value={editingPlayerData.team} onValueChange={(v) => setEditingPlayerData({...editingPlayerData, team: v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-background border z-50">{data.teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                  </Select>
                                  <Select value={editingPlayerData.position} onValueChange={(v) => setEditingPlayerData({...editingPlayerData, position: v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-background border z-50">
                                      <SelectItem value="GK">GK</SelectItem>
                                      <SelectItem value="DEF">DEF</SelectItem>
                                      <SelectItem value="MID">MID</SelectItem>
                                      <SelectItem value="FWD">FWD</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input type="number" step="0.5" value={editingPlayerData.price} onChange={(e) => setEditingPlayerData({...editingPlayerData, price: parseFloat(e.target.value) || 0})} />
                                  <Input type="number" value={editingPlayerData.points} onChange={(e) => setEditingPlayerData({...editingPlayerData, points: parseInt(e.target.value) || 0})} />
                                  <Input type="number" value={editingPlayerData.goals} onChange={(e) => setEditingPlayerData({...editingPlayerData, goals: parseInt(e.target.value) || 0})} />
                                  <Input type="number" value={editingPlayerData.assists} onChange={(e) => setEditingPlayerData({...editingPlayerData, assists: parseInt(e.target.value) || 0})} />
                                  <div className="flex gap-1">
                                    <Button size="sm" onClick={savePlayerEdit}><Save className="h-4 w-4" /></Button>
                                    <Button size="sm" variant="destructive" onClick={() => { data.removeFantasyPlayer(player.id); setEditingPlayer(null); }}><Trash2 className="h-4 w-4" /></Button>
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
                                    <Button variant="ghost" size="sm" onClick={() => startEditPlayer(player)}><Edit className="h-4 w-4" /></Button>
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
                    <CardDescription>Add points to multiple players</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {data.fantasyPlayers.map((player) => (
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} placeholder="Important Update" />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea value={newAnnouncement.message} onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})} placeholder="Your announcement message..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newAnnouncement.type} onValueChange={(v: "info" | "warning" | "success") => setNewAnnouncement({...newAnnouncement, type: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-background border z-50">
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddAnnouncement} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Create Announcement
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Active Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {data.announcements.map((ann) => (
                          <div key={ann.id} className={`p-3 rounded-lg border ${ann.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' : ann.type === 'success' ? 'bg-green-500/10 border-green-500' : 'bg-blue-500/10 border-blue-500'}`}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{ann.title}</span>
                              <div className="flex items-center gap-2">
                                <Switch checked={ann.active} onCheckedChange={(v) => data.updateAnnouncement(ann.id, { active: v })} />
                                <Button variant="ghost" size="sm" onClick={() => data.removeAnnouncement(ann.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{ann.message}</p>
                          </div>
                        ))}
                        {data.announcements.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No announcements</p>
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
                      <Video className="h-5 w-5 text-primary" />
                      Add Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={newMedia.title} onChange={(e) => setNewMedia({...newMedia, title: e.target.value})} placeholder="Highlight Title" />
                    </div>
                    <div className="space-y-2">
                      <Label>YouTube URL</Label>
                      <Input value={newMedia.url} onChange={(e) => setNewMedia({...newMedia, url: e.target.value})} placeholder="https://youtube.com/watch?v=..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={newMedia.type} onValueChange={(v: "highlight" | "interview") => setNewMedia({...newMedia, type: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="highlight">Highlight</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" value={newMedia.date} onChange={(e) => setNewMedia({...newMedia, date: e.target.value})} />
                      </div>
                    </div>
                    <Button onClick={handleAddMedia} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add Media
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Media Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {data.mediaItems.map((item) => (
                          <div key={item.id} className="p-3 bg-muted rounded-lg flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.type} • {item.date}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => data.removeMediaItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        {data.mediaItems.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No media yet</p>
                        )}
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
                      Add News Article
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={newNews.title} onChange={(e) => setNewNews({...newNews, title: e.target.value})} placeholder="Article Title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Excerpt</Label>
                      <Textarea value={newNews.excerpt} onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})} placeholder="Brief description..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={newNews.category} onValueChange={(v) => setNewNews({...newNews, category: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            <SelectItem value="Match Report">Match Report</SelectItem>
                            <SelectItem value="Announcement">Announcement</SelectItem>
                            <SelectItem value="Interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" value={newNews.date} onChange={(e) => setNewNews({...newNews, date: e.target.value})} />
                      </div>
                    </div>
                    <Button onClick={handleAddNews} className="w-full gradient-orange text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add News
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas">Published Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {data.newsItems.map((item) => (
                          <div key={item.id} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.title}</span>
                              <Button variant="ghost" size="sm" onClick={() => data.removeNewsItem(item.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.category} • {item.date}</p>
                          </div>
                        ))}
                        {data.newsItems.length === 0 && (
                          <p className="text-center text-muted-foreground py-8">No news articles</p>
                        )}
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
                      <Star className="h-5 w-5 text-primary" />
                      Player of the Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Player Name</Label>
                        <Input value={data.playerOfWeek.name} onChange={(e) => data.updatePlayerOfWeek({...data.playerOfWeek, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Team</Label>
                        <Select value={data.playerOfWeek.team} onValueChange={(v) => data.updatePlayerOfWeek({...data.playerOfWeek, team: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background border z-50">
                            {data.teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={data.playerOfWeek.description} onChange={(e) => data.updatePlayerOfWeek({...data.playerOfWeek, description: e.target.value})} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bebas flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Team of the Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Starting XI (comma separated)</Label>
                      <Textarea value={data.teamOfWeek.players} onChange={(e) => data.updateTeamOfWeek({...data.teamOfWeek, players: e.target.value})} placeholder="Player1, Player2, ..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Substitutes (comma separated)</Label>
                      <Input value={data.teamOfWeek.subs} onChange={(e) => data.updateTeamOfWeek({...data.teamOfWeek, subs: e.target.value})} placeholder="Sub1, Sub2, ..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={data.teamOfWeek.description} onChange={(e) => data.updateTeamOfWeek({...data.teamOfWeek, description: e.target.value})} />
                    </div>
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
