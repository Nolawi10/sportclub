import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Predictions = () => {
  const { toast } = useToast();
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const nominees = [
    { name: "Fiker Tilahun", class: "11A", votes: 245, percentage: 35 },
    { name: "Abreham Wogayehu", class: "11C", votes: 189, percentage: 27 },
    { name: "Nahom Feseha", class: "11A", votes: 168, percentage: 24 },
    { name: "Samson Fikre", class: "11C", votes: 98, percentage: 14 },
  ];

  const upcomingMatches = [
    { id: 1, home: "11A", away: "11C", date: "Feb 22, 2025", category: "Football Finals" },
    { id: 2, home: "12B", away: "10A", date: "Feb 28, 2025", category: "Basketball Tournament" },
    { id: 3, home: "9C", away: "11B", date: "Mar 5, 2025", category: "Volleyball Championship" },
  ];

  const handleVote = () => {
    if (!selectedPlayer) {
      toast({
        title: "Please select a player",
        description: "Choose your favorite player to vote.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Vote submitted!",
      description: `Your vote for ${selectedPlayer} has been recorded.`,
    });
    setSelectedPlayer("");
  };

  const handlePrediction = () => {
    if (!homeScore || !awayScore) {
      toast({
        title: "Please enter scores",
        description: "Enter both home and away scores to submit your prediction.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Prediction submitted!",
      description: `Your prediction of ${homeScore}-${awayScore} has been recorded.`,
    });
    setHomeScore("");
    setAwayScore("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Predictions & <span className="text-primary text-glow">Voting</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Predict match scores and vote for your favorite players
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Player of the Tournament Voting */}
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-primary" size={28} />
                  <CardTitle className="text-3xl font-bebas">Player of the Tournament</CardTitle>
                </div>
                <CardDescription>
                  Vote for the player who has demonstrated remarkable skill, dedication, and sportsmanship. 
                  Nominees were selected based on outstanding performances during both group stage and knockout stage, 
                  approved by each class captain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Current Standings:</h3>
                  {nominees.map((nominee) => (
                    <div key={nominee.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          {nominee.name} <span className="text-muted-foreground">({nominee.class})</span>
                        </span>
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
                      <div key={nominee.name} className="flex items-center space-x-2">
                        <RadioGroupItem value={nominee.name} id={nominee.name} />
                        <Label htmlFor={nominee.name} className="cursor-pointer">
                          {nominee.name} from {nominee.class}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button onClick={handleVote} className="w-full">
                    Submit Vote
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">🔍 Selection Criteria for Man of the Tournament:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Team Captains' Choice</strong> - based solely on observations</li>
                    <li>• <strong>Overall Performance</strong> - throughout the tournament</li>
                    <li>• <strong>Final Game Performance</strong> - significant weight given</li>
                    <li>• <strong>Expert Vote</strong> - final decision after last game</li>
                    <li>• <strong>Poll Value</strong> - results from this fan voting</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    All criteria have different percentages in determining the final Man of the Tournament
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Score Predictions */}
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-primary" size={28} />
                  <CardTitle className="text-3xl font-bebas">Score Predictions</CardTitle>
                </div>
                <CardDescription>
                  Predict the final scores for upcoming matches and compete with other fans!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4 border rounded-lg space-y-4">
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{match.category}</p>
                      <p className="text-xs text-muted-foreground">{match.date}</p>
                    </div>
                    
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                      <div>
                        <Label htmlFor={`home-${match.id}`} className="text-sm font-semibold">
                          {match.home}
                        </Label>
                        <Input
                          id={`home-${match.id}`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={homeScore}
                          onChange={(e) => setHomeScore(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <span className="text-2xl font-bebas text-muted-foreground pt-6">VS</span>
                      
                      <div>
                        <Label htmlFor={`away-${match.id}`} className="text-sm font-semibold">
                          {match.away}
                        </Label>
                        <Input
                          id={`away-${match.id}`}
                          type="number"
                          min="0"
                          placeholder="0"
                          value={awayScore}
                          onChange={(e) => setAwayScore(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button onClick={handlePrediction} variant="secondary" className="w-full">
                      Submit Prediction
                    </Button>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Top Predictors:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>🏆 1. Haileab (Top Scorer - 3 goals)</span>
                      <span className="text-primary font-semibold">156 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>2. Fiker Tilahun</span>
                      <span className="text-primary font-semibold">142 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3. Nahom Feseha</span>
                      <span className="text-primary font-semibold">138 points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predictions;
