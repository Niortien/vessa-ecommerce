import React from 'react';
import Content from './Content';
import { Article } from '@/type/type';

interface IProps {
  params:Promise< { detail: string }>; // ✅ correction ici
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

 
  const detail = (await params).detail

console.log('ID recherché :', detail);

  const product = products.data;
  const final=product.find((prod) => prod.id === detail)
 // ✅ conversion ici



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
