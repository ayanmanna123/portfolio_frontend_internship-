import { useState, useEffect, useCallback } from 'react';
import { api, FALLBACK_DATA } from '@/lib/api/client';

export function usePortfolioData() {
  const [data, setData] = useState({
    about: FALLBACK_DATA.about,
    skills: FALLBACK_DATA.skills,
    projects: FALLBACK_DATA.projects,
    services: FALLBACK_DATA.services,
    experiences: FALLBACK_DATA.experiences,
    testimonials: FALLBACK_DATA.testimonials,
    blogs: FALLBACK_DATA.blogs
  });

  const [loading, setLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      const [
        about,
        skills,
        projects,
        services,
        experiences,
        testimonials,
        blogs
      ] = await Promise.all([
        api.getAbout(),
        api.getSkills(),
        api.getProjects(),
        api.getServices(),
        api.getExperiences(),
        api.getTestimonials(),
        api.getBlogs()
      ]);

      setData({
        about: about || FALLBACK_DATA.about,
        skills: Array.isArray(skills) && skills.length ? skills : FALLBACK_DATA.skills,
        projects: Array.isArray(projects) && projects.length ? projects : FALLBACK_DATA.projects,
        services: Array.isArray(services) && services.length ? services : FALLBACK_DATA.services,
        experiences: Array.isArray(experiences) && experiences.length ? experiences : FALLBACK_DATA.experiences,
        testimonials: Array.isArray(testimonials) && testimonials.length ? testimonials : FALLBACK_DATA.testimonials,
        blogs: Array.isArray(blogs) && blogs.length ? blogs : FALLBACK_DATA.blogs
      });
      setIsLiveConnected(true);
      setError(null);
    } catch (err) {
      console.warn('[Portfolio Data] Using local fallback data:', err.message);
      setError(err.message);
      setIsLiveConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    ...data,
    loading,
    isLiveConnected,
    error,
    refetch: fetchAll
  };
}
