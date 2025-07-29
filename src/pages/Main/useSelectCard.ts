import { useAppSelector } from '../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../store/hooks/useAppDispatch.ts';
import type { AnimeShort } from '../../api/types/anime.types.ts';
import { selectSlice } from '../../store/slices/selectSlice.ts';
import { useMemo } from 'react';
import { getDownloadLink } from '../../utils/getDownloadLink.ts';

export function useSelectCard() {
  const selectedCards = useAppSelector((state) => state.select.selectedItems);
  const dispatch = useAppDispatch();

  const selectedCardsTotal = Object.values(selectedCards).filter(
    (card) => card
  ).length;

  const hasSelectedCards = !!selectedCardsTotal;
  const selectedCardsTotalLabel = `Selected cards: ${selectedCardsTotal}`;

  const downloadLink = useMemo(() => {
    const fileText = `${selectedCardsTotal} selected`;
    const fileName = `${selectedCardsTotal}_items.csv`;

    return {
      url: getDownloadLink(fileText),
      fileName,
    };
  }, [selectedCardsTotal]);

  function onSelectCard(card: AnimeShort) {
    if (selectedCards[card.id]) {
      dispatch(selectSlice.actions.unselectItem(card));
      return;
    }

    dispatch(selectSlice.actions.selectItem(card));
  }

  function unselectAllCards() {
    dispatch(selectSlice.actions.unselectAll());
  }

  function checkSelection(card: AnimeShort) {
    return !!selectedCards[card.id];
  }

  return {
    selectedCards,
    onSelectCard,
    hasSelectedCards,
    unselectAllCards,
    selectedCardsTotalLabel,
    checkSelection,
    downloadLink,
  };
}
