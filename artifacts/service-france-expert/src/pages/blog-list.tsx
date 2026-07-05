import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { staticBlogPosts } from "@/data/static-data";

export default function BlogList() {
  const posts = staticBlogPosts;
  const isLoading = false;

  return (
    <div className="pt-8 pb-24">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Guides & Actualités
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Restez informé des dernières évolutions de l'administration française et découvrez nos conseils d'experts.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-sm border border-border overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-sm border border-border overflow-hidden group hover:shadow-lg transition-all h-full flex flex-col cursor-pointer">
                  {post.imageUrl ? (
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground/30 font-serif text-2xl font-bold">SF</span>
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-sm">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{format(new Date(post.publishedAt), 'd MMM yyyy', { locale: fr })}</span>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readingTime} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
