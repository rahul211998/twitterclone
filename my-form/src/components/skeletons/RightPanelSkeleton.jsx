import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const RightPanelSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Profile */}
      <div className="flex items-center gap-3">
        <Skeleton
          circle
          width={48}
          height={48}
          className="animate-pulse"
        />

        <div>
          <Skeleton
            width={120}
            height={15}
            className="animate-pulse"
          />

          <Skeleton
            width={80}
            height={12}
            className="animate-pulse"
          />
        </div>
      </div>

      {/* Suggested users */}
      <Skeleton
        width="100%"
        height={80}
        borderRadius={12}
        className="animate-pulse"
      />

      <Skeleton
        width="100%"
        height={80}
        borderRadius={12}
        className="animate-pulse"
      />

      <Skeleton
        width="100%"
        height={80}
        borderRadius={12}
        className="animate-pulse"
      />
    </div>
  );
};