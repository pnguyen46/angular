import{ Component, OnInit } from '@angular/core';
import{IProduct} from './product';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'] //import css specifically for this component. use comma in array to add more stylesheet
})
//OnInit -> life cycle hooks
export class ProductListComponent implements OnInit {
    pageTitle:string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    //getter and setter methods
    _listFilter: string;
    
    get listFilter() : string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    //implemented Product Interface
    filteredProducts: IProduct[];
    products: IProduct[] = [ 
        {
            "productId":2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18,2019",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "assets/images/garden_cart.png"
        },
        {
            "productId":5,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate": "May 21,2019",
            "description": "Curved claw steel hammer",
            "price": 8.9,
            "starRating": 4.8,
            "imageUrl": "assets/images/hammer.png"
        }
    ];

    // constructor to set default values
    constructor(){
        this.filteredProducts = this.products;
        this.listFilter = 'cart';
    }

    performFilter(filterBy: string) : IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    }

    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit():void{
        console.log('In OnInit');
    }
    //4th step for @Output
    onRatingClicked(message:string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}