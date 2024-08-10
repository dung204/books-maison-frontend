import { AxiosError } from 'axios';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import useAuth from '@/common/hooks/use-auth.hook';
import { Fine } from '@/common/types/api/fine/fine.type';
import { TransactionMethod } from '@/common/types/api/transaction/transaction-method.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoadingIndicator from '@/components/ui/loading-indicator';
import MomoIcon from '@/components/ui/momo-icon/momo-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { fineHttpClient } from '@/lib/http/fine.http';

interface PayFineContainerProps {
  fine: Fine;
}

export default function PayFineContainer({ fine }: PayFineContainerProps) {
  const { accessToken } = useAuth();
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);

  const handleRedirectToPurchaseLink = async (method: TransactionMethod) => {
    try {
      setIsCreatingTransaction(true);

      const { data: transaction } = await fineHttpClient.payFine(
        accessToken!,
        fine.id,
        method,
        location.href.replace(location.search, ''),
      );
      location.href = transaction.purchaseUrl;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          `Failed to redirect to purchase link: ${error.response?.data.message}`,
        );
      }
    }
    setIsCreatingTransaction(false);
  };

  if (fine.checkout.status !== 'RETURNED') {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button className="cursor-default opacity-40">Pay Fine</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>You can only pay fines for returned checkouts.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Pay Fine</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Choose a payment method</DialogTitle>
          </DialogHeader>
          <Alert className="bg-yellow-100 text-yellow-800">
            <Info className="h-4 w-4" color="rgb(133 77 14)" />
            <AlertDescription>
              Cash method is not available in the online system. Please go to
              the library in person to pay.
            </AlertDescription>
          </Alert>
          <div className="mt-2 flex justify-center space-x-4">
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-2 transition-all hover:opacity-70"
              onClick={() =>
                handleRedirectToPurchaseLink(TransactionMethod.MOMO)
              }
            >
              <MomoIcon width={100} height={100} />
              <div>Momo</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isCreatingTransaction}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Redirecting to purchase link...
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDescription className="mt-2 flex justify-center">
            <LoadingIndicator width={60} height={60} />
          </AlertDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
