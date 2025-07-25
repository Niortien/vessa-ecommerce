import { Blog7 } from '@/components/blog7';
import React from 'react';

const Page = () => {
    const demoData = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  buttonText: "Explore all posts",
  buttonUrl: "https://www.shadcnblocks.com",
  posts: [
    {
      id: "post-1",
      title: "Build websites in minutes with shadcn/ui",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Easily copy code to build your website",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "The future of web design",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
  ],
};
    return (
        <div>
            <Blog7 {...demoData} />
            
        </div>
    );
}

export default Page;
