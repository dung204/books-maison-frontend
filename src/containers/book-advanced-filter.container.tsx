'use client';

import { Filter, MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookAdvancedFilterData } from '@/common/types/api/book/book-advanced-filter-data.type';
import { BookAdvancedFilterField } from '@/common/types/api/book/book-advanced-filter-field.type';
import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import { Category } from '@/common/types/api/category/category.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categoryHttpClient } from '@/lib/http/category.http';

interface BookFilterContainerProps {
  searchParams: Omit<BookSearchParams, keyof CommonSearchParams>;
  hiddenFields?: BookAdvancedFilterField[];
}

export default function BookAdvancedFilterContainer({
  searchParams,
  hiddenFields = [],
}: BookFilterContainerProps) {
  const router = useRouter();
  const [needFetchingCategories, setNeedFetchingCategories] = useState(true);
  const [currentPageCategories, setCurrentPageCategories] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterData, setFilterData] = useState<BookAdvancedFilterData>({
    publisher: searchParams.publisher || '',
    authorName: searchParams.authorName || '',
    publishedYearFrom: searchParams.publishedYearFrom || '',
    publishedYearTo: searchParams.publishedYearTo || '',
    minPages: searchParams.minPages || '',
    maxPages: searchParams.maxPages || '',
    categoryIds: !searchParams.categoryId
      ? []
      : Array.isArray(searchParams.categoryId)
        ? searchParams.categoryId
        : [searchParams.categoryId],
  });

  const handleToggleCategoryId = (categoryId: string) => {
    if (filterData.categoryIds.includes(categoryId)) {
      setFilterData({
        ...filterData,
        categoryIds: filterData.categoryIds.filter(id => id !== categoryId),
      });
    } else {
      setFilterData({
        ...filterData,
        categoryIds: [...filterData.categoryIds, categoryId],
      });
    }
  };

  const handleApplyFilter = () => {
    const url = new URL(document.location.href);

    url.searchParams.delete('publisher');
    url.searchParams.delete('authorName');
    url.searchParams.delete('publishedYearFrom');
    url.searchParams.delete('publishedYearTo');
    url.searchParams.delete('minPages');
    url.searchParams.delete('maxPages');
    url.searchParams.delete('categoryId');

    if (filterData.publisher) {
      url.searchParams.append('publisher', filterData.publisher);
    }

    if (filterData.authorName) {
      url.searchParams.append('authorName', filterData.authorName);
    }

    if (filterData.publishedYearFrom) {
      url.searchParams.append(
        'publishedYearFrom',
        filterData.publishedYearFrom,
      );
    }

    if (filterData.publishedYearTo) {
      url.searchParams.append('publishedYearTo', filterData.publishedYearTo);
    }

    if (filterData.minPages) {
      url.searchParams.append('minPages', filterData.minPages);
    }

    if (filterData.maxPages) {
      url.searchParams.append('maxPages', filterData.maxPages);
    }

    filterData.categoryIds.forEach(categoryId => {
      url.searchParams.append('categoryId', categoryId);
    });

    router.push(url.toString(), { scroll: false });
  };

  const handleClearFilter = () => {
    setFilterData({
      publisher: '',
      authorName: '',
      publishedYearFrom: '',
      publishedYearTo: '',
      minPages: '',
      maxPages: '',
      categoryIds: [],
    });
  };

  useEffect(() => {
    (async () => {
      if (!needFetchingCategories) return;

      const { data, pagination } = await categoryHttpClient.getAllCategories({
        page: currentPageCategories.toString(),
      });
      setCategories([...categories, ...data]);
      setCurrentPageCategories(pagination!.page + 1);
      setNeedFetchingCategories(pagination!.hasNextPage);
    })();
  }, [categories, currentPageCategories, needFetchingCategories]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Filter className="me-2 h-4 w-4" /> Advanced Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Advanced Filter</SheetTitle>
          <SheetDescription>
            Filter your search results by using the form below.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-8 py-4">
          {hiddenFields.includes('publisher') || (
            <div>
              <Label htmlFor="publisher">Publisher name</Label>
              <Input
                id="publisher"
                className="mt-2"
                value={filterData.publisher}
                onChange={e =>
                  setFilterData({ ...filterData, publisher: e.target.value })
                }
              />
            </div>
          )}
          {hiddenFields.includes('authorName') || (
            <div>
              <Label htmlFor="author">Author name</Label>
              <Input
                id="author"
                className="mt-2"
                value={filterData.authorName}
                onChange={e =>
                  setFilterData({ ...filterData, authorName: e.target.value })
                }
              />
            </div>
          )}
          {hiddenFields.includes('publishedYear') || (
            <div>
              <Label>Published year</Label>
              <div className="mt-2 grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <Select
                    value={filterData.publishedYearFrom}
                    onValueChange={val =>
                      setFilterData({
                        ...filterData,
                        publishedYearFrom: val === 'none' ? '' : val,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="From year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>From year</SelectLabel>
                        <SelectItem value="none">(None)</SelectItem>
                        {Array.from({
                          length: new Date().getFullYear() - 1900 + 1,
                        }).map((_, index) => (
                          <SelectItem
                            key={index}
                            value={`${new Date().getFullYear() - index}`}
                          >
                            {new Date().getFullYear() - index}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <MoveRight />
                </div>
                <div className="col-span-5">
                  <Select
                    value={filterData.publishedYearTo}
                    onValueChange={val =>
                      setFilterData({
                        ...filterData,
                        publishedYearTo: val === 'none' ? '' : val,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="To year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>To year</SelectLabel>
                        <SelectItem value="none">(None)</SelectItem>
                        {Array.from({
                          length: new Date().getFullYear() - 1900 + 1,
                        }).map((_, index) => (
                          <SelectItem
                            key={index}
                            value={`${new Date().getFullYear() - index}`}
                          >
                            {new Date().getFullYear() - index}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          {hiddenFields.includes('pages') || (
            <div>
              <Label>Number of pages</Label>
              <div className="mt-2 grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <Input
                    type="number"
                    placeholder="Min"
                    min={0}
                    value={filterData.minPages}
                    onChange={e =>
                      setFilterData({
                        ...filterData,
                        minPages: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <MoveRight />
                </div>
                <div className="col-span-5">
                  <Input
                    type="number"
                    placeholder="Max"
                    min={0}
                    value={filterData.maxPages}
                    onChange={e =>
                      setFilterData({
                        ...filterData,
                        maxPages: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {hiddenFields.includes('categoryIds') || (
            <div>
              <Label>Categories</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category.id}
                    variant={
                      filterData.categoryIds.includes(category.id)
                        ? 'default'
                        : 'outline'
                    }
                    className="cursor-pointer text-sm"
                    onClick={() => handleToggleCategoryId(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={handleClearFilter}>
            Clear filter
          </Button>
          <SheetClose asChild>
            <Button onClick={handleApplyFilter}>Apply</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
