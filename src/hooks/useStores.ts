import { useContext } from 'react';

import { RootStoreModel } from '../stores';
import { StoreContext } from '../contexts'

export const useStores = (): RootStoreModel => useContext(StoreContext);
