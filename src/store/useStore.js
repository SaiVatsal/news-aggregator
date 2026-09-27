import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'headlines', // 'headlines' | 'bookmarks' | 'digest' | 'diversity'

  selectedCategory: 'All',
  categories: ['All', 'Technology & AI', 'Global Economy', 'Geopolitics', 'Science & Space', 'Climate & Energy'],

  searchQuery: '',

  articles: [
    {
      id: 'art-01',
      title: 'Autonomous Multi-Agent Networks Achieve Breakthrough in High-Temperature Superconductor Synthesis',
      category: 'Science & Space',
      source: 'Nature Quantum Review',
      biasRating: 'Peer-Reviewed Scientific Wire',
      author: 'Dr. Jennifer A. Croft',
      publishedAt: '22 mins ago',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80',
      summary: 'Computational material science laboratories in Geneva and Kyoto demonstrate automated robotic catalyst discovery, discovering ambient-pressure cuprate ceramic phases.',
      views: 14200,
      breaking: true
    },
    {
      id: 'art-02',
      title: 'Global Central Banks Coordinate Liquidity Swap Lines as Sovereign Yield Curves Invert',
      category: 'Global Economy',
      source: 'Financial Times Wire',
      biasRating: 'Institutional Financial Desk',
      author: 'Alistair Vance, Senior Markets Editor',
      publishedAt: '1 hour ago',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
      summary: 'The ECB, Federal Reserve, and Bank of Japan establish synchronized dollar-euro repo liquidity facilities amidst shifting macroeconomic currency corridors.',
      views: 9800,
      breaking: false
    },
    {
      id: 'art-03',
      title: 'Silicon Photonics Architecture Doubles Datacenter Energy Efficiency in Next-Gen AI Clusters',
      category: 'Technology & AI',
      source: 'MIT Technology Review',
      biasRating: 'Independent Engineering Wire',
      author: 'Marcus Brody',
      publishedAt: '3 hours ago',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      summary: 'Direct chip-to-chip laser waveguides replace copper interconnects, reducing cluster thermal dissipation and optical transceiver latency by 68 percent.',
      views: 22400,
      breaking: true
    },
    {
      id: 'art-04',
      title: 'Deep-Ocean Thermal Energy Conversion Plants Deployed Along Equatorial Archipelagos',
      category: 'Climate & Energy',
      source: 'Reuters Clean Power Desk',
      biasRating: 'International News Agency',
      author: 'Elena Rostova',
      publishedAt: '5 hours ago',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      summary: 'Commercial baseload maritime thermal conversion generators begin supplying 24/7 continuous grid power across Pacific island nations.',
      views: 6300,
      breaking: false
    }
  ],

  bookmarks: [],
  readingHistory: [],

  digestPreferences: {
    frequency: 'Morning 07:00 AM',
    email: 'alexander.vance@dispatch-reader.com',
    topics: ['Technology & AI', 'Global Economy']
  },

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleBookmark: (article) => set((state) => {
    const isBookmarked = state.bookmarks.some(b => b.id === article.id);
    if (isBookmarked) {
      return { bookmarks: state.bookmarks.filter(b => b.id !== article.id) };
    } else {
      return { bookmarks: [article, ...state.bookmarks] };
    }
  }),

  recordRead: (article) => set((state) => ({
    readingHistory: [article, ...state.readingHistory.filter(h => h.id !== article.id)]
  }))
}));
