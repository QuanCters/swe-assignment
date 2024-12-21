import { checkStatus, updatePageBalance } from '@/api/buy';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute('/_private/_student/redirect')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const pageCount = Number(localStorage.getItem('pageCount'))
  const isFromHome = localStorage.getItem('isFromHome') === 'true'
  const orderId = localStorage.getItem('orderId');

  const updateMutation = useMutation({
    mutationFn: (pageCount: any) => {
      const dataPageCount = {
        pageCount: pageCount,
      };
      return updatePageBalance(dataPageCount);
    },
    onError: (error: any) => {
      alert(error);
    },
  });


  const statusMutation = useMutation({
    mutationFn: (orderId: any) => {
      const data = {
        orderId: orderId,
      };
      return checkStatus(data);
    },
    onError: (error: any) => {
      alert(error);
    },
  });


  useEffect(() => {
    // Code to run on initial load
    statusMutation.mutate(orderId);
    updateMutation.mutate(pageCount);
      
    localStorage.removeItem('pageCount');
    localStorage.removeItem('orderId');
    localStorage.removeItem('isFromHome');
    
    alert('Success. Navigating back');
    if (isFromHome) {
      navigate({to: '/'});
    }
    else {
      navigate({to: '/print'});
    }

  }, []);

  return (
    <div>
      Handling transaction...
    </div>
  );
  
}
