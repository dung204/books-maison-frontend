import AuthorsGridLoading from '@/components/ui/authors-grid-loading';
import HomeBanner from '@/components/ui/home-banner';

export default function AuthorsLoading() {
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <section className="grid grid-cols-4 gap-8">
          <AuthorsGridLoading />
        </section>
      </div>
    </>
  );
}
