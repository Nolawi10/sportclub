import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Users, Calendar, Target } from "lucide-react";

const Club = () => {
  const footballTeam = [
    { name: "Marcus Johnson", position: "Forward", number: 10 },
    { name: "Sarah Williams", position: "Midfielder", number: 8 },
    { name: "David Chen", position: "Defender", number: 4 },
    { name: "Emma Davis", position: "Goalkeeper", number: 1 },
  ];

  const basketballTeam = [
    { name: "James Rodriguez", position: "Point Guard", number: 7 },
    { name: "Lisa Anderson", position: "Shooting Guard", number: 23 },
    { name: "Mike Thompson", position: "Center", number: 33 },
    { name: "Anna Martinez", position: "Power Forward", number: 11 },
  ];

  const upcomingFixtures = [
    { opponent: "Riverside Academy", date: "Feb 15, 2025", sport: "Football", venue: "Home" },
    { opponent: "Mountain View High", date: "Feb 20, 2025", sport: "Basketball", venue: "Away" },
    { opponent: "Central Sports Club", date: "Feb 28, 2025", sport: "Football", venue: "Home" },
  ];

  const achievements = [
    { year: "2024", title: "Regional Champions", sport: "Football" },
    { year: "2024", title: "State Semi-Finalists", sport: "Basketball" },
    { year: "2023", title: "Tournament Winners", sport: "Football" },
    { year: "2023", title: "Best Defense Award", sport: "Football" },
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
              Since our founding, Sports Club of SSC has been dedicated to excellence, teamwork, and the development of young athletes
            </p>
          </div>

          {/* Club Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Trophies Won</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">120+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">10</p>
                <p className="text-sm text-muted-foreground">Years Active</p>
              </CardContent>
            </Card>
            <Card className="hover-lift text-center">
              <CardContent className="pt-6">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bebas text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Team Rosters */}
          <Card className="mb-12 hover-lift">
            <CardHeader>
              <CardTitle className="text-3xl font-bebas">Team Rosters</CardTitle>
              <CardDescription>Meet our talented athletes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="football" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                  <TabsTrigger value="football" className="text-lg font-bebas">Football</TabsTrigger>
                  <TabsTrigger value="basketball" className="text-lg font-bebas">Basketball</TabsTrigger>
                </TabsList>

                <TabsContent value="football">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {footballTeam.map((player) => (
                      <div key={player.name} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <div>
                          <p className="font-bold text-lg">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                        <Badge variant="outline" className="text-2xl font-bebas px-4 py-2">
                          #{player.number}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="basketball">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {basketballTeam.map((player) => (
                      <div key={player.name} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <div>
                          <p className="font-bold text-lg">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.position}</p>
                        </div>
                        <Badge variant="outline" className="text-2xl font-bebas px-4 py-2">
                          #{player.number}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Fixtures */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl font-bebas">Upcoming Fixtures</CardTitle>
                <CardDescription>Mark your calendars for these exciting matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingFixtures.map((fixture, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-lg">{fixture.opponent}</p>
                        <Badge variant="secondary">{fixture.sport}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{fixture.date}</p>
                      <p className="text-sm">
                        <span className="text-primary font-semibold">{fixture.venue}</span>
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
