import { useSession } from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import { useEffect } from 'react';
import LoadingPageSpinner from "@/components/LoadingPageSpinner";
import {Box} from "@mui/material";

type Props = {
  children: React.ReactElement;
};

/*
  add the requireAuth property to the page component
  to protect the page from unauthenticated users
  e.g.:
  OrderDetail.requireAuth = true;
  export default OrderDetail;
 */

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === 'authenticated';
  const unAuthorized = sessionStatus === 'unauthenticated';
  
  // if the user refreshed the page or somehow navigated to the protected page
  if(unAuthorized) {
    router.push('/login')
  }

  // if the user is authorized, render the page
  // otherwise, render nothing while the router redirects him to the login page
  return authorized ? <div>{children}</div> : <LoadingPageSpinner />;
};