import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { staticBlogPosts } from "@/data/static-data";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = staticBlogPosts.find((p) => p.slug === slug);
  const isLoading = false;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Article introuvable</h1>
        <p className="text-muted-foreground mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link href="/blog" className="text-accent hover:underline font-medium inline-flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Retour aux articles
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Hero Header */}
      <header className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-primary-foreground/70 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" /> Retour aux guides
          </Link>
          
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1.5 rounded-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: fr })}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min de lecture</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.imageUrl && (
          <div className="mb-12 rounded-sm overflow-hidden border border-border shadow-sm">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}
        
        <div className="prose prose-lg prose-blue max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-sm">
          {/* We're assuming content is HTML or plain text that can be rendered directly */}
          {/* In a real app with markdown, you'd use react-markdown or similar */}
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Tags associés</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-muted px-3 py-1 rounded-sm text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
