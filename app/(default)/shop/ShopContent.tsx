// ShopContent.tsx
import React from "react";
import ProductList from "@/components/shop/ProductList";
import { Article } from "@/type/type";



const ShopContent = async () => {
  // Appel API proprement
  const responseArticle = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article`
  );
  //Fetch de categorie


  //Récuperation et convertion des données sous forme JSON;
  
  type ArticleResponse = {
    data: Article[];
    total: number;
    page: number;
    limit: number;
  };
  const article: ArticleResponse = await responseArticle.json();
  console.log(article);
  console.log("issa");

  return (
    <div>
      <ProductList products={article} />
    </div>
  );
};

export default ShopContent;

