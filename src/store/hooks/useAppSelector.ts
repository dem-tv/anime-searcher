import { useSelector } from 'react-redux';
import type { RootState } from '../index.ts';

export const useAppSelector = useSelector.withTypes<RootState>();
