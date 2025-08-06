import { Button } from '../Button/Button.tsx';
import { Typography } from '../Typography/Typography.tsx';

type Props = {
  currentPage: number;
  hasNext: boolean;
  paginationLink: (page: number) => string;
  onChangePagination?: (page: number) => void;
};

export function Pagination(props: Props) {
  if (props.currentPage === 1 && !props.hasNext) return null;

  const isFirstPage = props.currentPage === 1;

  const prevLink = props.paginationLink(props.currentPage - 1);
  const nextLink = props.paginationLink(props.currentPage + 1);

  const onClickPrev = () =>
    props.onChangePagination && props.onChangePagination(props.currentPage - 1);
  const onClickNext = () =>
    props.onChangePagination && props.onChangePagination(props.currentPage + 1);

  return (
    <div className={'flex gap-2 items-center'}>
      {!isFirstPage && (
        <Button tag={'NavLink'} onClick={onClickPrev} to={prevLink}>
          Prev
        </Button>
      )}
      <Typography aria-current={'page'}>
        Current page: {props.currentPage}
      </Typography>
      {props.hasNext && (
        <Button tag={'NavLink'} onClick={onClickNext} to={nextLink}>
          Next
        </Button>
      )}
    </div>
  );
}
