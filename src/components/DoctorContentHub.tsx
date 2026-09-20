import React, { useState } from 'react';
import {
  Play,
  FileText,
  Lightbulb,
  Video,
  Share2,
  ThumbsUp,
  Clock,
  Eye,
  X,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ContentCategory, DoctorContentItem } from '../types';
import { ToothIcon } from './DentalIcons';

export const DoctorContentHub: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const { doctorContent } = useClinic();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<DoctorContentItem | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const categories: string[] = ['All', 'Videos', 'Articles', 'Dental Tips', 'Social Media', 'Patient Education'];

  const filteredContent =
    activeTab === 'All'
      ? doctorContent.filter((c) => c.status === 'published')
      : doctorContent.filter((c) => c.status === 'published' && c.category === activeTab);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (item: DoctorContentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this dental advice from Dr. Parijat Pallav (Balaji Dental Clinic): ${item.title}`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="doctor-content" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf3f9] text-[#005086] text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-[#005086]" />
            <span>Doctor's Video & Advice Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Dental Guidance & Tips
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Short clinical videos, aligner advice, and daily oral hygiene tips by Dr. Parijat Pallav.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#005086] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                {/* Badge Category */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[#005086] text-[11px] font-bold shadow-sm flex items-center gap-1.5">
                  {item.type === 'video' || item.type === 'reel' ? (
                    <Video className="w-3.5 h-3.5 text-rose-600" />
                  ) : item.type === 'tip' ? (
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-[#005086]" />
                  )}
                  <span>{item.category}</span>
                </div>

                {/* Video Play Overlay */}
                {(item.type === 'video' || item.type === 'reel') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Watch/Read Time */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.readOrWatchTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sky-100 text-[#005086] flex items-center justify-center font-bold text-[9px]">
                        Dr
                      </span>
                      <span>By {item.author}</span>
                    </div>
                    <span>{item.publishDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#005086] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                {/* Engagement Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.views.toLocaleString()}</span>
                    </span>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1 transition-colors ${
                        likedMap[item.id] ? 'text-rose-600 font-bold' : 'hover:text-slate-800'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{item.likes + (likedMap[item.id] ? 1 : 0)}</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleShare(item, e)}
                    className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
                    title="Share via WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Reader / Video Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto text-left animate-fadeIn">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or Header Image */}
            {selectedItem.type === 'video' || selectedItem.type === 'reel' ? (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-5 shadow-md flex items-center justify-center text-white">
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl mb-2 animate-pulse">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <p className="text-xs font-semibold">Click to play video guide</p>
                  <p className="text-[11px] text-white/70 mt-0.5">Featuring {selectedItem.author}</p>
                </div>
              </div>
            ) : (
              <div className="h-48 rounded-2xl overflow-hidden mb-5">
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                {selectedItem.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>•</span>
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[9px]">
                  Dr
                </span>
                <span className="font-semibold text-slate-700">By {selectedItem.author}</span>
              </div>
              <span className="text-xs text-slate-400">• {selectedItem.publishDate}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">
              {selectedItem.title}
            </h3>

            <div className="prose prose-sm max-w-none text-slate-700 space-y-3 leading-relaxed text-sm">
              <p className="font-medium text-slate-800 bg-sky-50/70 p-3.5 rounded-xl border border-sky-100">
                {selectedItem.excerpt}
              </p>
              <div className="whitespace-pre-line text-slate-600 text-xs sm:text-sm">
                {selectedItem.fullContent || selectedItem.excerpt}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {selectedItem.tags.map((t, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                  #{t}
                </span>
              ))}
            </div>

            {/* Modal CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={(e) => handleShare(selectedItem, e)}
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide on WhatsApp</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onBookClick();
                  }}
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
