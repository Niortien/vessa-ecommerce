'use client';

import { ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface BlogProps {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
}

const EcommerceBlog = ({
  tagline = "Tendances Mode",
  heading = "Magazine Style",
  description = "Découvrez les dernières tendances mode, conseils styling et actualités de nos collections. Inspirez-vous avec nos experts pour créer votre look parfait.",
  buttonText = "Voir tous les articles",
  buttonUrl = "/blog",
  posts = [
    {
      id: "post-1",
      title: "Tendances Automne-Hiver 2024 : Les Must-Have",
      summary:
        "Découvrez les pièces incontournables de la saison. Manteaux oversize, boots en cuir et accessoires statement qui définiront votre garde-robe automnale.",
      label: "Tendances",
      author: "Emma Dubois",
      published: "15 Nov 2024",
      url: "/blog/tendances-automne-hiver-2024",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "post-2",
      title: "Comment Choisir le Sac Parfait pour Chaque Occasion",
      summary:
        "Du sac de jour au clutch de soirée, notre guide complet pour sélectionner l'accessoire idéal selon vos besoins, votre morphologie et votre style personnel.",
      label: "Accessoires",
      author: "Sophie Martin",
      published: "12 Nov 2024",
      url: "/blog/choisir-sac-parfait",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "post-3",
      title: "Garde-Robe Capsule : 20 Pièces pour un Style Intemporel",
      summary:
        "Créez une garde-robe minimaliste et polyvalente avec nos 20 essentiels mode. Des basiques de qualité qui se combinent à l'infini pour un style effortless chic.",
      label: "Style Guide",
      author: "Clara Rousseau",
      published: "8 Nov 2024",
      url: "/blog/garde-robe-capsule",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop&q=80",
    },
  ],
}: BlogProps) => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16 max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: '#1A56DC', color: 'white' }}
          >
            {tagline}
          </span>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl text-gray-900">
            {heading}
          </h2>
          <p className="mb-8 text-gray-600 md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <a 
            href={buttonUrl}
            className="inline-flex items-center text-[#1A56DC] hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            {buttonText}
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 group"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <a href={post.url} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </a>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#1A56DC', color: 'white' }}
                  >
                    {post.label}
                  </span>
                  <span className="text-sm text-gray-500">{post.published}</span>
                </div>
                
                <h3 className="text-lg font-semibold hover:underline md:text-xl mb-3 text-gray-900">
                  <a href={post.url} className="hover:text-[#1A56DC] transition-colors duration-200">
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-semibold text-gray-600">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  
                  <a
                    href={post.url}
                    className="inline-flex items-center text-[#1A56DC] hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    Lire la suite
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Section Newsletter */}
        <div className="mt-12 w-full">
          <div 
            className="max-w-4xl mx-auto rounded-3xl p-12 text-white relative overflow-hidden"
            style={{ backgroundColor: '#1A56DC' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Restez inspiré(e) avec nos conseils mode
              </h3>
              <p className="text-lg mb-8 opacity-90">
                Recevez chaque semaine nos derniers articles, tendances et conseils styling directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-3 bg-white text-[#1A56DC] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  S&apos;abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceBlog;