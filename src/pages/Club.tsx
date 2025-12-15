import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Trophy, Users, Coins, Plus, Minus, Star, TrendingUp, Zap, Target, Shield, Award,
  Crown, Sparkles, RotateCcw, ArrowUpDown, Flame, Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  price: number;
  points: number;
  form: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  selected: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isBenched?: boolean;
}

interface Chip {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  used: boolean;
  active: boolean;
}

const Club = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [budget, setBudget] = useState(85);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [benchPlayers, setBenchPlayers] = useState<Player[]>([]);
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  
  const [chips, setChips] = useState<Chip[]>([
    { id: "triple", name: "Triple Captain", description: "Your captain scores 3x points", icon: <Crown className="h-4 w-4" />, used: false, active: false },
    { id: "bench", name: "Bench Boost", description: "Bench players also score points", icon: <ArrowUpDown className="h-4 w-4" />, used: false, active: false },
    { id: "wildcard", name: "Wildcard", description: "Unlimited free transfers", icon: <RotateCcw className="h-4 w-4" />, used: false, active: false },
    { id: "freehit", name: "Free Hit", description: "Temporary team for one week", icon: <Sparkles className="h-4 w-4" />, used: false, active: false },
  ]);

  const allPlayers: Player[] = [
    // Goalkeepers - Higher prices
    { id: "gk1", name: "Kaleab", team: "11A", position: "GK", price: 8.5, points: 42, form: 7.2, goals: 0, assists: 0, cleanSheets: 4, selected: false },
    { id: "gk2", name: "Bamlak", team: "10B", position: "GK", price: 7.0, points: 35, form: 6.1, goals: 0, assists: 0, cleanSheets: 3, selected: false },
    { id: "gk3", name: "Tewodros", team: "12A", position: "GK", price: 7.5, points: 38, form: 6.5, goals: 0, assists: 0, cleanSheets: 3, selected: false },
    { id: "gk4", name: "Henok", team: "9A", position: "GK", price: 6.0, points: 28, form: 5.8, goals: 0, assists: 0, cleanSheets: 2, selected: false },
    
    // Defenders - Higher prices
    { id: "def1", name: "Yohanan", team: "11A", position: "DEF", price: 9.0, points: 48, form: 7.5, goals: 2, assists: 1, cleanSheets: 4, selected: false },
    { id: "def2", name: "Yared", team: "10B", position: "DEF", price: 8.5, points: 44, form: 7.0, goals: 1, assists: 2, cleanSheets: 3, selected: false },
    { id: "def3", name: "Biruk", team: "12A", position: "DEF", price: 7.5, points: 36, form: 6.2, goals: 0, assists: 1, cleanSheets: 3, selected: false },
    { id: "def4", name: "Dawit", team: "11B", position: "DEF", price: 6.5, points: 32, form: 5.9, goals: 1, assists: 0, cleanSheets: 2, selected: false },
    { id: "def5", name: "Eyob", team: "10A", position: "DEF", price: 7.0, points: 35, form: 6.0, goals: 0, assists: 2, cleanSheets: 3, selected: false },
    { id: "def6", name: "Solomon", team: "9B", position: "DEF", price: 5.5, points: 25, form: 5.5, goals: 0, assists: 0, cleanSheets: 2, selected: false },
    
    // Midfielders - Premium prices
    { id: "mid1", name: "Mussie", team: "10B", position: "MID", price: 12.5, points: 78, form: 9.2, goals: 5, assists: 8, selected: false },
    { id: "mid2", name: "Reyan", team: "11A", position: "MID", price: 11.0, points: 65, form: 8.1, goals: 3, assists: 6, selected: false },
    { id: "mid3", name: "Naol", team: "10A", position: "MID", price: 9.5, points: 52, form: 7.3, goals: 4, assists: 3, selected: false },
    { id: "mid4", name: "Bereket", team: "12A", position: "MID", price: 9.0, points: 48, form: 6.8, goals: 2, assists: 4, selected: false },
    { id: "mid5", name: "Yonas", team: "11B", position: "MID", price: 8.0, points: 42, form: 6.5, goals: 3, assists: 2, selected: false },
    { id: "mid6", name: "Mikias", team: "9A", position: "MID", price: 6.5, points: 35, form: 6.0, goals: 2, assists: 2, selected: false },
    { id: "mid7", name: "Nahom", team: "10C", position: "MID", price: 7.5, points: 40, form: 6.3, goals: 2, assists: 3, selected: false },
    
    // Forwards - Premium prices
    { id: "fwd1", name: "Haileab", team: "11A", position: "FWD", price: 14.0, points: 85, form: 9.5, goals: 12, assists: 4, selected: false },
    { id: "fwd2", name: "Lewi", team: "10B", position: "FWD", price: 12.0, points: 72, form: 8.5, goals: 9, assists: 3, selected: false },
    { id: "fwd3", name: "Girum", team: "12A", position: "FWD", price: 10.5, points: 58, form: 7.6, goals: 7, assists: 2, selected: false },
    { id: "fwd4", name: "Fiker Tilahun", team: "11A", position: "FWD", price: 11.0, points: 62, form: 7.8, goals: 8, assists: 3, selected: false },
    { id: "fwd5", name: "Abreham", team: "10A", position: "FWD", price: 9.0, points: 48, form: 6.9, goals: 6, assists: 2, selected: false },
    { id: "fwd6", name: "Samson", team: "9B", position: "FWD", price: 7.0, points: 32, form: 5.8, goals: 4, assists: 1, selected: false },
  ];

  const [players, setPlayers] = useState(allPlayers);

  const getPositionCount = (position: string, includeBench = false) => {
    const mainCount = selectedPlayers.filter(p => p.position === position).length;
    const benchCount = includeBench ? benchPlayers.filter(p => p.position === position).length : 0;
    return mainCount + benchCount;
  };

  const getPositionLimit = (position: string) => {
    switch(position) {
      case "GK": return 1;
      case "DEF": return 4;
      case "MID": return 4;
      case "FWD": return 2;
      default: return 0;
    }
  };

  const getBenchLimit = (position: string) => {
    switch(position) {
      case "GK": return 1;
      case "DEF": return 1;
      case "MID": return 1;
      case "FWD": return 1;
      default: return 0;
    }
  };

  const getTotalBenchCount = () => benchPlayers.length;

  const canAddPlayer = (player: Player, toBench = false) => {
    if (player.selected) return false;
    if (budget < player.price) return false;
    
    if (toBench) {
      if (getTotalBenchCount() >= 4) return false;
      const benchPositionCount = benchPlayers.filter(p => p.position === player.position).length;
      if (benchPositionCount >= getBenchLimit(player.position)) return false;
    } else {
      if (selectedPlayers.length >= 11) return false;
      if (getPositionCount(player.position) >= getPositionLimit(player.position)) return false;
    }
    return true;
  };

  const addPlayer = (player: Player, toBench = false) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please sign in to build your fantasy team.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!canAddPlayer(player, toBench)) return;
    
    const updatedPlayers = players.map(p => 
      p.id === player.id ? { ...p, selected: true } : p
    );
    setPlayers(updatedPlayers);
    
    if (toBench) {
      setBenchPlayers([...benchPlayers, { ...player, selected: true, isBenched: true }]);
    } else {
      setSelectedPlayers([...selectedPlayers, { ...player, selected: true }]);
      setTotalPoints(prev => prev + player.points);
    }
    setBudget(prev => prev - player.price);
  };

  const removePlayer = (player: Player, fromBench = false) => {
    const updatedPlayers = players.map(p => 
      p.id === player.id ? { ...p, selected: false } : p
    );
    setPlayers(updatedPlayers);
    
    if (fromBench) {
      setBenchPlayers(benchPlayers.filter(p => p.id !== player.id));
    } else {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setTotalPoints(prev => prev - player.points);
      if (captainId === player.id) setCaptainId(null);
      if (viceCaptainId === player.id) setViceCaptainId(null);
    }
    setBudget(prev => prev + player.price);
  };

  const setCaptain = (playerId: string) => {
    if (viceCaptainId === playerId) setViceCaptainId(null);
    setCaptainId(playerId);
    toast({ title: "Captain Set!", description: "Your captain will earn 2x points." });
  };

  const setViceCaptain = (playerId: string) => {
    if (captainId === playerId) return;
    setViceCaptainId(playerId);
    toast({ title: "Vice Captain Set!", description: "They'll be captain if your captain doesn't play." });
  };

  const activateChip = (chipId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please sign in to use chips.",
        variant: "destructive",
      });
      return;
    }

    const chip = chips.find(c => c.id === chipId);
    if (!chip || chip.used) return;

    // Deactivate other chips and activate this one
    setChips(chips.map(c => ({
      ...c,
      active: c.id === chipId ? !c.active : false
    })));

    const activeChip = chips.find(c => c.id === chipId);
    toast({
      title: activeChip?.active ? `${chip.name} Deactivated` : `${chip.name} Activated!`,
      description: activeChip?.active ? "Chip has been deactivated." : chip.description,
    });
  };

  const getPositionColor = (position: string) => {
    switch(position) {
      case "GK": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "DEF": return "bg-blue-500/20 text-blue-500 border-blue-500/50";
      case "MID": return "bg-green-500/20 text-green-500 border-green-500/50";
      case "FWD": return "bg-red-500/20 text-red-500 border-red-500/50";
      default: return "";
    }
  };

  const topScorers = [...allPlayers].sort((a, b) => b.points - a.points).slice(0, 5);
  const activeChip = chips.find(c => c.active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-slide-in">
            <Badge variant="secondary" className="mb-4 text-sm">
              <Star className="h-3 w-3 mr-1" /> Fantasy League
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Fantasy <span className="text-primary text-glow">Sports Club</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build your dream team with 85M budget, use strategic chips, and compete for glory!
            </p>
          </div>

          {/* Chips Section */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-bebas text-lg">Power Chips</h3>
                {activeChip && (
                  <Badge className="bg-primary/20 text-primary border-primary/50">
                    <Flame className="h-3 w-3 mr-1" /> {activeChip.name} Active
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {chips.map((chip) => (
                  <Button
                    key={chip.id}
                    variant={chip.active ? "default" : chip.used ? "ghost" : "outline"}
                    className={`h-auto py-3 flex flex-col items-center gap-1 ${
                      chip.used ? "opacity-50 cursor-not-allowed" : ""
                    } ${chip.active ? "ring-2 ring-primary" : ""}`}
                    onClick={() => activateChip(chip.id)}
                    disabled={chip.used}
                  >
                    {chip.used ? <Lock className="h-4 w-4" /> : chip.icon}
                    <span className="text-xs font-medium">{chip.name}</span>
                    {chip.used && <span className="text-xs opacity-70">Used</span>}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget & Points Bar */}
          <Card className="mb-8 gradient-dark">
            <CardContent className="py-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">{budget.toFixed(1)}M</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Budget Remaining</p>
                  <Progress value={(budget / 85) * 100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">{totalPoints}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">{selectedPlayers.length}/11</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Starting XI</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ArrowUpDown className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">{benchPlayers.length}/4</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bench</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">#42</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Your Squad */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Your Squad
                  </CardTitle>
                  <CardDescription>Formation: 4-4-2 | Click player badges to set Captain (C) or Vice Captain (V)</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Formation Display */}
                  <div className="bg-gradient-to-b from-green-900/50 to-green-800/50 rounded-lg p-4 mb-4 min-h-[300px] relative">
                    {/* Goalkeeper */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      {selectedPlayers.filter(p => p.position === "GK").map(p => (
                        <div key={p.id} className="text-center relative">
                          <div 
                            className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold mx-auto cursor-pointer hover:ring-2 hover:ring-white"
                            onClick={() => setCaptain(p.id)}
                            onContextMenu={(e) => { e.preventDefault(); setViceCaptain(p.id); }}
                          >
                            {p.name.substring(0, 2)}
                            {captainId === p.id && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />}
                            {viceCaptainId === p.id && <span className="absolute -top-1 -right-1 text-xs bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">V</span>}
                          </div>
                          <span className="text-xs">{p.name}</span>
                        </div>
                      ))}
                      {getPositionCount("GK") === 0 && (
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">GK</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Defenders */}
                    <div className="absolute bottom-16 left-0 right-0 flex justify-around">
                      {selectedPlayers.filter(p => p.position === "DEF").map(p => (
                        <div key={p.id} className="text-center relative">
                          <div 
                            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold cursor-pointer hover:ring-2 hover:ring-white"
                            onClick={() => setCaptain(p.id)}
                            onContextMenu={(e) => { e.preventDefault(); setViceCaptain(p.id); }}
                          >
                            {p.name.substring(0, 2)}
                            {captainId === p.id && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />}
                            {viceCaptainId === p.id && <span className="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-4 h-4 flex items-center justify-center">V</span>}
                          </div>
                          <span className="text-xs">{p.name}</span>
                        </div>
                      ))}
                      {Array(4 - getPositionCount("DEF")).fill(0).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">DEF</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Midfielders */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around">
                      {selectedPlayers.filter(p => p.position === "MID").map(p => (
                        <div key={p.id} className="text-center relative">
                          <div 
                            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold cursor-pointer hover:ring-2 hover:ring-white"
                            onClick={() => setCaptain(p.id)}
                            onContextMenu={(e) => { e.preventDefault(); setViceCaptain(p.id); }}
                          >
                            {p.name.substring(0, 2)}
                            {captainId === p.id && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />}
                            {viceCaptainId === p.id && <span className="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-4 h-4 flex items-center justify-center">V</span>}
                          </div>
                          <span className="text-xs">{p.name}</span>
                        </div>
                      ))}
                      {Array(4 - getPositionCount("MID")).fill(0).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">MID</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Forwards */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-8">
                      {selectedPlayers.filter(p => p.position === "FWD").map(p => (
                        <div key={p.id} className="text-center relative">
                          <div 
                            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold cursor-pointer hover:ring-2 hover:ring-white"
                            onClick={() => setCaptain(p.id)}
                            onContextMenu={(e) => { e.preventDefault(); setViceCaptain(p.id); }}
                          >
                            {p.name.substring(0, 2)}
                            {captainId === p.id && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />}
                            {viceCaptainId === p.id && <span className="absolute -top-1 -right-1 text-xs bg-primary rounded-full w-4 h-4 flex items-center justify-center">V</span>}
                          </div>
                          <span className="text-xs">{p.name}</span>
                        </div>
                      ))}
                      {Array(2 - getPositionCount("FWD")).fill(0).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">FWD</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bench Section */}
                  <div className="mb-4">
                    <h4 className="font-bebas text-sm mb-2 flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" /> Bench ({benchPlayers.length}/4)
                    </h4>
                    <div className="flex gap-2 justify-center bg-muted/50 rounded-lg p-3">
                      {benchPlayers.map(player => (
                        <div key={player.id} className="text-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                            player.position === "GK" ? "bg-yellow-500/50" :
                            player.position === "DEF" ? "bg-blue-500/50" :
                            player.position === "MID" ? "bg-green-500/50" :
                            "bg-red-500/50"
                          }`}>
                            {player.name.substring(0, 2)}
                          </div>
                          <span className="text-xs text-muted-foreground">{player.name}</span>
                        </div>
                      ))}
                      {Array(4 - benchPlayers.length).fill(0).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Players List */}
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    <h4 className="font-bebas text-sm">Starting XI</h4>
                    {selectedPlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                          <span className="text-sm font-medium">{player.name}</span>
                          {captainId === player.id && <Badge variant="secondary" className="text-xs">C</Badge>}
                          {viceCaptainId === player.id && <Badge variant="outline" className="text-xs">V</Badge>}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removePlayer(player)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {benchPlayers.length > 0 && (
                      <>
                        <h4 className="font-bebas text-sm mt-4">Bench</h4>
                        {benchPlayers.map(player => (
                          <div key={player.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg opacity-70">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getPositionColor(player.position)}>
                                {player.position}
                              </Badge>
                              <span className="text-sm font-medium">{player.name}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removePlayer(player, true)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </>
                    )}

                    {selectedPlayers.length === 0 && benchPlayers.length === 0 && (
                      <p className="text-center text-muted-foreground text-sm py-4">
                        Select players from the right panel
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Player Selection */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="all" className="font-bebas">All</TabsTrigger>
                  <TabsTrigger value="GK" className="font-bebas">GK</TabsTrigger>
                  <TabsTrigger value="DEF" className="font-bebas">DEF</TabsTrigger>
                  <TabsTrigger value="MID" className="font-bebas">MID</TabsTrigger>
                  <TabsTrigger value="FWD" className="font-bebas">FWD</TabsTrigger>
                </TabsList>

                {["all", "GK", "DEF", "MID", "FWD"].map(position => (
                  <TabsContent key={position} value={position}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-bebas flex items-center justify-between">
                          <span>Available Players</span>
                          {position !== "all" && (
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                XI: {getPositionCount(position)}/{getPositionLimit(position)}
                              </Badge>
                              <Badge variant="secondary">
                                Bench: {benchPlayers.filter(p => p.position === position).length}/{getBenchLimit(position)}
                              </Badge>
                            </div>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {players
                            .filter(p => position === "all" || p.position === position)
                            .sort((a, b) => b.points - a.points)
                            .map(player => (
                              <div 
                                key={player.id} 
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  player.selected 
                                    ? "bg-primary/10 border-primary" 
                                    : "bg-muted/50 border-transparent hover:bg-muted"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className={getPositionColor(player.position)}>
                                    {player.position}
                                  </Badge>
                                  <div>
                                    <p className="font-medium">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">{player.team}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <p className="text-sm font-bold text-primary">{player.points}</p>
                                    <p className="text-xs text-muted-foreground">PTS</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm font-bold">{player.form}</p>
                                    <p className="text-xs text-muted-foreground">Form</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm font-bold">{player.goals}</p>
                                    <p className="text-xs text-muted-foreground">Goals</p>
                                  </div>
                                  <div className="text-center min-w-[50px]">
                                    <p className="text-sm font-bold text-primary">{player.price}M</p>
                                    <p className="text-xs text-muted-foreground">Price</p>
                                  </div>
                                  {player.selected ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        const inBench = benchPlayers.find(p => p.id === player.id);
                                        removePlayer(player, !!inBench);
                                      }}
                                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                  ) : (
                                    <div className="flex gap-1">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => addPlayer(player, false)}
                                        disabled={!canAddPlayer(player, false)}
                                        className={canAddPlayer(player, false) ? "text-primary border-primary hover:bg-primary hover:text-primary-foreground" : ""}
                                        title="Add to Starting XI"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => addPlayer(player, true)}
                                        disabled={!canAddPlayer(player, true)}
                                        className="text-muted-foreground hover:text-foreground"
                                        title="Add to Bench"
                                      >
                                        <ArrowUpDown className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Top Fantasy Scorers */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Top Fantasy Scorers
                  </CardTitle>
                  <CardDescription>Players with the most fantasy points this season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topScorers.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0 ? "bg-yellow-500 text-background" :
                            index === 1 ? "bg-gray-400 text-background" :
                            index === 2 ? "bg-amber-700 text-background" :
                            "bg-muted-foreground/20"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.team} • {player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm font-bold">{player.goals}G / {player.assists}A</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bebas text-primary">{player.points}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="mt-8 gradient-dark">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    How Fantasy Sports Club Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Coins className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">85M Budget</h4>
                      <p className="text-sm text-muted-foreground">Build your 15-player squad wisely!</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Crown className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">Captain & Vice</h4>
                      <p className="text-sm text-muted-foreground">Captain earns 2x points!</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">Use Chips</h4>
                      <p className="text-sm text-muted-foreground">Strategic boosts for big weeks!</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">Compete & Win</h4>
                      <p className="text-sm text-muted-foreground">Climb the leaderboard!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Club;
