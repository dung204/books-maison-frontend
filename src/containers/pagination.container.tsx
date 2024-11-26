'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { Pagination as PaginationDto } from '@/common/types';
import { PaginationUtils } from '@/common/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/cn';

interface PaginationContainerProps extends ComponentProps<typeof Pagination> {
  pagination: PaginationDto;
}

export function PaginationContainer({
  className,
  pagination,
  ...props
}: PaginationContainerProps) {
  const router = useRouter();

  const handleChangePageSize = (pageSize: string) => {
    const url = new URL(location.href);
    url.searchParams.set('page', PaginationUtils.DEFAULT_PAGE.toString());
    url.searchParams.set('pageSize', pageSize);
    router.push(url.href, { scroll: false });
  };

  const handleChangePage = (page: number) => {
    const url = new URL(location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.href, { scroll: false });
  };

  return (
    <Pagination
      className={cn('items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center justify-stretch gap-4">
        <div>Show</div>
        <Select
          onValueChange={handleChangePageSize}
          value={`${pagination.pageSize}`}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>items</div>
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleChangePage(pagination.page - 1)}
            className={cn({
              'pointer-events-none opacity-60': !pagination.hasPreviousPage,
            })}
          />
        </PaginationItem>
        {pagination.totalPage <= 7 ? (
          Array.from({ length: pagination.totalPage }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => handleChangePage(index + 1)}
                isActive={pagination.page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : pagination.page >= 1 && pagination.page <= 4 ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => handleChangePage(index + 1)}
                  isActive={pagination.page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleChangePage(pagination.totalPage)}
              >
                {pagination.totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : pagination.page >= pagination.totalPage - 3 &&
          pagination.page <= pagination.totalPage ? (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handleChangePage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {Array.from({ length: 5 }).map((_, index) => (
              <PaginationItem key={pagination.totalPage - 4 + index}>
                <PaginationLink
                  onClick={() =>
                    handleChangePage(pagination.totalPage - 4 + index)
                  }
                  isActive={
                    pagination.page === pagination.totalPage - 4 + index
                  }
                >
                  {pagination.totalPage - 4 + index}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handleChangePage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleChangePage(pagination.page - 1)}
              >
                {pagination.page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleChangePage(pagination.page)}
                isActive
              >
                {pagination.page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleChangePage(pagination.page + 1)}
              >
                {pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleChangePage(pagination.totalPage)}
              >
                {pagination.totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleChangePage(pagination.page + 1)}
            className={cn({
              'pointer-events-none opacity-60': !pagination.hasNextPage,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
