import React from 'react';

const TrackCard = ({ title, artist, addedBy, onDelete }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 flex justify-between items-center transition hover:shadow-md">
      <div className="flex-1">
        <h4 className="font-semibold text-zinc-800 dark:text-white text-base truncate">
          {title}
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-300 truncate">{artist}</p>
        <p className="text-xs text-zinc-400 mt-1">
          added by <span className="font-medium">{addedBy || 'Anonymous'}</span>
        </p>
      </div>

      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TrackCard;
