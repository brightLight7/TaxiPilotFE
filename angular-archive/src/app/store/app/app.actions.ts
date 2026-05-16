// import { ProductPhotoModel } from './../shared/model/product-photo.model';
// import { ProductProductPhotoModel } from './../shared/model/product-product-photo.model';
// import { createAction, props } from '@ngrx/store';
// import { Product } from '../shared/model/product.model';
// import { ProductsCategoryModel } from '../shared/model/product-category.model';
// import { ProductSubCategoryModel } from '../shared/model/product-subcategory.model';
// import { ProductFilterAttributesModel } from '../shared/model/product-filter-attributes.model';
// import { ProductsBasketItemsModel } from '../shared/model/product.basket.items.model';

import { createAction, props } from "@ngrx/store";
import { UserLogin } from "src/app/shared/models/user.model";
import { Observable } from 'rxjs';
import { GoogleMapInfo } from "src/app/model/google-map-api.model";
import { SettingObject } from 'src/app/app.state';

export const pickupDestToggle = createAction (
  '[Pickup Dest] Toggle',
  props<{isAirportPickup: boolean}>()
)

export const savePickupAction = createAction(
  '[Pickup] Save',
  props<{pickup: string}>()
)

export const saveDestAction = createAction(
  '[Dest] Save',
  props<{dest: string}>()
)

export const airportAction = createAction(
  '[Airport] Save',
  props<{airport: string}>()
)
export const fareAction = createAction(
  '[Fare] Fare Info - Fare Distance Duration',
  props<{fareInfo: GoogleMapInfo}>()
)

export const datesavePickupAction = createAction(
  '[Time] Date Time',
  props<{datePickup: string}>()
)

export const timesavePickupAction = createAction(
  '[Time] Pickup Time',
  props<{timePickup: string}>()
)

export const SavePlacesArray = createAction(
  '[Places Array] Save Places Array',
  props<{placesArrays: { addr: string, latitude: number; longitude: number; }}>()
)

export const saveVisitorPriceEnqCount = createAction(
  '[Visitor Price Enquiry Count] Get Count'
)

export const updateSettingsObj = createAction(
  '[Setting] Update Setting',
  props<{ settingObj: Partial<SettingObject> }>()
)

export const emailSent = createAction(
  '[Email] Sent True or False',
  props<{ emailSent: boolean }>()
)

export const isUserLogin = createAction(
  '[Login] User logged True or False',
  props<{ login: boolean }>()
)

export const saveVisitor = createAction(
  '[Visitor] Save New Visitor',
  props<{ visitor: UserLogin }>()
)

export const fetchVisitor = createAction(
  '[Visitor] Fetch Visitors',
  props<{ visitors: UserLogin[] }>()
)

export const setGlobalMsg = createAction(
  '[GlobalMsg] Set Global Message',
  props<{ msg: string }>()
)

export const showMobileView = createAction(
  '[Show] Mobile View',
  props<{showMobileView: boolean}>()
);

export const loadUser = createAction(
  '[Load] A User',
  props<{id: number}>()
);

export const loadUsers = createAction(
  '[Load] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Load] User loaded successfully',
  props<{users: UserLogin[]}>()
);

export const loadUsersFail = createAction(
  '[Users] Load Users Fail',
  props<{ error: string }>()
);

export const insertUser = createAction(
  '[Insert] insert User',
  props<{user: UserLogin}>()
);

export const insertUserSuccess = createAction(
  '[Insert] insert loaded successfully',
  props<{user: UserLogin}>()
);

export const insertUserFail = createAction(
  '[Insert] insert User Fail',
  props<{ error: string }>()
);

export const UpdateSettingsObj = createAction(
  '[Setting] Update Setting',
  props<{ settingObj: Partial<SettingObject> }>()
)

export const EmailSent = createAction(
  '[Email] Sent True or False',
  props<{ emailSent: boolean }>()
)

export const IsUserLogin = createAction(
  '[Login] User logged True or False',
  props<{ login: boolean }>()
)

export const SaveVisitor = createAction(
  '[Visitor] Save New Visitor',
  props<{ visitor: UserLogin }>()
)

export const FetchVisitor = createAction(
  '[Visitor] Fetch Visitors',
  props<{ visitors: UserLogin[] }>()
)

export const SetGlobalMsg = createAction(
  '[GlobalMsg] Set Global Message',
  props<{ msg: string }>()
)
export const SaveVisitorPriceEnqCount = createAction(
  '[Visitor Price Enquiry Count] Get Count'
)

export const showQuoteWindow = createAction(
  '[Show Quote Window] Set Show Quote Window True or False',
  props<{ showQuoteWindow: boolean }>()
)

export const setDisableGlobal = createAction(
  '[Disable Global] Set Disable Global True or False',
  props<{ disableGlobal: boolean }>()
)
// export const insertProductSubCategoriesSuccess = createAction(
//   '[ProductSub Categories] Load Product Sub Categories Success',
//   props<{ productSubCategories: ProductSubCategoryModel[] }>()
// );

// export const loadProductSubCategoriesFail = createAction(
//   '[ProductSub Categories] Load Product Sub Categories Fail',
//   props<{ error: string }>()
// );

// export const loadProductCategoriesFailure = createAction(
//   '[Product Categories] Load Product Categories Fails',
//   props<{ error: string }>()
// );

// export const loadProductCategoriesSuccess = createAction(
//   '[Product Categories] Load Product Categories Success',
//   props<{ productCategories: ProductsCategoryModel[] }>()
// );

// export const loadProductCategories = createAction(
//   '[Product Categories] Load Product Categories'
// );

// export const loadProducts = createAction(
//   '[Product] Fetch all products',
// );

// export const loadProductsSuccess = createAction(
//   '[Product] Load Products Success',
//   props<{ products: Product[] }>()
// );

// export const loadProductsFailure = createAction(
//   '[Product] Load Products Fails',
//   props<{ error: string }>()
// );

// export const toggleProductCode = createAction('[Product] Toggle product code');

// export const AddToBasket = createAction(
//   '[Product Basket] Add to basket',
//   props<{ productsBasket: ProductsBasketItemsModel }>()
// );

// export const removeProductFromBasket = createAction(
//   '[Product Basket] Remove from basket',
//   props<{ id: number; }>()
// );

// export const BasketTotal = createAction(
//   '[Product Basket] Basket total',
//   props<{ productsBasketTotal: number; }>()
// );

// export const BasketCountAdd = createAction(
//   '[Product Basket] Basket count add',
//   props<{ productsBasketCount: number; }>()
// );

// export const BasketCountMinus = createAction(
//   '[Product Basket] Basket count minus',
//   props<{ productsBasketCount: number; }>()
// );

// export const SelectedCategoryId = createAction(
//   '[Product] Category Id selected',
//   props<{ SlectedProductCategoryId: number }>(),
// )

// export const SelectedSubCategoryId = createAction(
//   '[Product] Sub Category Id selected',
//   props<{ SelectedProductSubCategoryId: number }>(),
// )

// export const SizeFilter = createAction(
//   '[Product] Size Filter',
//   props<{ size: number[] }>(),
// )

// export const ColorFilter = createAction(
//   '[Product] Size Filter',
//   props<{ color: string[] }>(),
// )

// export const LoadProductProductPhoto = createAction(
//   '[Product] Load Product Product Photo',
// )

// export const LoadProductProductPhotoSuccess = createAction(
//   '[Product] Load Product Product Photo Success',
//   props<{ ProductProductPhoto: ProductProductPhotoModel[] }>(),
// )

// export const LoadProductProductPhotoFail = createAction(
//   '[Product] Load ProductProduct Photo Fail',
//   props<{ error: string }>(),
// )

// export const LoadProductPhoto = createAction(
//   '[Product] Load Product Photo',
// )

// export const LoadProductPhotoSuccess = createAction(
//   '[Product] Load Product Photo Success',
//   props<{ ProductPhoto: ProductPhotoModel[] }>(),
// )

// export const LoadProductPhotoFail = createAction(
//   '[Product] Load Product Photo Fail',
//   props<{ error: string }>(),
// )

// export const LoadProductFilterAttributes = createAction(
//   '[Product] Load product filter attributes',
// )

// export const LoadProductFilterAttributesSuccess = createAction(
//   '[Product] Load product filter attributes Success',
//   props<{ ProductFilterAttributes: ProductFilterAttributesModel[]}>(),
// )

// export const LoadProductFilterAttributesFail = createAction(
//   '[Product] Load product filter attributes Fail',
//   props<{error: string}>(),
// )
