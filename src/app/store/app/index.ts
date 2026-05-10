import { createFeatureSelector, createSelector } from '@ngrx/store';


import { ApplicationState } from './app.reducer';



const getAppFeatureState = createFeatureSelector<ApplicationState>('product');

export const getShowMobileView = createSelector(getAppFeatureState, state => state.showMobileView);

// export const getProductCategories = createSelector(getProductFeatureState, state => state.productCategories);
// export const getProductSubCategories = createSelector(getProductFeatureState, state => state.productSubCategories);
// export const getProductSubCategoriesIdsOnly = createSelector(getProductFeatureState, state => state.productSubCategoriesIdsOnly);

// export const getProductsList = createSelector(getProductFeatureState, state => state.products);

// export const getProductBasket = createSelector(getProductFeatureState, state => state.productsBasket);
// //export const getProductBasketTotal = createSelector(getProductFeatureState, state => state.productsBasketTotal);
// //export const getproductsBasketCount = createSelector(getProductFeatureState, state => state.productsBasketCount);

// export const getselectedProductCategoryId = createSelector(getProductFeatureState, state => state.selectedProductCategoryId);
// export const getselectedProductSubCategoryId = createSelector(getProductFeatureState, state => state.selectedProductSubCategoryId);

// export const getProductProductPhoto = createSelector(getProductFeatureState, state => state.productProductPhoto);
// export const getProductPhoto = createSelector(getProductFeatureState, state => state.productPhoto);


// export const getProductSize = createSelector(getProductFeatureState, state => state.size);
// export const getProductColor = createSelector(getProductFeatureState, state => state.color);

//export const getProductFilterAttributes = createSelector(getProductFeatureState, state => state.productFilterAttributes);
