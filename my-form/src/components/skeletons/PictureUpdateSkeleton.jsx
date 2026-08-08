import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PictureUpdateSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5">

      {/* Profile picture */}
      <Skeleton
        circle
        width={160}
        height={160}
        className="animate-pulse"
      />

      {/* Text */}
      <div className="mt-5">
        <Skeleton
          width={150}
          height={16}
          borderRadius={6}
          className="animate-pulse"
        />
      </div>

      {/* Small loading text */}
      <div className="mt-2">
        <Skeleton
          width={100}
          height={12}
          borderRadius={5}
          className="animate-pulse"
        />
      </div>

    </div>
  );
};

export default PictureUpdateSkeleton;