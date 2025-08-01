import EcommerceBlog from '@/components/blog7';
import React from 'react';

const Page = () => {
    const demoData = {
 tagline : "Tendances Mode",
  heading :  "Magazine Style",
  description : "Découvrez les dernières tendances mode, conseils styling et actualités de nos collections. Inspirez-vous avec nos experts pour créer votre look parfait.",
  buttonText : "Voir tous les articles",
  buttonUrl : "/shop",
  posts:[
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
};
    return (
        <div>
            <EcommerceBlog {...demoData} />
            
        </div>
    );
}

export default Page;
