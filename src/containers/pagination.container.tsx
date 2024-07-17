'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination as PaginationDto } from '@/common/types/pagination.type';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PaginationContainerProps {
  pagination: PaginationDto;
}

export default function PaginationContainer({
  pagination,
}: PaginationContainerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const otherSearchParams = useSearchParams()
    .toString()
    .replaceAll(/&?((page=\d+&pageSize=\d+)|(pageSize=\d+&page=\d+))&?/g, '');

  const handleChangePageSize = (pageSize: string) => {
    router.push(
      `${pathname}?page=1&pageSize=${pageSize}${otherSearchParams ? `&${otherSearchParams}` : ''}`,
    );
  };

  return (
    <Pagination className="items-center justify-between">
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
            href={`${pathname}?page=${pagination.page - 1}&pageSize=${pagination.pageSize}`}
            className={cn({
              'pointer-events-none opacity-60': !pagination.hasPreviousPage,
            })}
          />
        </PaginationItem>
        {pagination.totalPage <= 7 ? (
          Array.from({ length: pagination.totalPage }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href={`${pathname}?page=${index + 1}&pageSize=${pagination.pageSize}`}
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
                  href={`${pathname}?page=${index + 1}&pageSize=${pagination.pageSize}`}
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
                href={`${pathname}?page=${pagination.totalPage}&pageSize=${pagination.pageSize}`}
              >
                {pagination.totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : pagination.page >= pagination.totalPage - 3 &&
          pagination.page <= pagination.totalPage ? (
          <>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=1&pageSize=${pagination.pageSize}`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {Array.from({ length: 5 }).map((_, index) => (
              <PaginationItem key={pagination.totalPage - 4 + index}>
                <PaginationLink
                  href={`${pathname}?page=${pagination.totalPage - 4 + index}&pageSize=${pagination.pageSize}`}
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
              <PaginationLink
                href={`${pathname}?page=1&pageSize=${pagination.pageSize}`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=${pagination.page - 1}&pageSize=${pagination.pageSize}`}
              >
                {pagination.page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=${pagination.page}&pageSize=${pagination.pageSize}`}
                isActive
              >
                {pagination.page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`}
              >
                {pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=${pagination.totalPage}&pageSize=${pagination.pageSize}`}
              >
                {pagination.totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={`${pathname}?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`}
            className={cn({
              'pointer-events-none opacity-60': !pagination.hasNextPage,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
