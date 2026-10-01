import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default" className="text-xs">
            {project.category || 'Full Stack'}
          </Badge>
          {project.featured && (
            <Badge variant="success" className="text-xs">
              ★ Featured Project
            </Badge>
          )}
        </div>

        {/* Thumbnail Image */}
        {project.thumbnail && (
          <div className="rounded-xl overflow-hidden border border-cyan-500/20 max-h-72 bg-black/40">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Tagline */}
        {project.tagline && (
          <p className="text-base font-medium text-foreground/80 italic border-l-2 border-primary pl-3">
            "{project.tagline}"
          </p>
        )}

        {/* Main Description */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Project Overview
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <Button className="rounded-lg gap-2 text-xs font-semibold">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-lg gap-2 text-xs font-semibold">
                <Github className="w-3.5 h-3.5" />
                View Source Code
              </Button>
            </a>
          )}
          <Button variant="ghost" onClick={onClose} className="ml-auto text-xs">
            Close
          </Button>
        </div>

      </div>
    </Modal>
  );
}
