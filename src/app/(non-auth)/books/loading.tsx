import HomeBanner from '@/components/ui/home-banner';
import { BooksGridSkeleton } from '@/components/ui/skeletons';

export default function BooksLoading() {
  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <BooksGridSkeleton />
      </div>
    </>
  );
}
