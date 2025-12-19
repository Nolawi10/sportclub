import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface MatchResult {
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

export interface FantasyPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  price: number;
  points: number;
  goals: number;
  assists: number;
  form?: number;
  cleanSheets?: number;
}

export interface Standing {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  active: boolean;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: "highlight" | "interview";
  date: string;
  views: string;
}

export interface UpcomingMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  competition: string;
}

export interface TeamRoster {
  lineup: string[];
  subs: string[];
}

export interface PlayerOfWeek {
  name: string;
  team: string;
  description: string;
}

export interface TeamOfWeek {
  players: string;
  subs: string;
  description: string;
}

const TEAMS = ["9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B", "12C"];

// Default data
const defaultTeamRosters: Record<string, TeamRoster> = {
  "12A": { lineup: ["Fikir (C)", "Frezer", "Kidus", "Yabsera", "Ezana", "Yabsera", "Amanuel"], subs: ["Nahom", "Joel", "Ishak"] },
  "12B": { lineup: ["Abel Melese", "Abel Tadese", "Bemnet Debebe", "Elias Markos", "Godoliyas Tekalgn", "Hamza Sefa", "Imran Kelil", "Merwan Biruk", "Natnael Bekalu", "Solomon Melese"], subs: [] },
  "12C": { lineup: ["Samson", "Abraham", "Emran", "Abdela", "Liyu", "Estifanos"], subs: [] },
  "11A": { lineup: ["Dawit Fasil (C)", "Amanuel Dejene", "Haileab Mulugeta", "Daniel Shimekit", "Natnael Mequanent", "Zereyaecob Abebe", "Hailegebriel Tilaye", "Simone Getachew", "Yohannan Birhane", "Mohammed nur Hamid"], subs: [] },
  "11B": { lineup: ["Daniel Eshetu", "Sami", "Faruk", "Feysel", "Yeabsira D", "Kalid", "Mohammed", "Barack", "Esayas"], subs: [] },
  "11C": { lineup: ["Paulos Berihun (C)", "Nahom Wondifraw", "Abiy Mamo", "Kaleab Mekasha", "Muse Germachew", "Mikiyas Debalkie", "Abemelek Getachew", "Robel Andualem"], subs: [] },
  "10A": { lineup: ["Kaleab Fekadu (GK)", "Olbana Ahmedsiraj (DEF)", "Sofonias Siraw (DEF)", "Kaleb Seifu (DEF)", "Yonathan Aklilu (MID)", "Girum Fikremariam (ST)", "Ezana Zekarias (ST)"], subs: ["Beamlak Tewodros"] },
  "10B": { lineup: ["Abenezer", "Yeabsira", "Muse", "Shebaw (Nahom)", "Lincoln", "Chris", "Firaol"], subs: ["Abel", "Natan", "Kounde (Yodahe)"] },
  "10C": { lineup: ["Amen Samuel (GK)", "Estifanos Ayalew (CB)", "Natnael Alemayehu (CB)", "Elias Ahmed (CB)", "Ezra Ambaw (CM)", "Esreal Bewketu (CM)", "Zakir Nuredin (CAM)", "Henok Yared (ST)", "John Samuel (ST)", "Nolawi Hailu (ST)"], subs: [] },
  "9A": { lineup: ["Haleluya (GK)", "Elnatan (CB)", "Nati (CM)", "Adoniyas (CB)", "Yonas (CM)", "Sheferaw (LB)", "Kaleb (CM)", "Aymen (CM)", "Fitsum (LB)", "Aron (RB)", "Moebon (RB)"], subs: [] },
  "9B": { lineup: ["Biruk", "Matanya", "Yonatan", "Yared", "Eyosias", "Leul", "Natan", "Alazar", "Abemelek", "Naol", "Lewi"], subs: [] },
  "9C": { lineup: ["Bamlak (GK)", "Akiya (CB)", "Biruk (CB)", "Abenezer (RB)", "Enqusilase (LB)", "Reyan (CM)", "Dawit (CM)"], subs: ["Nahom", "Legizew", "Leul"] }
};

const defaultFantasyPlayers: FantasyPlayer[] = [
  { id: "gk1", name: "Kaleab Fekadu", team: "10A", position: "GK", price: 8.5, points: 42, goals: 0, assists: 0, form: 7.2, cleanSheets: 4 },
  { id: "gk2", name: "Bamlak", team: "9C", position: "GK", price: 7.0, points: 35, goals: 0, assists: 0, form: 6.1, cleanSheets: 3 },
  { id: "gk3", name: "Haleluya", team: "9A", position: "GK", price: 6.0, points: 28, goals: 0, assists: 0, form: 5.8, cleanSheets: 2 },
  { id: "gk4", name: "Amen Samuel", team: "10C", position: "GK", price: 6.5, points: 30, goals: 0, assists: 0, form: 5.5, cleanSheets: 2 },
  { id: "def1", name: "Fikir", team: "12A", position: "DEF", price: 8.0, points: 40, goals: 2, assists: 0, form: 6.8, cleanSheets: 2 },
  { id: "def2", name: "Kidus", team: "12A", position: "DEF", price: 6.5, points: 32, goals: 0, assists: 1, form: 6.0, cleanSheets: 2 },
  { id: "def3", name: "Abel Melese", team: "12B", position: "DEF", price: 7.5, points: 38, goals: 1, assists: 3, form: 6.5, cleanSheets: 3 },
  { id: "def4", name: "Bemnet Debebe", team: "12B", position: "DEF", price: 7.0, points: 35, goals: 1, assists: 1, form: 6.2, cleanSheets: 3 },
  { id: "def5", name: "Yohannan Birhane", team: "11A", position: "DEF", price: 8.5, points: 45, goals: 0, assists: 0, form: 7.2, cleanSheets: 4 },
  { id: "def17", name: "Yared", team: "9B", position: "DEF", price: 7.0, points: 35, goals: 0, assists: 0, form: 6.5, cleanSheets: 3 },
  { id: "mid1", name: "Abraham", team: "12C", position: "MID", price: 10.5, points: 62, goals: 3, assists: 2, form: 8.0 },
  { id: "mid2", name: "Emran", team: "12C", position: "MID", price: 10.0, points: 58, goals: 0, assists: 3, form: 7.8 },
  { id: "mid3", name: "Haileab Mulugeta", team: "11A", position: "MID", price: 13.0, points: 82, goals: 4, assists: 1, form: 9.2 },
  { id: "mid6", name: "Sami", team: "11B", position: "MID", price: 9.0, points: 50, goals: 2, assists: 2, form: 7.5 },
  { id: "mid7", name: "Faruk", team: "11B", position: "MID", price: 10.5, points: 60, goals: 3, assists: 1, form: 8.2 },
  { id: "mid10", name: "Muse", team: "10B", position: "MID", price: 11.0, points: 68, goals: 3, assists: 0, form: 8.5 },
  { id: "mid13", name: "Reyan", team: "9C", position: "MID", price: 9.0, points: 48, goals: 1, assists: 1, form: 7.0 },
  { id: "fwd1", name: "Samson", team: "12C", position: "FWD", price: 12.0, points: 72, goals: 4, assists: 1, form: 8.8 },
  { id: "fwd4", name: "Dawit Fasil", team: "11A", position: "FWD", price: 11.0, points: 65, goals: 2, assists: 0, form: 8.2 },
  { id: "fwd6", name: "Daniel Eshetu", team: "11B", position: "FWD", price: 13.5, points: 80, goals: 4, assists: 0, form: 9.0 },
  { id: "fwd7", name: "Esayas", team: "11B", position: "FWD", price: 11.5, points: 68, goals: 3, assists: 0, form: 8.5 },
  { id: "fwd8", name: "Elias Markos", team: "12B", position: "FWD", price: 11.0, points: 62, goals: 3, assists: 0, form: 8.0 },
  { id: "fwd20", name: "Lewi", team: "9B", position: "FWD", price: 9.5, points: 52, goals: 2, assists: 1, form: 7.5 },
];

const defaultMatchResults: MatchResult[] = [
  {
    id: "m1", homeTeam: "12C", awayTeam: "9A", homeScore: 5, awayScore: 0, date: "Dec 15", category: "Football",
    stats: { homeShots: 26, awayShots: 2, homeShotsOnTarget: 16, awayShotsOnTarget: 0, homeFouls: 5, awayFouls: 1, homeCorners: 8, awayCorners: 0, homePasses: 245, awayPasses: 89 },
    goals: [
      { player: "Samson", assist: "Emran", minute: "12'", team: "12C" },
      { player: "Abraham", assist: "Emran", minute: "28'", team: "12C" },
      { player: "Abdela", assist: "Abraham", minute: "52'", team: "12C" },
      { player: "Liyu", assist: "Emran", minute: "67'", team: "12C" },
      { player: "Abraham", assist: "Samson", minute: "78'", team: "12C" },
    ]
  },
  {
    id: "m2", homeTeam: "11B", awayTeam: "12A", homeScore: 9, awayScore: 0, date: "Dec 14", category: "Football",
    stats: { homeShots: 32, awayShots: 3, homeShotsOnTarget: 18, awayShotsOnTarget: 1, homeFouls: 4, awayFouls: 8, homeCorners: 12, awayCorners: 1, homePasses: 320, awayPasses: 95 },
    goals: [
      { player: "Daniel Eshetu", minute: "5'", team: "11B" },
      { player: "Faruk", assist: "Sami", minute: "15'", team: "11B" },
      { player: "Daniel Eshetu", assist: "Barack", minute: "22'", team: "11B" },
      { player: "Esayas", minute: "34'", team: "11B" },
      { player: "Faruk", assist: "Mohammed", minute: "45'", team: "11B" },
      { player: "Daniel Eshetu", minute: "55'", team: "11B" },
      { player: "Esayas", assist: "Faruk", minute: "68'", team: "11B" },
      { player: "Sami", minute: "75'", team: "11B" },
      { player: "Esayas", assist: "Kalid", minute: "88'", team: "11B" },
    ]
  },
  {
    id: "m3", homeTeam: "11A", awayTeam: "10A", homeScore: 2, awayScore: 1, date: "Dec 13", category: "Football",
    stats: { homeShots: 15, awayShots: 8, homeShotsOnTarget: 7, awayShotsOnTarget: 3, homeFouls: 6, awayFouls: 5, homeCorners: 5, awayCorners: 3, homePasses: 280, awayPasses: 190 },
    goals: [
      { player: "Haileab", assist: "Dawit Fasil", minute: "23'", team: "11A" },
      { player: "Girum", minute: "45'", team: "10A" },
      { player: "Haileab", assist: "Daniel Shimekit", minute: "72'", team: "11A" },
    ]
  },
  {
    id: "m4", homeTeam: "10B", awayTeam: "9C", homeScore: 2, awayScore: 1, date: "Dec 12", category: "Football",
    stats: { homeShots: 12, awayShots: 9, homeShotsOnTarget: 5, awayShotsOnTarget: 4, homeFouls: 7, awayFouls: 6, homeCorners: 4, awayCorners: 3, homePasses: 210, awayPasses: 165 },
    goals: [
      { player: "Muse", assist: "Abenezer", minute: "18'", team: "10B" },
      { player: "Reyan", minute: "56'", team: "9C" },
      { player: "Muse", assist: "Lincoln", minute: "84'", team: "10B" },
    ]
  },
  {
    id: "m5", homeTeam: "12B", awayTeam: "9A", homeScore: 6, awayScore: 0, date: "Dec 11", category: "Football",
    stats: { homeShots: 22, awayShots: 2, homeShotsOnTarget: 12, awayShotsOnTarget: 0, homeFouls: 3, awayFouls: 4, homeCorners: 7, awayCorners: 0, homePasses: 270, awayPasses: 85 },
    goals: [
      { player: "Elias Markos", minute: "8'", team: "12B" },
      { player: "Elias Markos", assist: "Abel Melese", minute: "21'", team: "12B" },
      { player: "Abel Tadese", assist: "Bemnet Debebe", minute: "38'", team: "12B" },
      { player: "Elias Markos", minute: "55'", team: "12B" },
      { player: "Bemnet Debebe", assist: "Abel Melese", minute: "67'", team: "12B" },
      { player: "Godoliyas Tekalgn", minute: "82'", team: "12B" },
    ]
  }
];

const defaultUpcomingMatches: UpcomingMatch[] = [
  { id: "u1", homeTeam: "11A", awayTeam: "11C", date: "Dec 18", time: "3:00 PM", competition: "Semifinals" },
  { id: "u2", homeTeam: "12C", awayTeam: "12A", date: "Dec 18", time: "4:30 PM", competition: "Semifinals" },
  { id: "u3", homeTeam: "11B", awayTeam: "12B", date: "Dec 19", time: "3:00 PM", competition: "Quarterfinals" },
  { id: "u4", homeTeam: "9B", awayTeam: "10A", date: "Dec 19", time: "4:30 PM", competition: "Group Stage" },
];

// Context type
interface DataContextType {
  // Data
  teams: string[];
  matchResults: MatchResult[];
  standings: Standing[];
  fantasyPlayers: FantasyPlayer[];
  announcements: Announcement[];
  newsItems: NewsItem[];
  mediaItems: MediaItem[];
  upcomingMatches: UpcomingMatch[];
  teamRosters: Record<string, TeamRoster>;
  playerOfWeek: PlayerOfWeek;
  teamOfWeek: TeamOfWeek;
  
  // Actions
  addMatchResult: (result: Omit<MatchResult, 'id'>) => void;
  updateMatchResult: (id: string, result: Partial<MatchResult>) => void;
  removeMatchResult: (id: string) => void;
  updateStandings: (standings: Standing[]) => void;
  recalculateStandings: () => void;
  
  addFantasyPlayer: (player: Omit<FantasyPlayer, 'id'>) => void;
  updateFantasyPlayer: (id: string, updates: Partial<FantasyPlayer>) => void;
  removeFantasyPlayer: (id: string) => void;
  
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  removeAnnouncement: (id: string) => void;
  
  addNewsItem: (news: Omit<NewsItem, 'id'>) => void;
  removeNewsItem: (id: string) => void;
  
  addMediaItem: (media: Omit<MediaItem, 'id'>) => void;
  removeMediaItem: (id: string) => void;
  
  addUpcomingMatch: (match: Omit<UpcomingMatch, 'id'>) => void;
  removeUpcomingMatch: (id: string) => void;
  
  updateTeamRoster: (team: string, roster: TeamRoster) => void;
  updatePlayerOfWeek: (data: PlayerOfWeek) => void;
  updateTeamOfWeek: (data: TeamOfWeek) => void;
  
  // Computed
  getTopScorers: () => { name: string; team: string; goals: number }[];
  getTopAssistors: () => { name: string; team: string; assists: number }[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to calculate standings from results
const calculateStandingsFromResults = (results: MatchResult[]): Standing[] => {
  const standingsMap: Record<string, Standing> = {};
  
  TEAMS.forEach(team => {
    standingsMap[team] = { team, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
  });
  
  results.forEach(result => {
    if (standingsMap[result.homeTeam] && standingsMap[result.awayTeam]) {
      standingsMap[result.homeTeam].played++;
      standingsMap[result.awayTeam].played++;
      standingsMap[result.homeTeam].gf += result.homeScore;
      standingsMap[result.homeTeam].ga += result.awayScore;
      standingsMap[result.awayTeam].gf += result.awayScore;
      standingsMap[result.awayTeam].ga += result.homeScore;
      
      if (result.homeScore > result.awayScore) {
        standingsMap[result.homeTeam].won++;
        standingsMap[result.homeTeam].points += 3;
        standingsMap[result.awayTeam].lost++;
      } else if (result.homeScore < result.awayScore) {
        standingsMap[result.awayTeam].won++;
        standingsMap[result.awayTeam].points += 3;
        standingsMap[result.homeTeam].lost++;
      } else {
        standingsMap[result.homeTeam].drawn++;
        standingsMap[result.awayTeam].drawn++;
        standingsMap[result.homeTeam].points++;
        standingsMap[result.awayTeam].points++;
      }
    }
  });
  
  return Object.values(standingsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage or defaults
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => {
    const stored = localStorage.getItem("ssc_match_results");
    return stored ? JSON.parse(stored) : defaultMatchResults;
  });
  
  const [standings, setStandings] = useState<Standing[]>(() => {
    const stored = localStorage.getItem("ssc_standings");
    if (stored) return JSON.parse(stored);
    return calculateStandingsFromResults(defaultMatchResults);
  });
  
  const [fantasyPlayers, setFantasyPlayers] = useState<FantasyPlayer[]>(() => {
    const stored = localStorage.getItem("ssc_fantasy_players");
    return stored ? JSON.parse(stored) : defaultFantasyPlayers;
  });
  
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const stored = localStorage.getItem("ssc_announcements");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    const stored = localStorage.getItem("ssc_news");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const stored = localStorage.getItem("ssc_media");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>(() => {
    const stored = localStorage.getItem("ssc_upcoming_matches");
    return stored ? JSON.parse(stored) : defaultUpcomingMatches;
  });
  
  const [teamRosters, setTeamRosters] = useState<Record<string, TeamRoster>>(() => {
    const stored = localStorage.getItem("ssc_team_rosters");
    return stored ? JSON.parse(stored) : defaultTeamRosters;
  });
  
  const [playerOfWeek, setPlayerOfWeek] = useState<PlayerOfWeek>(() => {
    const stored = localStorage.getItem("ssc_player_of_week");
    return stored ? JSON.parse(stored) : { name: "Mussie", team: "10B", description: "Outstanding performance with 2 goals" };
  });
  
  const [teamOfWeek, setTeamOfWeek] = useState<TeamOfWeek>(() => {
    const stored = localStorage.getItem("ssc_team_of_week");
    return stored ? JSON.parse(stored) : { players: "Kaleab, Yohanan, Yared, Reyan, Mussie, Haileab, Lewi", subs: "Girum, Naol, Biruk, Bamlak", description: "Best performers of the week" };
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem("ssc_match_results", JSON.stringify(matchResults)); }, [matchResults]);
  useEffect(() => { localStorage.setItem("ssc_standings", JSON.stringify(standings)); }, [standings]);
  useEffect(() => { localStorage.setItem("ssc_fantasy_players", JSON.stringify(fantasyPlayers)); }, [fantasyPlayers]);
  useEffect(() => { localStorage.setItem("ssc_announcements", JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem("ssc_news", JSON.stringify(newsItems)); }, [newsItems]);
  useEffect(() => { localStorage.setItem("ssc_media", JSON.stringify(mediaItems)); }, [mediaItems]);
  useEffect(() => { localStorage.setItem("ssc_upcoming_matches", JSON.stringify(upcomingMatches)); }, [upcomingMatches]);
  useEffect(() => { localStorage.setItem("ssc_team_rosters", JSON.stringify(teamRosters)); }, [teamRosters]);
  useEffect(() => { localStorage.setItem("ssc_player_of_week", JSON.stringify(playerOfWeek)); }, [playerOfWeek]);
  useEffect(() => { localStorage.setItem("ssc_team_of_week", JSON.stringify(teamOfWeek)); }, [teamOfWeek]);

  // Actions
  const addMatchResult = (result: Omit<MatchResult, 'id'>) => {
    const newResult = { ...result, id: `result-${Date.now()}` };
    const updated = [...matchResults, newResult];
    setMatchResults(updated);
    // Auto-recalculate standings
    setStandings(calculateStandingsFromResults(updated));
  };

  const updateMatchResult = (id: string, updates: Partial<MatchResult>) => {
    const updated = matchResults.map(r => r.id === id ? { ...r, ...updates } : r);
    setMatchResults(updated);
    setStandings(calculateStandingsFromResults(updated));
  };

  const removeMatchResult = (id: string) => {
    const updated = matchResults.filter(r => r.id !== id);
    setMatchResults(updated);
    setStandings(calculateStandingsFromResults(updated));
  };

  const updateStandings = (newStandings: Standing[]) => {
    setStandings(newStandings);
  };

  const recalculateStandings = () => {
    setStandings(calculateStandingsFromResults(matchResults));
  };

  const addFantasyPlayer = (player: Omit<FantasyPlayer, 'id'>) => {
    setFantasyPlayers([...fantasyPlayers, { ...player, id: `player-${Date.now()}` }]);
  };

  const updateFantasyPlayer = (id: string, updates: Partial<FantasyPlayer>) => {
    setFantasyPlayers(fantasyPlayers.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeFantasyPlayer = (id: string) => {
    setFantasyPlayers(fantasyPlayers.filter(p => p.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    setAnnouncements([...announcements, { ...announcement, id: `ann-${Date.now()}`, createdAt: new Date().toISOString() }]);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const removeAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const addNewsItem = (news: Omit<NewsItem, 'id'>) => {
    setNewsItems([...newsItems, { ...news, id: `news-${Date.now()}` }]);
  };

  const removeNewsItem = (id: string) => {
    setNewsItems(newsItems.filter(n => n.id !== id));
  };

  const addMediaItem = (media: Omit<MediaItem, 'id'>) => {
    setMediaItems([...mediaItems, { ...media, id: `media-${Date.now()}` }]);
  };

  const removeMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter(m => m.id !== id));
  };

  const addUpcomingMatch = (match: Omit<UpcomingMatch, 'id'>) => {
    setUpcomingMatches([...upcomingMatches, { ...match, id: `upcoming-${Date.now()}` }]);
  };

  const removeUpcomingMatch = (id: string) => {
    setUpcomingMatches(upcomingMatches.filter(m => m.id !== id));
  };

  const updateTeamRoster = (team: string, roster: TeamRoster) => {
    setTeamRosters({ ...teamRosters, [team]: roster });
  };

  const updatePlayerOfWeek = (data: PlayerOfWeek) => {
    setPlayerOfWeek(data);
  };

  const updateTeamOfWeek = (data: TeamOfWeek) => {
    setTeamOfWeek(data);
  };

  // Computed values
  const getTopScorers = () => {
    const scorerMap: Record<string, { name: string; team: string; goals: number }> = {};
    matchResults.forEach(result => {
      result.goals.forEach(goal => {
        const key = `${goal.player}-${goal.team}`;
        if (!scorerMap[key]) {
          scorerMap[key] = { name: goal.player, team: goal.team, goals: 0 };
        }
        scorerMap[key].goals++;
      });
    });
    return Object.values(scorerMap).sort((a, b) => b.goals - a.goals).slice(0, 10);
  };

  const getTopAssistors = () => {
    const assistMap: Record<string, { name: string; team: string; assists: number }> = {};
    matchResults.forEach(result => {
      result.goals.forEach(goal => {
        if (goal.assist) {
          const key = `${goal.assist}-${goal.team}`;
          if (!assistMap[key]) {
            assistMap[key] = { name: goal.assist, team: goal.team, assists: 0 };
          }
          assistMap[key].assists++;
        }
      });
    });
    return Object.values(assistMap).sort((a, b) => b.assists - a.assists).slice(0, 10);
  };

  return (
    <DataContext.Provider value={{
      teams: TEAMS,
      matchResults,
      standings,
      fantasyPlayers,
      announcements,
      newsItems,
      mediaItems,
      upcomingMatches,
      teamRosters,
      playerOfWeek,
      teamOfWeek,
      addMatchResult,
      updateMatchResult,
      removeMatchResult,
      updateStandings,
      recalculateStandings,
      addFantasyPlayer,
      updateFantasyPlayer,
      removeFantasyPlayer,
      addAnnouncement,
      updateAnnouncement,
      removeAnnouncement,
      addNewsItem,
      removeNewsItem,
      addMediaItem,
      removeMediaItem,
      addUpcomingMatch,
      removeUpcomingMatch,
      updateTeamRoster,
      updatePlayerOfWeek,
      updateTeamOfWeek,
      getTopScorers,
      getTopAssistors,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
