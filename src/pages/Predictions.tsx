import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Target, Star, TrendingUp, Award, Users, Zap, Calendar, Medal, Crown, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Predictions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [predictions, setPredictions] = useState<Record<number, { home: string; away: string }>>({});
  const [selectedPlayerOfWeek, setSelectedPlayerOfWeek] = useState("");
  const [selectedTeamOfWeek, setSelectedTeamOfWeek] = useState("");

  const nominees = [
    { name: "Fiker Tilahun", class: "11A", votes: 245, percentage: 35, goals: 8, assists: 3 },
    { name: "Abreham Wogayehu", class: "11C", votes: 189, percentage: 27, goals: 6, assists: 5 },
    { name: "Nahom Feseha", class: "11A", votes: 168, percentage: 24, goals: 5, assists: 4 },
    { name: "Samson Fikre", class: "11C", votes: 98, percentage: 14, goals: 4, assists: 2 },
  ];

  const playerOfWeekNominees = [
    { name: "Mussie", class: "10B", votes: 156, percentage: 42, lastWeekPerformance: "2 goals, 1 assist" },
    { name: "Haileab", class: "11A", votes: 98, percentage: 26, lastWeekPerformance: "Hat-trick" },
    { name: "Lewi", class: "10B", votes: 72, percentage: 19, lastWeekPerformance: "2 goals" },
    { name: "Reyan", class: "11A", votes: 48, percentage: 13, lastWeekPerformance: "3 assists" },
  ];

  const teamOfWeekNominees = [
    { name: "11A", votes: 189, percentage: 45 },
    { name: "10B", votes: 142, percentage: 34 },
    { name: "12A", votes: 89, percentage: 21 },
  ];

  const upcomingMatches = [
    { id: 1, home: "11A", away: "11C", date: "Feb 22, 2025", time: "3:00 PM", category: "Football Finals", importance: "high" },
    { id: 2, home: "12B", away: "10A", date: "Feb 28, 2025", time: "2:00 PM", category: "Basketball Semi-Finals", importance: "medium" },
    { id: 3, home: "9C", away: "11B", date: "Mar 5, 2025", time: "4:00 PM", category: "Volleyball Quarter-Finals", importance: "medium" },
    { id: 4, home: "10A", away: "10B", date: "Mar 8, 2025", time: "3:30 PM", category: "Football Group Stage", importance: "low" },
    { id: 5, home: "12A", away: "9A", date: "Mar 12, 2025", time: "2:30 PM", category: "Chess Tournament", importance: "low" },
  ];

  const topPredictors = [
    { rank: 1, name: "Haileab", points: 256, accuracy: "78%", streak: 5 },
    { rank: 2, name: "Fiker Tilahun", points: 242, accuracy: "75%", streak: 3 },
    { rank: 3, name: "Nahom Feseha", points: 238, accuracy: "72%", streak: 4 },
    { rank: 4, name: "Mussie", points: 221, accuracy: "70%", streak: 2 },
    { rank: 5, name: "Reyan", points: 215, accuracy: "68%", streak: 1 },
  ];

  const myPredictionHistory = [
    { match: "11A vs 10A", prediction: "2-1", actual: "2-1", points: 10, correct: true },
    { match: "10B vs 9C", prediction: "2-0", actual: "2-1", points: 3, correct: false },
    { match: "12A vs 11B", prediction: "1-1", actual: "1-1", points: 10, correct: true },
  ];

  const handleVote = (type: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please sign in to vote.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    let playerName = "";
    if (type === "tournament" && selectedPlayer) {
      playerName = selectedPlayer;
    } else if (type === "week" && selectedPlayerOfWeek) {
      playerName = selectedPlayerOfWeek;
    } else if (type === "team" && selectedTeamOfWeek) {
      playerName = selectedTeamOfWeek;
    } else {
      toast({
        title: "Please select an option",
        description: "Choose your selection to vote.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vote submitted!",
      description: `Your vote for ${playerName} has been recorded.`,
    });
  };

  const handlePrediction = (matchId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please sign in to make predictions.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const prediction = predictions[matchId];
    if (!prediction?.home || !prediction?.away) {
      toast({
        title: "Please enter scores",
        description: "Enter both home and away scores to submit your prediction.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Prediction submitted!",
      description: `Your prediction of ${prediction.home}-${prediction.away} has been recorded.`,
    });
  };

  const updatePrediction = (matchId: number, team: 'home' | 'away', value: string) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: value
      }
    }));
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case "high": return "bg-red-500/20 text-red-500 border-red-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      default: return "bg-green-500/20 text-green-500 border-green-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <Badge variant="secondary" className="mb-4">
              <Flame className="h-3 w-3 mr-1" /> Live Voting
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Predictions & <span className="text-primary text-glow">Voting</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Predict match scores, vote for your favorite players, and compete for the top predictor spot!
            </p>
          </div>

          {/* Quick Stats Bar */}
          {isAuthenticated && (
            <Card className="mb-8 gradient-dark">
              <CardContent className="py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bebas text-primary">42</p>
                    <p className="text-xs text-muted-foreground">Your Rank</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bebas text-primary">156</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bebas text-primary">68%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bebas text-primary">3</p>
                    <p className="text-xs text-muted-foreground">Win Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="predictions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="predictions" className="font-bebas">
                <Target className="h-4 w-4 mr-2" /> Predictions
              </TabsTrigger>
              <TabsTrigger value="tournament" className="font-bebas">
                <Trophy className="h-4 w-4 mr-2" /> Tournament MVP
              </TabsTrigger>
              <TabsTrigger value="weekly" className="font-bebas">
                <Star className="h-4 w-4 mr-2" /> Weekly Awards
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="font-bebas">
                <Crown className="h-4 w-4 mr-2" /> Leaderboard
              </TabsTrigger>
            </TabsList>

            {/* Score Predictions */}
            <TabsContent value="predictions">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bebas flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    Upcoming Matches
                  </h2>
                  {upcomingMatches.map((match) => (
                    <Card key={match.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className={getImportanceColor(match.importance)}>
                            {match.category}
                          </Badge>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{match.date}</p>
                            <p className="text-xs text-primary font-semibold">{match.time}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                          <div className="text-center">
                            <p className="text-2xl font-bebas mb-2">{match.home}</p>
                            <Input
                              type="number"
                              min="0"
                              max="99"
                              placeholder="0"
                              value={predictions[match.id]?.home || ""}
                              onChange={(e) => updatePrediction(match.id, 'home', e.target.value)}
                              className="text-center text-xl font-bold h-12"
                            />
                          </div>
                          
                          <div className="text-center">
                            <span className="text-3xl font-bebas text-muted-foreground">VS</span>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bebas mb-2">{match.away}</p>
                            <Input
                              type="number"
                              min="0"
                              max="99"
                              placeholder="0"
                              value={predictions[match.id]?.away || ""}
                              onChange={(e) => updatePrediction(match.id, 'away', e.target.value)}
                              className="text-center text-xl font-bold h-12"
                            />
                          </div>
                        </div>

                        <Button 
                          onClick={() => handlePrediction(match.id)} 
                          className="w-full mt-4"
                          variant={match.importance === "high" ? "default" : "secondary"}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Submit Prediction
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* My Prediction History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bebas flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Your Recent Predictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {myPredictionHistory.map((pred, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            pred.correct ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
                          }`}
                        >
                          <div>
                            <p className="font-medium text-sm">{pred.match}</p>
                            <p className="text-xs text-muted-foreground">
                              Predicted: {pred.prediction} | Actual: {pred.actual}
                            </p>
                          </div>
                          <Badge variant={pred.correct ? "default" : "destructive"}>
                            +{pred.points}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Scoring System */}
                  <Card className="gradient-dark">
                    <CardHeader>
                      <CardTitle className="font-bebas">Scoring System</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Exact Score</span>
                        <span className="text-primary font-bold">+10 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct Result</span>
                        <span className="text-primary font-bold">+5 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct Goal Difference</span>
                        <span className="text-primary font-bold">+3 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span>One Team's Score</span>
                        <span className="text-primary font-bold">+1 pt</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tournament MVP Voting */}
            <TabsContent value="tournament">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-primary" size={28} />
                    <CardTitle className="text-3xl font-bebas">Player of the Tournament</CardTitle>
                  </div>
                  <CardDescription>
                    Vote for the player who has demonstrated remarkable skill, dedication, and sportsmanship 
                    throughout the entire tournament.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Current Standings:</h3>
                    {nominees.map((nominee, index) => (
                      <div key={nominee.name} className="space-y-2 p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
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
                              <span className="font-medium">{nominee.name}</span>
                              <span className="text-muted-foreground ml-2">({nominee.class})</span>
                              <p className="text-xs text-muted-foreground">{nominee.goals}G / {nominee.assists}A</p>
                            </div>
                          </div>
                          <span className="text-primary font-semibold">{nominee.percentage}%</span>
                        </div>
                        <Progress value={nominee.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">{nominee.votes} votes</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <Label className="text-base font-semibold">Cast Your Vote:</Label>
                    <RadioGroup value={selectedPlayer} onValueChange={setSelectedPlayer}>
                      {nominees.map((nominee) => (
                        <div key={nominee.name} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg">
                          <RadioGroupItem value={nominee.name} id={`tournament-${nominee.name}`} />
                          <Label htmlFor={`tournament-${nominee.name}`} className="cursor-pointer flex-1">
                            {nominee.name} from {nominee.class}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button onClick={() => handleVote("tournament")} className="w-full">
                      <Medal className="h-4 w-4 mr-2" />
                      Submit Vote
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">🔍 Selection Criteria:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Team Captains' Choice</strong> - based solely on observations</li>
                      <li>• <strong>Overall Performance</strong> - throughout the tournament</li>
                      <li>• <strong>Final Game Performance</strong> - significant weight given</li>
                      <li>• <strong>Expert Vote</strong> - final decision after last game</li>
                      <li>• <strong>Fan Poll</strong> - results from this voting (20%)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Weekly Awards */}
            <TabsContent value="weekly">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Player of the Week */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="text-primary" size={28} />
                      <CardTitle className="text-2xl font-bebas">Player of the Week</CardTitle>
                    </div>
                    <CardDescription>
                      Vote for the standout performer this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {playerOfWeekNominees.map((nominee, index) => (
                      <div key={nominee.name} className="p-3 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              index === 0 ? "bg-yellow-500 text-background" : "bg-muted-foreground/20"
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{nominee.name} ({nominee.class})</p>
                              <p className="text-xs text-muted-foreground">{nominee.lastWeekPerformance}</p>
                            </div>
                          </div>
                          <span className="text-primary font-semibold">{nominee.percentage}%</span>
                        </div>
                        <Progress value={nominee.percentage} className="h-2" />
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t space-y-4">
                      <RadioGroup value={selectedPlayerOfWeek} onValueChange={setSelectedPlayerOfWeek}>
                        {playerOfWeekNominees.map((nominee) => (
                          <div key={nominee.name} className="flex items-center space-x-2">
                            <RadioGroupItem value={nominee.name} id={`week-${nominee.name}`} />
                            <Label htmlFor={`week-${nominee.name}`} className="cursor-pointer">
                              {nominee.name} ({nominee.class})
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <Button onClick={() => handleVote("week")} className="w-full" variant="secondary">
                        Vote Player of the Week
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Team of the Week */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-primary" size={28} />
                      <CardTitle className="text-2xl font-bebas">Team of the Week</CardTitle>
                    </div>
                    <CardDescription>
                      Which team impressed you the most?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamOfWeekNominees.map((team, index) => (
                      <div key={team.name} className="p-3 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bebas text-lg ${
                              index === 0 ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
                            }`}>
                              {team.name}
                            </div>
                            <div>
                              <p className="font-medium">Class {team.name}</p>
                              <p className="text-xs text-muted-foreground">{team.votes} votes</p>
                            </div>
                          </div>
                          <span className="text-primary font-semibold">{team.percentage}%</span>
                        </div>
                        <Progress value={team.percentage} className="h-2" />
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t space-y-4">
                      <RadioGroup value={selectedTeamOfWeek} onValueChange={setSelectedTeamOfWeek}>
                        {teamOfWeekNominees.map((team) => (
                          <div key={team.name} className="flex items-center space-x-2">
                            <RadioGroupItem value={team.name} id={`team-${team.name}`} />
                            <Label htmlFor={`team-${team.name}`} className="cursor-pointer">
                              Class {team.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <Button onClick={() => handleVote("team")} className="w-full" variant="secondary">
                        Vote Team of the Week
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="text-primary" size={28} />
                    <CardTitle className="text-3xl font-bebas">Top Predictors</CardTitle>
                  </div>
                  <CardDescription>
                    The most accurate prediction masters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPredictors.map((predictor) => (
                      <div 
                        key={predictor.rank} 
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          predictor.rank === 1 ? "bg-yellow-500/10 border border-yellow-500/30" :
                          predictor.rank === 2 ? "bg-gray-400/10 border border-gray-400/30" :
                          predictor.rank === 3 ? "bg-amber-700/10 border border-amber-700/30" :
                          "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            predictor.rank === 1 ? "bg-yellow-500 text-background" :
                            predictor.rank === 2 ? "bg-gray-400 text-background" :
                            predictor.rank === 3 ? "bg-amber-700 text-background" :
                            "bg-muted-foreground/20"
                          }`}>
                            {predictor.rank}
                          </div>
                          <div>
                            <p className="font-medium">{predictor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Accuracy: {predictor.accuracy} • 🔥 {predictor.streak} streak
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bebas text-primary">{predictor.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isAuthenticated && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                            42
                          </div>
                          <div>
                            <p className="font-medium">{user?.name} (You)</p>
                            <p className="text-xs text-muted-foreground">Accuracy: 68% • 🔥 3 streak</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bebas text-primary">156</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    </div>
                  )}
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

export default Predictions;
