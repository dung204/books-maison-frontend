import { type Metadata } from 'next';

interface AuthorDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: AuthorDetailsPageProps): Promise<Metadata> {
  return {
    title: id,
  };
}

export default function AuthorDetailsPage({
  params: { id },
}: AuthorDetailsPageProps) {
  return <h1>Author ID: {id}</h1>;
}
