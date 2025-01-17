import { useEffect } from 'react';

import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { useLocation } from 'react-router-dom';

export default function Matomo() {
  const { trackPageView } = useMatomo();
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView();
  }, [trackPageView, pathname]);
}
