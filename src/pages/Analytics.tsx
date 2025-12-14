import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Users, Target, ArrowLeft, Star, Vote } from "lucide-react";
import teamOfWeekImg from "@/assets/team-of-week.png";

interface Team {
  rank: number;
  name: string;
  played: number;
  goalDiff: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  recentForm: string[];
  players: { name: string; position: string; goals: number; assists: number }[];
  previousMatches: { opponent: string; result: string; score: string }[];
  upcomingFixtures: { opponent: string; date: string; competition: string }[];
}

const Analytics = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [votedPlayer, setVotedPlayer] = useState<string | null>(null);

  const leagueTable: Team[] = [
    { rank: 1, name: "11A", played: 2, goalDiff: 7, points: 6, wins: 2, draws: 0, losses: 0, goalsFor: 9, goalsAgainst: 2, recentForm: ["W", "W"], players: [{ name: "Haileab", position: "MID", goals: 4, assists: 1 }, { name: "Dawit", position: "FWD", goals: 2, assists: 0 }, { name: "Daniel", position: "MID", goals: 1, assists: 1 }, { name: "Aman", position: "MID", goals: 0, assists: 2 }, { name: "Yohanan", position: "DEF", goals: 0, assists: 0 }], previousMatches: [{ opponent: "10A", result: "W", score: "2-1" }, { opponent: "9B", result: "W", score: "4-0" }], upcomingFixtures: [{ opponent: "11C", date: "Feb 22", competition: "Finals" }] },
    { rank: 2, name: "12C", played: 1, goalDiff: 6, points: 3, wins: 1, draws: 0, losses: 0, goalsFor: 7, goalsAgainst: 1, recentForm: ["W"], players: [{ name: "Samson", position: "FWD", goals: 3, assists: 0 }, { name: "Abraham", position: "MID", goals: 1, assists: 2 }, { name: "Abdela", position: "FWD", goals: 2, assists: 0 }, { name: "Estifanos", position: "MID", goals: 0, assists: 1 }], previousMatches: [{ opponent: "10C", result: "W", score: "7-1" }], upcomingFixtures: [{ opponent: "12A", date: "Feb 25", competition: "Semifinals" }] },
    { rank: 2, name: "12B", played: 1, goalDiff: 6, points: 3, wins: 1, draws: 0, losses: 0, goalsFor: 6, goalsAgainst: 0, recentForm: ["W"], players: [{ name: "Elias", position: "FWD", goals: 3, assists: 0 }, { name: "Abel", position: "MID", goals: 1, assists: 3 }, { name: "Bemnet", position: "MID", goals: 1, assists: 1 }, { name: "Godolias", position: "FWD", goals: 1, assists: 0 }], previousMatches: [{ opponent: "9A", result: "W", score: "6-0" }], upcomingFixtures: [{ opponent: "11B", date: "Feb 24", competition: "Quarterfinals" }] },
    { rank: 4, name: "12A", played: 1, goalDiff: 2, points: 3, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 1, recentForm: ["W"], players: [{ name: "Fiker", position: "FWD", goals: 2, assists: 0 }, { name: "Nahom", position: "MID", goals: 1, assists: 1 }, { name: "Kidus", position: "MID", goals: 0, assists: 1 }, { name: "Yeabsira", position: "FWD", goals: 1, assists: 0 }], previousMatches: [{ opponent: "11C", result: "W", score: "3-1" }], upcomingFixtures: [{ opponent: "12C", date: "Feb 25", competition: "Semifinals" }] },
    { rank: 4, name: "11B", played: 1, goalDiff: 2, points: 3, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 1, recentForm: ["W"], players: [{ name: "Faruk", position: "MID", goals: 1, assists: 1 }, { name: "Samuel", position: "MID", goals: 1, assists: 1 }, { name: "Daniel", position: "FWD", goals: 1, assists: 0 }, { name: "Esayas", position: "FWD", goals: 1, assists: 0 }], previousMatches: [{ opponent: "10B", result: "W", score: "3-1" }], upcomingFixtures: [{ opponent: "12B", date: "Feb 24", competition: "Quarterfinals" }] },
    { rank: 6, name: "9B", played: 2, goalDiff: 1, points: 3, wins: 1, draws: 0, losses: 1, goalsFor: 4, goalsAgainst: 3, recentForm: ["W", "L"], players: [{ name: "Lewi", position: "FWD", goals: 2, assists: 1 }, { name: "Yared", position: "DEF", goals: 0, assists: 0 }, { name: "Naol", position: "MID", goals: 1, assists: 0 }], previousMatches: [{ opponent: "9C", result: "W", score: "2-1" }, { opponent: "11A", result: "L", score: "0-4" }], upcomingFixtures: [{ opponent: "10A", date: "Feb 26", competition: "Group Stage" }] },
    { rank: 7, name: "10B", played: 2, goalDiff: -1, points: 3, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, recentForm: ["W", "L"], players: [{ name: "Musse", position: "MID", goals: 3, assists: 0 }, { name: "Abenezer", position: "MID", goals: 1, assists: 3 }, { name: "Yeabsira", position: "FWD", goals: 1, assists: 0 }, { name: "Lincon", position: "FWD", goals: 0, assists: 1 }], previousMatches: [{ opponent: "9C", result: "W", score: "2-1" }, { opponent: "11B", result: "L", score: "1-3" }], upcomingFixtures: [{ opponent: "10C", date: "Feb 27", competition: "Group Stage" }] },
    { rank: 8, name: "11C", played: 1, goalDiff: 0, points: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, recentForm: ["D"], players: [{ name: "Nahom", position: "MID", goals: 1, assists: 0 }, { name: "Musse", position: "FWD", goals: 1, assists: 0 }, { name: "Kaleab", position: "GK", goals: 0, assists: 1 }], previousMatches: [{ opponent: "10A", result: "D", score: "1-1" }], upcomingFixtures: [{ opponent: "11A", date: "Feb 22", competition: "Finals" }] },
    { rank: 9, name: "9C", played: 2, goalDiff: -1, points: 1, wins: 0, draws: 1, losses: 1, goalsFor: 3, goalsAgainst: 4, recentForm: ["D", "L"], players: [{ name: "Dawit", position: "FWD", goals: 2, assists: 0 }, { name: "Reyan", position: "MID", goals: 1, assists: 1 }, { name: "Beamlak", position: "DEF", goals: 0, assists: 1 }], previousMatches: [{ opponent: "10B", result: "L", score: "1-2" }, { opponent: "9A", result: "D", score: "2-2" }], upcomingFixtures: [{ opponent: "9A", date: "Feb 28", competition: "Group Stage" }] },
    { rank: 10, name: "9A", played: 1, goalDiff: -6, points: 0, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 6, recentForm: ["L"], players: [{ name: "Yonathan", position: "MID", goals: 0, assists: 1 }], previousMatches: [{ opponent: "12B", result: "L", score: "0-6" }], upcomingFixtures: [{ opponent: "9C", date: "Feb 28", competition: "Group Stage" }] },
    { rank: 11, name: "10A", played: 2, goalDiff: -7, points: 0, wins: 0, draws: 0, losses: 2, goalsFor: 2, goalsAgainst: 9, recentForm: ["L", "L"], players: [{ name: "Girum", position: "FWD", goals: 1, assists: 0 }, { name: "Yonathan", position: "MID", goals: 0, assists: 1 }, { name: "Kaleab", position: "GK", goals: 0, assists: 0 }], previousMatches: [{ opponent: "11A", result: "L", score: "1-2" }, { opponent: "12C", result: "L", score: "1-7" }], upcomingFixtures: [{ opponent: "9B", date: "Feb 26", competition: "Group Stage" }] },
    { rank: 12, name: "10C", played: 2, goalDiff: -9, points: 0, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 10, recentForm: ["L", "L"], players: [], previousMatches: [{ opponent: "12C", result: "L", score: "1-7" }, { opponent: "11B", result: "L", score: "0-3" }], upcomingFixtures: [{ opponent: "10B", date: "Feb 27", competition: "Group Stage" }] },
  ];

  const topScorers = [
    { rank: 1, name: "Haileab", team: "11A", goals: 4 },
    { rank: 2, name: "Samson", team: "12C", goals: 3 },
    { rank: 3, name: "Elias", team: "12B", goals: 3 },
    { rank: 4, name: "Musse", team: "10B", goals: 3 },
    { rank: 5, name: "Dawit", team: "11A", goals: 2 },
    { rank: 6, name: "Dawit", team: "9C", goals: 2 },
    { rank: 7, name: "Fiker", team: "12A", goals: 2 },
    { rank: 8, name: "Abdela", team: "12C", goals: 2 },
    { rank: 9, name: "Lewi", team: "9B", goals: 2 },
    { rank: 10, name: "Nahom", team: "11C", goals: 1 },
  ];

  const topAssistors = [
    { rank: 1, name: "Abel", team: "12B", assists: 3 },
    { rank: 2, name: "Abenezer", team: "10B", assists: 3 },
    { rank: 3, name: "Aman", team: "11A", assists: 2 },
    { rank: 4, name: "Abraham", team: "12C", assists: 2 },
    { rank: 5, name: "Reyan", team: "9C", assists: 1 },
    { rank: 6, name: "Nahom", team: "12A", assists: 1 },
    { rank: 7, name: "Kidus", team: "12A", assists: 1 },
    { rank: 8, name: "Bemnet", team: "12B", assists: 1 },
    { rank: 9, name: "Estifanos", team: "12C", assists: 1 },
    { rank: 10, name: "Faruk", team: "11B", assists: 1 },
  ];

  const teamOfTheWeek = {
    starters: [
      { position: "GK", name: "Kaleab", team: "10A", number: 1 },
      { position: "CB", name: "Yohanan", team: "11A", number: 3 },
      { position: "CB", name: "Yared", team: "9B", number: 4 },
      { position: "LM", name: "Reyan", team: "9C", number: 8 },
      { position: "CM", name: "Mussie", team: "10B", number: 6 },
      { position: "RM", name: "Haileab", team: "11A", number: 7 },
      { position: "ST", name: "Lewi", team: "9B", number: 9 },
    ],
    subs: [
      { position: "ST", name: "Girum", team: "10A" },
      { position: "CAM", name: "Naol", team: "9B" },
      { position: "CB", name: "Biruk", team: "11A" },
      { position: "GK", name: "Bamlak", team: "9C" },
    ]
  };

  const playerOfWeekVotes = [
    { name: "Mussie", team: "10B", votes: 45 },
    { name: "Haileab", team: "11A", votes: 38 },
    { name: "Lewi", team: "9B", votes: 25 },
    { name: "Kaleab", team: "10A", votes: 18 },
  ];

  const handleVote = (playerName: string) => {
    setVotedPlayer(playerName);
  };

  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => setSelectedTeam(null)} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table
            </Button>

            <div className="text-center mb-12 animate-slide-in">
              <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
                {selectedTeam.name} <span className="text-primary text-glow">Stats</span>
              </h1>
              <div className="flex justify-center gap-4 text-muted-foreground">
                <span>Rank: #{selectedTeam.rank}</span>
                <span>•</span>
                <span>{selectedTeam.points} Points</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bebas text-primary">{selectedTeam.wins}</p>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bebas text-muted-foreground">{selectedTeam.draws}</p>
                  <p className="text-sm text-muted-foreground">Draws</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bebas text-destructive">{selectedTeam.losses}</p>
                  <p className="text-sm text-muted-foreground">Losses</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bebas text-foreground">{selectedTeam.goalsFor} - {selectedTeam.goalsAgainst}</p>
                  <p className="text-sm text-muted-foreground">Goals (F-A)</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Squad */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Squad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedTeam.players.map((player, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-primary">{player.goals} G</span>
                          <span className="text-muted-foreground">{player.assists} A</span>
                        </div>
                      </div>
                    ))}
                    {selectedTeam.players.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No player data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Form */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl font-bebas">Recent Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6">
                    {selectedTeam.recentForm.map((result, idx) => (
                      <Badge 
                        key={idx} 
                        className={`text-lg px-4 py-2 ${
                          result === "W" ? "bg-green-500" : 
                          result === "D" ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      >
                        {result}
                      </Badge>
                    ))}
                  </div>

                  <h4 className="font-bebas text-lg mb-3">Previous Matches</h4>
                  <div className="space-y-2 mb-6">
                    {selectedTeam.previousMatches.map((match, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>vs {match.opponent}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{match.score}</span>
                          <Badge className={match.result === "W" ? "bg-green-500" : match.result === "D" ? "bg-yellow-500" : "bg-red-500"}>
                            {match.result}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bebas text-lg mb-3">Upcoming Fixtures</h4>
                  <div className="space-y-2">
                    {selectedTeam.upcomingFixtures.map((fixture, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                        <div>
                          <p className="font-semibold">vs {fixture.opponent}</p>
                          <p className="text-xs text-muted-foreground">{fixture.competition}</p>
                        </div>
                        <Badge variant="outline">{fixture.date}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Match <span className="text-primary text-glow">Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Week 3 Standings, Stats & Team of the Week
            </p>
          </div>

          <Tabs defaultValue="standings" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="standings" className="font-bebas">Standings</TabsTrigger>
              <TabsTrigger value="scorers" className="font-bebas">Top Scorers</TabsTrigger>
              <TabsTrigger value="assists" className="font-bebas">Top Assists</TabsTrigger>
              <TabsTrigger value="totw" className="font-bebas">Team of Week</TabsTrigger>
            </TabsList>

            <TabsContent value="standings">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-3xl font-bebas flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" /> Week 3 Standings
                  </CardTitle>
                  <CardDescription>Click on a team to view detailed stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-bebas text-lg">Rank</th>
                          <th className="text-left py-3 px-2 font-bebas text-lg">Team</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">P</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">W</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">D</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">L</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">GD</th>
                          <th className="text-center py-3 px-2 font-bebas text-lg">PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leagueTable.map((team, index) => (
                          <tr 
                            key={team.name} 
                            className={`border-b border-border hover:bg-primary/10 cursor-pointer transition-colors ${index < 4 ? 'bg-primary/5' : ''}`}
                            onClick={() => setSelectedTeam(team)}
                          >
                            <td className="py-4 px-2">
                              <span className={`font-bold ${index === 0 ? 'text-primary' : ''}`}>{team.rank}</span>
                            </td>
                            <td className="py-4 px-2">
                              <span className="font-semibold text-foreground hover:text-primary transition-colors">{team.name}</span>
                            </td>
                            <td className="py-4 px-2 text-center text-muted-foreground">{team.played}</td>
                            <td className="py-4 px-2 text-center text-green-500">{team.wins}</td>
                            <td className="py-4 px-2 text-center text-muted-foreground">{team.draws}</td>
                            <td className="py-4 px-2 text-center text-red-500">{team.losses}</td>
                            <td className="py-4 px-2 text-center">
                              <span className={team.goalDiff > 0 ? 'text-green-500' : team.goalDiff < 0 ? 'text-red-500' : 'text-muted-foreground'}>
                                {team.goalDiff > 0 ? '+' : ''}{team.goalDiff}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className="text-xl font-bold text-primary">{team.points}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scorers">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-3xl font-bebas flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" /> Top Goal Scorers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topScorers.map((scorer, index) => (
                      <div 
                        key={`${scorer.name}-${scorer.team}-${index}`} 
                        className={`flex justify-between items-center p-4 rounded-lg transition-colors ${index === 0 ? 'bg-primary/20 border border-primary' : 'bg-muted hover:bg-muted/80'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-bebas text-2xl ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                            {scorer.rank}
                          </span>
                          <div>
                            <p className="font-semibold text-lg">{scorer.name}</p>
                            <p className="text-sm text-muted-foreground">{scorer.team}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bebas text-primary">{scorer.goals}</p>
                          <p className="text-xs text-muted-foreground">Goals</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assists">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-3xl font-bebas flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" /> Top Assistors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topAssistors.map((player, index) => (
                      <div 
                        key={`${player.name}-${player.team}-${index}`} 
                        className={`flex justify-between items-center p-4 rounded-lg transition-colors ${index === 0 ? 'bg-primary/20 border border-primary' : 'bg-muted hover:bg-muted/80'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-bebas text-2xl ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                            {player.rank}
                          </span>
                          <div>
                            <p className="font-semibold text-lg">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.team}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bebas text-primary">{player.assists}</p>
                          <p className="text-xs text-muted-foreground">Assists</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="totw">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Team of the Week Visual */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bebas flex items-center gap-2">
                      <Star className="h-6 w-6 text-primary" /> Team of the Week 3
                    </CardTitle>
                    <CardDescription>Formation: 2-3-1</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={teamOfWeekImg} alt="Team of the Week" className="w-full rounded-lg" />
                    
                    <div className="mt-6">
                      <h4 className="font-bebas text-lg mb-3">Substitutes</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {teamOfTheWeek.subs.map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <Badge variant="outline">{sub.position}</Badge>
                            <span className="text-sm">{sub.name}</span>
                            <span className="text-xs text-muted-foreground">({sub.team})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vote for Player of the Week */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bebas flex items-center gap-2">
                      <Vote className="h-6 w-6 text-primary" /> Vote Player of the Week
                    </CardTitle>
                    <CardDescription>
                      Cast your vote for the best performer this week!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {playerOfWeekVotes.map((player) => {
                        const totalVotes = playerOfWeekVotes.reduce((sum, p) => sum + p.votes, 0);
                        const percentage = Math.round((player.votes / totalVotes) * 100);
                        
                        return (
                          <div key={player.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{player.name}</span>
                                <Badge variant="outline">{player.team}</Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">{percentage}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <Button 
                              size="sm" 
                              variant={votedPlayer === player.name ? "default" : "outline"}
                              className="w-full"
                              onClick={() => handleVote(player.name)}
                              disabled={votedPlayer !== null}
                            >
                              {votedPlayer === player.name ? "Voted!" : "Vote"}
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-sm text-center">
                        <span className="font-bebas text-lg text-primary">Mussie (10B)</span> is currently leading with outstanding performances this week!
                      </p>
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

export default Analytics;
