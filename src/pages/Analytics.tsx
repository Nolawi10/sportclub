import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Analytics = () => {
  const matchStats = [
    { name: "Goals", value: 42 },
    { name: "Assists", value: 38 },
    { name: "Shots", value: 156 },
    { name: "Saves", value: 89 },
  ];

  const possessionData = [
    { name: "Our Team", value: 58 },
    { name: "Opponents", value: 42 },
  ];

  const seasonPerformance = [
    { month: "Sep", wins: 4, losses: 1 },
    { month: "Oct", wins: 5, losses: 0 },
    { month: "Nov", wins: 3, losses: 2 },
    { month: "Dec", wins: 6, losses: 1 },
    { month: "Jan", wins: 4, losses: 1 },
  ];

  const playerStats = [
    { name: "Alex Morgan", goals: 12, assists: 8, rating: 8.5 },
    { name: "Jordan Lee", goals: 9, assists: 11, rating: 8.3 },
    { name: "Taylor Swift", goals: 8, assists: 6, rating: 8.1 },
    { name: "Casey Jones", goals: 7, assists: 9, rating: 7.9 },
  ];

  const COLORS = ["hsl(25 95% 53%)", "hsl(0 0% 35%)"];

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
              Data-driven insights into our performance
            </p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {matchStats.map((stat, index) => (
              <Card key={stat.name} className="hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-muted-foreground">{stat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bebas text-primary">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Possession Chart */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-bebas">Average Possession</CardTitle>
                <CardDescription>Ball control percentage this season</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={possessionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {possessionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Season Performance */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-bebas">Season Performance</CardTitle>
                <CardDescription>Wins vs Losses trend</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                    <XAxis dataKey="month" stroke="hsl(0 0% 65%)" />
                    <YAxis stroke="hsl(0 0% 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(0 0% 8%)", 
                        border: "1px solid hsl(0 0% 20%)",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line type="monotone" dataKey="wins" stroke="hsl(25 95% 53%)" strokeWidth={3} />
                    <Line type="monotone" dataKey="losses" stroke="hsl(0 0% 35%)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Players Table */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-3xl font-bebas">Top Performers</CardTitle>
              <CardDescription>Leading scorers and playmakers this season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-bebas text-lg">Player</th>
                      <th className="text-center py-3 px-4 font-bebas text-lg">Goals</th>
                      <th className="text-center py-3 px-4 font-bebas text-lg">Assists</th>
                      <th className="text-center py-3 px-4 font-bebas text-lg">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerStats.map((player, index) => (
                      <tr key={player.name} className="border-b border-border hover:bg-muted transition-colors">
                        <td className="py-4 px-4 font-medium">{player.name}</td>
                        <td className="py-4 px-4 text-center text-primary font-bold">{player.goals}</td>
                        <td className="py-4 px-4 text-center text-primary font-bold">{player.assists}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                            {player.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
