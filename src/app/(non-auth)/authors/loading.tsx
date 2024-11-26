import HomeBanner from '@/components/ui/home-banner';
import { AuthorsGridSkeleton } from '@/components/ui/skeletons';

export default function AuthorsLoading() {
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <AuthorsGridSkeleton />
      </div>
    </>
  );
}
