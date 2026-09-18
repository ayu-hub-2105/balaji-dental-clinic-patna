import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Share2, ArrowRight, User, X, Sparkles } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { BlogPost } from '../types';
import { ToothIcon } from './DentalIcons';

export const BlogSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const { blogPosts } = useClinic();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://wa.me/?text=${encodeURIComponent(`Check out this dental article from Balaji Dental Clinic: ${post.title}`)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="blogs" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Dental Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Latest Articles & Guides
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Helpful oral health guides and treatment tips written by our clinical specialists.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-sky-700 text-[11px] font-bold shadow-sm">
                  {post.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                    <span>{post.author} ({post.authorRole})</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => handleShare(post, e)}
                    className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
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

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto text-left animate-fadeIn">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-48 rounded-2xl overflow-hidden mb-5">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                {selectedPost.category}
              </span>
              <span className="text-xs text-slate-400">• By {selectedPost.author} ({selectedPost.authorRole})</span>
              <span className="text-xs text-slate-400">• {selectedPost.date}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3 leading-snug">
              {selectedPost.title}
            </h3>

            <div className="prose prose-sm max-w-none text-slate-700 space-y-3 leading-relaxed text-xs sm:text-sm">
              <p className="font-medium text-slate-800 bg-sky-50/70 p-3.5 rounded-xl border border-sky-100">
                {selectedPost.excerpt}
              </p>
              <p>{selectedPost.content}</p>
              <p>
                At Balaji Dental Clinic, every patient undergoes a comprehensive 3D digital diagnosis before any treatment commences. To consult with our specialists directly, reserve your consultation slot online.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {selectedPost.tags.map((t, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                  #{t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={(e) => handleShare(selectedPost, e)}
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share on WhatsApp</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedPost(null);
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
