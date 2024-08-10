import { CheckoutSearchParams } from '@/common/types/api/checkout/checkout-search-params.type';
import { Checkout } from '@/common/types/api/checkout/checkout.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { HttpClient } from '@/lib/http/core.http';

class CheckoutHttpClient extends HttpClient {
  public getCheckoutsOfCurrentUser(
    accessToken: string,
    params?: CheckoutSearchParams,
  ) {
    return this.get<SuccessResponse<Checkout[]>>('/me/checkouts', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public createCheckout(accessToken: string, bookId: string) {
    return this.post(
      '/me/checkouts',
      {
        bookId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  public getCheckoutById(accessToken: string, id: string) {
    return this.get<SuccessResponse<Checkout>>(`/checkouts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

const checkoutHttpClient = new CheckoutHttpClient();
export { checkoutHttpClient, CheckoutHttpClient };
