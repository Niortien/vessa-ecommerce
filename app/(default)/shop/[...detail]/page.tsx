import React from 'react';
import Content from './Content';
import { Article } from '@/type/type';

interface IProps {
  params: { detail: string }; // ✅ correction ici
}

type ArticleResponse = {
  data: Article[];
  total: number;
  page: number;
  limit: number;
};

const Page = async ({ params }: IProps) => {
  const responseArticle = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article`
  );
  const products: ArticleResponse = await responseArticle.json();
  const articleList: Article[] = products.data;
  console.log('🔍 Liste des produits :', articleList);
  const detail = params.detail[0]
  console.log('Liste des articles :', products);
console.log('ID recherché :', detail);

  const product = products.data;
  const final=product.find((prod) => prod.id === detail))
 // ✅ conversion ici

  console.log('🔍 Produit trouvé :', final);

  if (!final) {
    return <div>❌ Produit introuvable</div>;
  }

  return (
    <div>
      <Content product={final} />
    </div>
  );
};

export default Page;
