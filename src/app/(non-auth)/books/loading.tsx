import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BooksGridLoading from '@/components/ui/books-grid-loading';
import HomeBanner from '@/components/ui/home-banner';

export default function BooksLoading() {
  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <section className="grid grid-cols-3 gap-8">
          <BooksGridLoading />
        </section>
      </div>
    </>
  );
}
