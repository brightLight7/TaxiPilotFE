import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from './app.actions';
import { TaxipilotService } from 'src/app/shared/services/taxipilot.service';
//import { ProductService } from '../shared/service/product.service';

@Injectable()
export class ProductEffects {

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadUsers),
      mergeMap(action =>
        this.service.fetchUsers().pipe(
          map((users) => AppActions.loadUsersSuccess({users})),
          catchError((error) =>
            of(AppActions.loadUsersFail({error}))
          )
        )
      )
    );
  });

  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadUser),
      mergeMap(action =>
        this.service.fetchUsers().pipe(
          map((users) => AppActions.loadUsersSuccess({users})),
          catchError((error) =>
            of(AppActions.loadUsersFail({error}))
          )
        )
      )
    );
  });

  insertUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.insertUser),
      mergeMap(action =>
        this.service.fetchUsers().pipe(
          map((users) => AppActions.loadUsersSuccess({users})),
          catchError((error) =>
            of(AppActions.loadUsersFail({error}))
          )
        )
      )
    );
  });


  // loadProductCategories$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.loadProductCategories),
  //     mergeMap(() =>
  //       this.productService.loadProductCategorys().pipe(
  //         map((productCategories) => ProductActions.loadProductCategoriesSuccess({productCategories})),
  //         catchError((error) =>
  //           of(ProductActions.loadProductCategoriesFailure({error}))
  //         )
  //       )
  //     )
  //   );
  // });

  // loadProductSubCategories$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.loadProductSubCategories),
  //     mergeMap(action =>
  //       this.productService.loadProductSubCategorys().pipe(
  //         map((productSubCategories) => ProductActions.loadProductSubCategoriesSuccess({productSubCategories})),
  //         catchError((error) =>
  //           of(ProductActions.loadProductSubCategoriesFail({error}))
  //         )
  //       )
  //     )
  //   );
  // });

  // loadProductProductPhoto$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.LoadProductProductPhoto),
  //     mergeMap(() =>
  //       this.productService.loadProductProductPhoto().pipe(
  //         map((result) => ProductActions.LoadProductProductPhotoSuccess({ProductProductPhoto: result})),
  //         catchError((error) =>
  //           of(ProductActions.LoadProductProductPhotoFail({error}))
  //         )
  //       )
  //     )
  //   );
  // });

  // loadProductPhoto$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.LoadProductPhoto),
  //     mergeMap(() =>
  //       this.productService.loadProductPhoto().pipe(
  //         map((result) => ProductActions.LoadProductPhotoSuccess({ ProductPhoto: result})),
  //         catchError((error) =>
  //           of(ProductActions.LoadProductProductPhotoFail({error}))
  //         )
  //       )
  //     )
  //   );
  // });

  // loadProductFilterAttributes = createEffect(()=> {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.LoadProductFilterAttributes),
  //     mergeMap(() =>
  //     this.productService.loadProductFilterAttributes().pipe(
  //       map(result => ProductActions.LoadProductFilterAttributesSuccess({ ProductFilterAttributes: result })),
  //       catchError((error) =>
  //       of(ProductActions.LoadProductFilterAttributesFail(error))
  //       )
  //     )
  //     )
  //   )
  // })

  // loadProductAttributes$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProductActions.loadProductAttributes),
  //     mergeMap(action =>
  //       this.productService.loadProductAttributes(action.productCategoryId).pipe(
  //         map((productAttributes) => ProductActions.loadProductAttributesSuccess({productAttributes})),
  //         catchError((error) =>
  //           of(ProductActions.loadProductSubCategoriesFailure({error}))
  //         )
  //       )
  //     )
  //   );
  // });

  constructor(private actions$: Actions, private service: TaxipilotService) {}

}
