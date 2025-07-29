import { MainLayout } from '../../components/layouts/MainLayout/MainLayout.tsx';
import { SearchForm } from '../../components/widgets/SearchForm/SearchForm.tsx';
import { PageList } from '../../components/ui/PageList/PageList.tsx';
import { AnimeCard } from '../../components/ui/AnimeCard/AnimeCard.tsx';
import { NavLink, useOutlet } from 'react-router';
import { Icon } from '../../components/ui/Icon/Icon.tsx';
import { Pagination } from '../../components/ui/Pagination/Pagination.tsx';
import { useGetList } from './useGetList.ts';
import { useSelectCard } from './useSelectCard.ts';
import { SelectCard } from '../../components/ui/SelectCard/SelectCard.tsx';
import { SelectInfo } from '../../components/ui/SelectInfo/SelectInfo.tsx';
import { Button } from '../../components/ui/Button/Button.tsx';

function Main() {
  const detailsContent = useOutlet();

  const {
    searchPageLink,
    animeList,
    pagination,
    loading,
    errorMessage,
    onSearch,
    getCardUrl,
    getPagableUrl,
    onChangePagination,
    currentPage,
  } = useGetList();

  const {
    onSelectCard,
    unselectAllCards,
    hasSelectedCards,
    selectedCardsTotalLabel,
    checkSelection,
    downloadLink,
  } = useSelectCard();

  return (
    <MainLayout
      sideContent={detailsContent}
      headerContent={<SearchForm onSubmit={onSearch} />}
      closeElement={
        detailsContent && (
          <NavLink aria-label={'Collapse'} to={searchPageLink}>
            <Icon rotate="180" name="expand-left" />
          </NavLink>
        )
      }
      bottomContent={
        hasSelectedCards && (
          <SelectInfo
            leftContent={selectedCardsTotalLabel}
            rightContent={
              <>
                <Button onClick={unselectAllCards}>UnselectAll</Button>
                <Button
                  tag="a"
                  href={downloadLink.url}
                  download={downloadLink.fileName}
                >
                  Download
                </Button>
              </>
            }
          />
        )
      }
    >
      {errorMessage ? (
        errorMessage
      ) : (
        <PageList
          pagination={
            pagination && (
              <Pagination
                hasNext={pagination.hasNextPage}
                paginationLink={getPagableUrl}
                currentPage={currentPage}
                onChangePagination={onChangePagination}
              />
            )
          }
          list={animeList}
          loading={loading}
          renderItem={(item) => (
            <SelectCard
              onSelect={() => onSelectCard(item)}
              selected={checkSelection(item)}
            >
              <AnimeCard to={getCardUrl(item)} anime={item} />
            </SelectCard>
          )}
          itemKey="id"
        />
      )}
    </MainLayout>
  );
}

export default Main;
