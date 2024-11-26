import HomeBanner from '@/components/ui/home-banner';
import { CategoriesGridSkeleton } from '@/components/ui/skeletons';

export default function CategoriesLoading() {
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <CategoriesGridSkeleton />
      </div>
    </>
  );
}
