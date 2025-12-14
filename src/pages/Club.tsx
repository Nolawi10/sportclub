import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Users, Coins, Plus, Minus, Star, TrendingUp, Zap, Target, Shield, Award } from "lucide-react";

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
}

const Club = () => {
  const [budget, setBudget] = useState(100);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const allPlayers: Player[] = [
    // Goalkeepers
    { id: "gk1", name: "Kaleab", team: "11A", position: "GK", price: 5.5, points: 42, form: 7.2, goals: 0, assists: 0, cleanSheets: 4, selected: false },
    { id: "gk2", name: "Bamlak", team: "10B", position: "GK", price: 4.5, points: 35, form: 6.1, goals: 0, assists: 0, cleanSheets: 3, selected: false },
    { id: "gk3", name: "Tewodros", team: "12A", position: "GK", price: 5.0, points: 38, form: 6.5, goals: 0, assists: 0, cleanSheets: 3, selected: false },
    { id: "gk4", name: "Henok", team: "9A", position: "GK", price: 4.0, points: 28, form: 5.8, goals: 0, assists: 0, cleanSheets: 2, selected: false },
    
    // Defenders
    { id: "def1", name: "Yohanan", team: "11A", position: "DEF", price: 6.0, points: 48, form: 7.5, goals: 2, assists: 1, cleanSheets: 4, selected: false },
    { id: "def2", name: "Yared", team: "10B", position: "DEF", price: 5.5, points: 44, form: 7.0, goals: 1, assists: 2, cleanSheets: 3, selected: false },
    { id: "def3", name: "Biruk", team: "12A", position: "DEF", price: 5.0, points: 36, form: 6.2, goals: 0, assists: 1, cleanSheets: 3, selected: false },
    { id: "def4", name: "Dawit", team: "11B", position: "DEF", price: 4.5, points: 32, form: 5.9, goals: 1, assists: 0, cleanSheets: 2, selected: false },
    { id: "def5", name: "Eyob", team: "10A", position: "DEF", price: 5.0, points: 35, form: 6.0, goals: 0, assists: 2, cleanSheets: 3, selected: false },
    { id: "def6", name: "Solomon", team: "9B", position: "DEF", price: 4.0, points: 25, form: 5.5, goals: 0, assists: 0, cleanSheets: 2, selected: false },
    
    // Midfielders
    { id: "mid1", name: "Mussie", team: "10B", position: "MID", price: 9.5, points: 78, form: 9.2, goals: 5, assists: 8, selected: false },
    { id: "mid2", name: "Reyan", team: "11A", position: "MID", price: 8.5, points: 65, form: 8.1, goals: 3, assists: 6, selected: false },
    { id: "mid3", name: "Naol", team: "10A", position: "MID", price: 7.5, points: 52, form: 7.3, goals: 4, assists: 3, selected: false },
    { id: "mid4", name: "Bereket", team: "12A", position: "MID", price: 7.0, points: 48, form: 6.8, goals: 2, assists: 4, selected: false },
    { id: "mid5", name: "Yonas", team: "11B", position: "MID", price: 6.5, points: 42, form: 6.5, goals: 3, assists: 2, selected: false },
    { id: "mid6", name: "Mikias", team: "9A", position: "MID", price: 5.5, points: 35, form: 6.0, goals: 2, assists: 2, selected: false },
    { id: "mid7", name: "Nahom", team: "10C", position: "MID", price: 6.0, points: 40, form: 6.3, goals: 2, assists: 3, selected: false },
    
    // Forwards
    { id: "fwd1", name: "Haileab", team: "11A", position: "FWD", price: 10.5, points: 85, form: 9.5, goals: 12, assists: 4, selected: false },
    { id: "fwd2", name: "Lewi", team: "10B", position: "FWD", price: 9.0, points: 72, form: 8.5, goals: 9, assists: 3, selected: false },
    { id: "fwd3", name: "Girum", team: "12A", position: "FWD", price: 8.0, points: 58, form: 7.6, goals: 7, assists: 2, selected: false },
    { id: "fwd4", name: "Fiker Tilahun", team: "11A", position: "FWD", price: 8.5, points: 62, form: 7.8, goals: 8, assists: 3, selected: false },
    { id: "fwd5", name: "Abreham", team: "10A", position: "FWD", price: 7.0, points: 48, form: 6.9, goals: 6, assists: 2, selected: false },
    { id: "fwd6", name: "Samson", team: "9B", position: "FWD", price: 5.5, points: 32, form: 5.8, goals: 4, assists: 1, selected: false },
  ];

  const [players, setPlayers] = useState(allPlayers);

  const getPositionCount = (position: string) => {
    return selectedPlayers.filter(p => p.position === position).length;
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

  const canAddPlayer = (player: Player) => {
    if (player.selected) return false;
    if (selectedPlayers.length >= 11) return false;
    if (budget < player.price) return false;
    if (getPositionCount(player.position) >= getPositionLimit(player.position)) return false;
    return true;
  };

  const addPlayer = (player: Player) => {
    if (!canAddPlayer(player)) return;
    
    const updatedPlayers = players.map(p => 
      p.id === player.id ? { ...p, selected: true } : p
    );
    setPlayers(updatedPlayers);
    setSelectedPlayers([...selectedPlayers, { ...player, selected: true }]);
    setBudget(prev => prev - player.price);
    setTotalPoints(prev => prev + player.points);
  };

  const removePlayer = (player: Player) => {
    const updatedPlayers = players.map(p => 
      p.id === player.id ? { ...p, selected: false } : p
    );
    setPlayers(updatedPlayers);
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    setBudget(prev => prev + player.price);
    setTotalPoints(prev => prev - player.points);
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
              Build your dream team, earn points based on real performances, and compete with classmates!
            </p>
          </div>

          {/* Budget & Points Bar */}
          <Card className="mb-8 gradient-dark">
            <CardContent className="py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bebas text-primary">{budget.toFixed(1)}M</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Budget Remaining</p>
                  <Progress value={budget} className="mt-2" />
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
                  <p className="text-sm text-muted-foreground">Players Selected</p>
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
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Your Squad
                  </CardTitle>
                  <CardDescription>Formation: 4-4-2</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Formation Display */}
                  <div className="bg-gradient-to-b from-green-900/50 to-green-800/50 rounded-lg p-4 mb-4 min-h-[300px] relative">
                    {/* Goalkeeper */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      {selectedPlayers.filter(p => p.position === "GK").map(p => (
                        <div key={p.id} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold mx-auto">
                            {p.name.substring(0, 2)}
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
                        <div key={p.id} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                            {p.name.substring(0, 2)}
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
                        <div key={p.id} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                            {p.name.substring(0, 2)}
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
                        <div key={p.id} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                            {p.name.substring(0, 2)}
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

                  {/* Selected Players List */}
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedPlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                          <span className="text-sm font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
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
                    {selectedPlayers.length === 0 && (
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
                            <Badge variant="outline">
                              {getPositionCount(position)}/{getPositionLimit(position)} Selected
                            </Badge>
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
                                      onClick={() => removePlayer(player)}
                                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                  ) : (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => addPlayer(player)}
                                      disabled={!canAddPlayer(player)}
                                      className={canAddPlayer(player) ? "text-primary border-primary hover:bg-primary hover:text-primary-foreground" : ""}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
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
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Coins className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">100M Budget</h4>
                      <p className="text-sm text-muted-foreground">Build your dream team with a 100M budget. Choose wisely!</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">Earn Points</h4>
                      <p className="text-sm text-muted-foreground">Players earn points based on real match performances.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-bebas text-lg mb-2">Compete & Win</h4>
                      <p className="text-sm text-muted-foreground">Compete with classmates and climb the leaderboard!</p>
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
