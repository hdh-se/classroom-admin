import React, { useEffect, useState } from 'react';
import { HTMLRootFontSize } from '../utils/contants';

const useCollapsible = (refCollapse, collapse, paddingContentBottom = 0) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapse);
  const [contentHeight, setContentHeight] = useState<number | undefined>(collapse ? 0 : undefined);
  const [contentPosition, setContentPosition] = useState<'absolute' | 'unset'>(
    isCollapsed ? 'absolute' : 'unset',
  );

  useEffect(() => {
    if (!contentHeight || isCollapsed || !refCollapse.current) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver((el) => {
      const contentSelectionHeightRaw = el[0].contentRect.height;
      const contentSelectionHeight = contentSelectionHeightRaw;
      setContentHeight(contentSelectionHeight + paddingContentBottom * HTMLRootFontSize);
    });

    resizeObserver.observe(refCollapse.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [contentHeight, isCollapsed]);

  useEffect(() => {
    if (!isCollapsed)
      setContentHeight(
        refCollapse.current?.getBoundingClientRect().height +
          paddingContentBottom * HTMLRootFontSize,
      );
    else {
      setContentHeight(0);
    }

    const isCollapsedOld = !isCollapsed;
    if (isCollapsedOld) {
      const timeOut = setTimeout(() => {
        setContentPosition(isCollapsed ? 'absolute' : 'unset');
        clearTimeout(timeOut);
      }, 100);
    } else {
      setContentPosition(isCollapsed ? 'absolute' : 'unset');
    }
  }, [isCollapsed]);

  return { isCollapsed, setIsCollapsed, contentHeight, contentPosition };
};

export default useCollapsible;
