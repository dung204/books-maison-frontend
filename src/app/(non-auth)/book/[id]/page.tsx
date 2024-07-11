import { type Metadata } from 'next';

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: BookDetailsPageProps): Promise<Metadata> {
  return {
    title: id,
  };
}

export default function BookDetailsPage({
  params: { id },
}: BookDetailsPageProps) {
  return <h1>Book ID: {id}</h1>;
}
