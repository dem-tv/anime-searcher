import { NavLink } from 'react-router';

type Props = {
  currentPage: number;
  hasNext: boolean;
  paginationLink: (page: number) => string;
  onChangePagination: (page: number) => void;
};

export function Pagination(props: Props) {
  if (props.currentPage === 1 && !props.hasNext) return null;

  const isFirstPage = props.currentPage === 1;

  const prevLink = props.paginationLink(props.currentPage - 1);
  const nextLink = props.paginationLink(props.currentPage + 1);

  const onClickPrev = () => props.onChangePagination(props.currentPage - 1);
  const onClickNext = () => props.onChangePagination(props.currentPage + 1);

  const cn =
    'border px-2 bg-white min-w-8 h-8 rounded text-center block hover:shadow';

  return (
    <div className={'flex gap-2'}>
      {!isFirstPage && (
        <NavLink className={cn} onClick={onClickPrev} to={prevLink}>
          Prev
        </NavLink>
      )}
      <p aria-current={'page'}>Current page: {props.currentPage}</p>
      {props.hasNext && (
        <NavLink className={cn} onClick={onClickNext} to={nextLink}>
          Next
        </NavLink>
      )}
    </div>
  );
}
