import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Users, Calendar, Target } from "lucide-react";

const Club = () => {
  const footballLeague = [
    { name: "Riverside Academy", wins: 12, losses: 3, points: 36 },
    { name: "Mountain View High", wins: 10, losses: 5, points: 30 },
    { name: "Central Sports Club", wins: 9, losses: 6, points: 27 },
    { name: "East Side Warriors", wins: 7, losses: 8, points: 21 },
  ];

  const basketballLeague = [
    { name: "Thunder Squad", wins: 14, losses: 2, points: 42 },
    { name: "Phoenix Athletics", wins: 11, losses: 5, points: 33 },
    { name: "Hawks United", wins: 9, losses: 7, points: 27 },
    { name: "Eagles Elite", wins: 6, losses: 10, points: 18 },
  ];

  const upcomingEvents = [
    { name: "Football Championship Finals", date: "Feb 15, 2025", sport: "Football", venue: "Main Stadium" },
    { name: "Basketball League Semi-Finals", date: "Feb 20, 2025", sport: "Basketball", venue: "Sports Arena" },
    { name: "Regional Multi-Sport Tournament", date: "Feb 28, 2025", sport: "Multi-Sport", venue: "Athletic Complex" },
  ];

  const achievements = [
    { year: "2024", title: "Best Tournament Organization Award", sport: "Multi-Sport" },
    { year: "2024", title: "Record Participation - 2400+ Athletes", sport: "Regional" },
    { year: "2023", title: "Excellence in Sports Management", sport: "State Level" },
    { year: "2023", title: "Community Impact Award", sport: "Youth Sports" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-bebas text-foreground mb-4">
              Our <span className="text-primary text-glow">Club</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sports Club of SSC organizes premier sports tournaments and leagues, bringing together the best teams and athletes to compete at the highest level
            </p>
          </div>

          {/* Club Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">87+</p>
                <p className="text-sm text-muted-foreground">Tournaments Organized</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">2400+</p>
                <p className="text-sm text-muted-foreground">Registered Athletes</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">10</p>
                <p className="text-sm text-muted-foreground">Years Organizing</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">342</p>
                <p className="text-sm text-muted-foreground">Participating Teams</p>
              </CardContent>
            </Card>
          </div>

          {/* League Standings */}
          <Card className="mb-12 hover-lift">
            <CardHeader>
              <CardTitle className="text-3xl font-bebas">League Standings</CardTitle>
              <CardDescription>Current rankings in our organized leagues</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="football" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                  <TabsTrigger value="football" className="text-lg font-bebas">Football</TabsTrigger>
                  <TabsTrigger value="basketball" className="text-lg font-bebas">Basketball</TabsTrigger>
                </TabsList>

                <TabsContent value="football">
                  <div className="space-y-2">
                    {footballLeague.map((team, index) => (
                      <div key={team.name} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg font-bebas px-3 py-1">
                            #{index + 1}
                          </Badge>
                          <div>
                            <p className="font-bold text-lg">{team.name}</p>
                            <p className="text-sm text-muted-foreground">W: {team.wins} | L: {team.losses}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bebas text-primary">{team.points}</p>
                          <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="basketball">
                  <div className="space-y-2">
                    {basketballLeague.map((team, index) => (
                      <div key={team.name} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg font-bebas px-3 py-1">
                            #{index + 1}
                          </Badge>
                          <div>
                            <p className="font-bold text-lg">{team.name}</p>
                            <p className="text-sm text-muted-foreground">W: {team.wins} | L: {team.losses}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bebas text-primary">{team.points}</p>
                          <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl font-bebas">Upcoming Events</CardTitle>
                <CardDescription>Don't miss these exciting competitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-lg">{event.name}</p>
                        <Badge variant="secondary">{event.sport}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-sm">
                        <span className="text-primary font-semibold">Venue: {event.venue}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl font-bebas">Our Achievements</CardTitle>
                <CardDescription>A legacy of excellence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg flex items-start space-x-4">
                      <Trophy className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-lg">{achievement.title}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{achievement.year}</Badge>
                          <Badge variant="secondary">{achievement.sport}</Badge>
                        </div>
                      </div>
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
};

export default Club;
