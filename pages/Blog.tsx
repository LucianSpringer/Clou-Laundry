import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight, Search, X } from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Laundry Tips & Tricks</h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Expert advice on fabric care, stain removal, and keeping your wardrobe looking fresh for longer.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-700 uppercase tracking-wide">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="text-brand-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No articles found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')} 
              className="mt-4 text-brand-600 font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-brand-900 rounded-3xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Never Miss a Laundry Hack</h2>
          <p className="text-brand-200 mb-8 max-w-lg mx-auto">Subscribe to our newsletter for exclusive tips and monthly promo codes.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button className="bg-brand-500 hover:bg-brand-400 px-8 py-3 rounded-full font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;