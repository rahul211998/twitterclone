import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DeletePostSkeleton = () => {
  return (
    <div className="w-80 rounded-xl bg-gray-900 border border-gray-700 p-6 shadow-xl">

      {/* Title */}
      <Skeleton
        width= "100%"
        height={22}
        borderRadius={6}
        className="animate-pulse"
      />



      {/* Deleting */}
      <div className="flex items-center justify-center gap-2 mt-6">

        <span className="text-gray-300 text-sm">
          Deleting
        </span>

        {/* Three animated dots */}
        <div className="flex gap-1 items-center">
          <Skeleton
            circle
            width={7}
            height={7}
            className="animate-pulse"
          />

          <Skeleton
            circle
            width={7}
            height={7}
            className="animate-pulse"
          />

          <Skeleton
            circle
            width={7}
            height={7}
            className="animate-pulse"
          />
        </div>

      </div>

    </div>
  );
};

export default DeletePostSkeleton;