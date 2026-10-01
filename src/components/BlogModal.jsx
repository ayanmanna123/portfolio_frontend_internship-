import { Calendar, Clock, Eye, Tag } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, estimateReadTime } from '@/utils/formatters';

export function BlogModal({ blog, isOpen, onClose }) {
  if (!blog) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={blog.title}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pb-4 border-b border-border">
          <div className="flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{estimateReadTime(blog.content)}</span>
          </div>

          {blog.views !== undefined && (
            <div className="flex items-center gap-1.5 font-mono">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>{blog.views} views</span>
            </div>
          )}
        </div>

        {/* Excerpt Lead */}
        {blog.excerpt && (
          <p className="text-base sm:text-lg font-medium text-foreground/90 border-l-2 border-primary pl-4 py-1">
            {blog.excerpt}
          </p>
        )}

        {/* Main Content Body */}
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line space-y-4">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
            {blog.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs font-mono">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose} className="text-xs">
            Done Reading
          </Button>
        </div>

      </div>
    </Modal>
  );
}
