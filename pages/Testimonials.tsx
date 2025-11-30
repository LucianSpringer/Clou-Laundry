import React, { useState } from 'react';
import { TESTIMONIALS } from '../src/core/ContentAssets';
import { Star, Quote, Send, Share2, AlertCircle, Loader2 } from 'lucide-react';
import { SentimentAnalyzer } from '../src/core/SentimentEngine';

const Testimonials = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    review: ''
  });
  const [errors, setErrors] = useState<{ name?: string, rating?: string, review?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter & Sort Logic
  const getSortedTestimonials = () => {
    return [...TESTIMONIALS].sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest': return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest': return b.rating - a.rating;
        case 'lowest': return a.rating - b.rating;
        default: return 0;
      }
    });
  };

  const sortedTestimonials = getSortedTestimonials();
  const visibleTestimonials = sortedTestimonials.slice(0, visibleCount);

  // Handlers
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleShare = async (testimonial: typeof TESTIMONIALS[0]) => {
    const text = `"${testimonial.text}" - ${testimonial.name} via Clou Laundry`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Clou Laundry Review',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Review copied to clipboard!');
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.review.trim()) newErrors.review = "Review text is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Client-Side NLP Analysis
    const sentiment = SentimentAnalyzer.analyze(formData.review);
    console.log("Sentiment Analysis Result:", sentiment);

    // Simulate API call with "processing" time based on complexity
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', role: '', review: '' });
      setRating(0);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000 + (sentiment.tokens * 50)); // Dynamic delay based on text length
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Client Stories</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See why thousands of Surabaya residents trust Clou with their most valuable garments.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <p className="text-slate-500 font-medium">Showing {Math.min(visibleCount, sortedTestimonials.length)} of {sortedTestimonials.length} reviews</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-12">
          {visibleTestimonials.map((t, index) => (
            <div
              key={t.id}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm break-inside-avoid hover:shadow-lg transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <Quote className="text-brand-200" size={40} />
                <button
                  onClick={() => handleShare(t)}
                  className="text-slate-300 hover:text-brand-600 transition-colors p-1"
                  title="Share Review"
                >
                  <Share2 size={18} />
                </button>
              </div>
              <p className="text-slate-700 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover bg-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-slate-200" : ""} />)}
                </div>
                <span className="text-xs text-slate-400">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < sortedTestimonials.length && (
          <div className="text-center mb-20">
            <button
              onClick={handleLoadMore}
              className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              Load More Reviews
            </button>
          </div>
        )}

        {/* Submit Review Section */}
        <div className="max-w-3xl mx-auto bg-brand-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Share Your Experience</h2>
            <p className="text-slate-600">We appreciate your feedback! It helps us improve our service.</p>
          </div>

          {submitSuccess ? (
            <div className="bg-green-100 text-green-700 p-6 rounded-xl text-center animate-in fade-in zoom-in duration-300">
              <p className="font-bold text-lg mb-2">Thank you for your review!</p>
              <p>Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-400'} focus:outline-none focus:ring-2`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Role (Optional)</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    placeholder="e.g. Busy Mom"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating *</label>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => { setRating(star); setErrors(p => ({ ...p, rating: undefined })); }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={32}
                          fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
                          className={star <= (hoverRating || rating) ? "text-yellow-400" : "text-slate-300"}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.rating}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Review *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.review ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-400'} focus:outline-none focus:ring-2`}
                  placeholder="Tell us about your experience..."
                ></textarea>
                {errors.review && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.review}</p>}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Submitting <Loader2 size={18} className="animate-spin" /></>
                  ) : (
                    <>Submit Review <Send size={18} /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;