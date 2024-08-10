import Link from 'next/link';

import { Checkout } from '@/common/types/api/checkout/checkout.type';
import CheckoutStatusBadge from '@/components/ui/checkout-status-badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CheckoutDetailsContainerProps {
  checkout: Checkout;
}

export default function CheckoutDetailsContainer({
  checkout,
}: CheckoutDetailsContainerProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div>{checkout.id}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to see details of this checkout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout Details</DialogTitle>
          <DialogDescription>Checkout ID: {checkout.id}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2">
          <div className="col-span-5 text-right">Book:</div>
          <div className="col-span-7">
            <Link
              href={`/book/${checkout.book.id}`}
              className="hover:underline active:underline"
            >
              {checkout.book.title}
            </Link>
          </div>
          <div className="col-span-5 text-right">Status:</div>
          <div className="col-span-7">
            <CheckoutStatusBadge status={checkout.status} />
          </div>
          <div className="col-span-5 text-right">Created at:</div>
          <div className="col-span-7">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'long',
            }).format(new Date(checkout.createdTimestamp))}
          </div>
          <div className="col-span-5 text-right">Due at:</div>
          <div className="col-span-7">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'long',
            }).format(new Date(checkout.dueTimestamp))}
          </div>
          <div className="col-span-5 text-right">Returned at:</div>
          <div className="col-span-7">
            {!checkout.returnedTimestamp
              ? 'N/A'
              : new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'long',
                }).format(new Date(checkout.returnedTimestamp))}
          </div>
          <div className="col-span-5 text-right">Note:</div>
          <div className="col-span-7 line-clamp-3">
            {!checkout.note ? 'N/A' : checkout.note}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
