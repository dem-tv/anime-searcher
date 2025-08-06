export function PageLoader() {
  return (
    <div className={'h-full w-full pt-8'}>
      <div
        data-testid={'page-loader'}
        aria-busy="true"
        className="w-24 m-auto h-24 border-4 border-t-yellow-500 dark:border-t-pink-500 border-gray-300 rounded-full animate-spin"
      ></div>
    </div>
  );
}
