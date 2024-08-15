import CategoriesGridLoading from '@/components/ui/categories-grid-loading';
import HomeBanner from '@/components/ui/home-banner';

export default function CategoriesLoading() {
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <CategoriesGridLoading />
      </div>
    </>
  );
}
