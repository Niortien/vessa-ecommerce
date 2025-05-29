import { BlogElements } from '@/type/blogs';
import React from 'react';
import BlogsCards from '../ui/BlogsCards';


const BlogsSection = () => {
 const blogData: BlogElements[] = [
  {
    id: '1',
    date: '2025-05-01',
    type:"Styling  Tips",
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minima quae vel quaerat sit ex, a eum ratione dolore aperiam. Vitae voluptatem laborum at? A ut laudantium repellat omnis provident?',
  },
  {
    id: '2',
    date: '2025-05-05',
    type:"Styling  Tips",
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ratione corrupti, delectus quis molestiae obcaecati nulla saepe? Inventore, nobis. Aspernatur, quidem aperiam vel a atque amet sapiente! Quisquam, quam reprehenderit.',
  },
  {
    id: '3',
    date: '2025-05-10',
    type:"Fashion Guide ",
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dignissimos cumque, eligendi dolor alias deserunt cum facere eius. Laborum debitis vitae labore dignissimos nisi sapiente facere rerum odit, et deserunt.',
  },
  {
    id: '4',
    date: '2025-05-15',
    type:"Styling  Tips",
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perspiciatis pariatur consequuntur praesentium veniam rem voluptatum nihil quasi facere. Perspiciatis, cum placeat? Magni delectus unde a voluptatibus repudiandae.',
  },
  
];
    return (
        <div>
            
            <div>
               <div className=' flex sm:gap-10 sm:justify-between flex-col gap-10 sm:flex-row px-10 sm:py-28'>
                 {blogData.map((items)=>(
                   <div key={items.id}>
                     <BlogsCards id={items.id} content={items.content} date={items.date} type={items.type} />
                   </div>
                ))}
               </div>
            </div>
        </div>
    );
}

export default BlogsSection;
