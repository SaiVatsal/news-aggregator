import React, { useState } from 'react';
import {
  Newspaper,
  Bookmark,
  TrendingUp,
  Mail,
  ShieldCheck,
  Clock,
  Share2,
  Search,
  CheckCircle2,
  ExternalLink,
  Flame,
  Globe2,
  Eye,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories,
    searchQuery,
    setSearchQuery,
    articles,
    bookmarks,
    readingHistory,
    toggleBookmark,
    recordRead
  } = useStore();

  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [digestSubscribed, setDigestSubscribed] = useState(false);
  const [digestEmail, setDigestEmail] = useState('editor@enterprise-global.com');

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenArticle = (art) => {
    recordRead(art);
    setSelectedArticleModal(art);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-red-100">
      {/* Editorial Red & White Top Bar */}
      <div className="bg-[#dc2626] text-white text-[11px] font-mono py-1.5 px-6 font-bold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>BREAKING DISPATCH // REUTERS, BLOOMBERG, FT SYNDICATED WIRE</span>
        </div>
        <div className="hidden sm:block">
          NEW YORK • LONDON • TOKYO • GENEVA
        </div>
      </div>

      {/* Main Newspaper Masthead */}
      <header className="border-b-2 border-slate-900 bg-white px-6 py-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left hidden md:block text-xs text-slate-500 font-mono">
            <div>Vol. CXLII • No. 49,201</div>
            <div>Sunday, September 27, 2026</div>
          </div>

          <div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 uppercase">
              The Global Dispatch
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#dc2626] font-bold mt-1">
              Independent Multi-Source Intelligence & Verified Wire Aggregation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('digest')}
              className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#dc2626] rounded-full text-xs font-bold flex items-center gap-1.5 border border-red-200 transition"
            >
              <Mail className="w-3.5 h-3.5" /> Daily Briefing
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-6 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-700">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveTab('headlines');
              }}
              className={`pb-1 transition ${
                selectedCategory === cat && activeTab === 'headlines'
                  ? 'text-[#dc2626] border-b-2 border-[#dc2626]'
                  : 'hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('diversity')}
            className={`pb-1 text-slate-600 transition flex items-center gap-1 ${
              activeTab === 'diversity' ? 'text-[#dc2626] border-b-2 border-[#dc2626]' : 'hover:text-black'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" /> Source Diversity Index
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: HEADLINES FEED */}
        {activeTab === 'headlines' && (
          <div className="space-y-8">
            {/* Search & Filter Line */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search headlines, agencies, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <span>Aggregated Wires: <strong>4 Major Desks</strong></span>
                <span>•</span>
                <span>Live Feed Sync: <strong>Active</strong></span>
              </div>
            </div>

            {/* Dense Headline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lead Front Page Story */}
              {filteredArticles.length > 0 && (
                <div
                  className="lg:col-span-8 space-y-4 cursor-pointer group"
                  onClick={() => handleOpenArticle(filteredArticles[0])}
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                    <img
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#dc2626] text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
                      ★ Top Investigative Lead
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="font-bold text-[#dc2626]">{filteredArticles[0].source}</span>
                      <span>•</span>
                      <span>{filteredArticles[0].publishedAt}</span>
                      <span>•</span>
                      <span>{filteredArticles[0].readTime}</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-950 leading-tight group-hover:text-[#dc2626] transition">
                      {filteredArticles[0].title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed font-serif line-clamp-3">
                      {filteredArticles[0].summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Side Column Stories */}
              <div className="lg:col-span-4 divide-y divide-slate-200 space-y-4">
                {filteredArticles.slice(1).map((art) => (
                  <div
                    key={art.id}
                    className="pt-4 first:pt-0 space-y-2 cursor-pointer group"
                    onClick={() => handleOpenArticle(art)}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="font-bold text-[#dc2626]">{art.source}</span>
                      <span>{art.publishedAt}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-serif text-3xl font-bold text-slate-900">Saved Reading List & Archival Dossiers</h2>
              <p className="text-xs text-slate-500 font-mono">Articles bookmarked for offline synthesis and deep reading.</p>
            </div>

            {bookmarks.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-slate-800">Your Reading Dossier is Empty</h4>
                <p className="text-xs text-slate-500">Bookmark articles from the front page to build your custom intelligence brief.</p>
                <button
                  onClick={() => setActiveTab('headlines')}
                  className="px-5 py-2 bg-[#dc2626] text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Browse Front Page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookmarks.map((art) => (
                  <div key={art.id} className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-white shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-500">
                        <span className="font-bold text-[#dc2626]">{art.source}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">{art.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{art.summary}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenArticle(art)}
                        className="text-xs font-bold text-[#dc2626] hover:underline"
                      >
                        Read Full Dossier →
                      </button>
                      <button
                        onClick={() => toggleBookmark(art)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: DAILY DIGEST */}
        {activeTab === 'digest' && (
          <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#dc2626] flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-3xl font-black text-slate-900">The 07:00 AM Executive Wire</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an AI-synthesized morning briefing of the top 5 global stories across geopolitics, silicon engineering, and sovereign markets.
              </p>
            </div>

            {digestSubscribed ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                <h4 className="font-bold text-sm">Briefing Subscription Confirmed</h4>
                <p className="text-xs">Dispatching daily summary to <strong>{digestEmail}</strong> every morning at 07:00 AM EST.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDigestSubscribed(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Recipient Email Address</label>
                  <input
                    type="email"
                    required
                    value={digestEmail}
                    onChange={(e) => setDigestEmail(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl font-bold uppercase tracking-wider transition"
                >
                  Activate Morning Briefing
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 4: SOURCE DIVERSITY INDEX */}
        {activeTab === 'diversity' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-serif text-3xl font-bold text-slate-900">Multi-Perspective Source Diversity Index</h2>
              <p className="text-xs text-slate-500">Editorial audits ensuring objective reporting across institutional wires and peer-reviewed journals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Nature Quantum Review', type: 'Peer-Reviewed Science', coverage: '99.4% Fact Verified' },
                { name: 'Financial Times Wire', type: 'Institutional Markets', coverage: '98.8% Fact Verified' },
                { name: 'MIT Technology Review', type: 'Independent Engineering', coverage: '99.1% Fact Verified' }
              ].map((src, idx) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono uppercase bg-red-100 text-[#dc2626] px-2 py-0.5 rounded font-bold">
                    {src.type}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">{src.name}</h4>
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-2">
                    <ShieldCheck className="w-4 h-4" /> {src.coverage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ARTICLE READER MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono uppercase font-bold text-[#dc2626]">{selectedArticleModal.source}</span>
              <button onClick={() => setSelectedArticleModal(null)} className="text-slate-400 hover:text-black">✕</button>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl md:text-3xl font-black text-slate-950 leading-tight">
                {selectedArticleModal.title}
              </h2>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span>By {selectedArticleModal.author}</span>
                <span>•</span>
                <span>{selectedArticleModal.publishedAt}</span>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <img src={selectedArticleModal.image} alt={selectedArticleModal.title} className="w-full h-full object-cover" />
            </div>

            <div className="font-serif text-slate-800 text-base leading-relaxed space-y-4">
              <p>{selectedArticleModal.summary}</p>
              <p>
                International correspondents confirmed the deployment details following structured briefings in London and Singapore. Independent technical verification bodies noted high alignment with verified experimental benchmarks.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => toggleBookmark(selectedArticleModal)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {bookmarks.some(b => b.id === selectedArticleModal.id) ? 'Remove from Saved' : 'Save for Later'}
              </button>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-slate-50 py-8 text-center text-xs text-slate-600 font-mono">
        THE GLOBAL DISPATCH • REUTERS / BLOOMBERG / AP GDS WIRE PROTOCOLS
      </footer>
    </div>
  );
}
