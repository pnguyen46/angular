import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import {tap,catchError} from 'rxjs/operators';
import { IProduct } from './product';



@Injectable({
    providedIn: 'root'
})
export class ProductService{

    private productUrl = 'api/products/products.json'

    
    constructor(private http: HttpClient){
        
    }
    
    getProducts():Observable<IProduct[]> {
        //HttpClient & Observable Setup, exception handling
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))), // access data directly. allow for easy debug
            catchError(this.handleError)// handle errors from server-side and client-side
        );
        // [ 
        //     {
        //         "productId":2,
        //         "productName": "Garden Cart",
        //         "productCode": "GDN-0023",
        //         "releaseDate": "March 18,2019",
        //         "description": "15 gallon capacity rolling garden cart",
        //         "price": 32.99,
        //         "starRating": 4.2,
        //         "imageUrl": "assets/images/garden_cart.png"
        //     },
        //     {
        //         "productId":5,
        //         "productName": "Hammer",
        //         "productCode": "TBX-0048",
        //         "releaseDate": "May 21,2019",
        //         "description": "Curved claw steel hammer",
        //         "price": 8.9,
        //         "starRating": 4.8,
        //         "imageUrl": "assets/images/hammer.png"
        //     }
        // ];

        
    }

    private handleError(err : HttpErrorResponse){
        //in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it in the console
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        }else{
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}