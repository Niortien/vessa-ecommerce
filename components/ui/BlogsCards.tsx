import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { BlogElements } from '@/type/blogs';
import { Button } from './button';
const BlogsCards = ({id,date,content,type}:BlogElements) => {
    return (
        <div key={id}>
            <Card className='border'>
  <CardHeader className='flex justify-between'>
    <CardTitle> {type}</CardTitle>
    <CardDescription> {date} </CardDescription>
  </CardHeader>
  <CardContent>
    <p> {content} </p>
    
  </CardContent>
  <CardFooter>
    <p>  <Button>show more</Button> </p>
  </CardFooter>
</Card>
        </div>
    );
}

export default BlogsCards;
