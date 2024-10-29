import OverViewPage from './_components/overview';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard : Overview'
};

export default function page() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <OverViewPage />
    </Suspense>
  );
}
