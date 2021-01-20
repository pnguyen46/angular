import{ Component, OnInit } from '@angular/core';
import{IProduct} from './product';
import { ProductService } from './product.service';

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
    errorMessage:string;

    //implements Product Interface
    filteredProducts: IProduct[];
    products: IProduct[] = [];


    // constructor to set default values
    constructor(private productService: ProductService){
        // this.listFilter = 'cart';
    }

    //getter and setter methods
    _listFilter: string;

    get listFilter() : string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    performFilter(filterBy: string) : IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    }

    //Use to display image
    toggleImage():void {
        this.showImage = !this.showImage;
    }

    
    ngOnInit():void{
        // this.products = this.productService.getProducts();
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;// make sure the product array is loaded before assigned to filteredProduct array
            },
            error: err => {
                this.errorMessage = err;
            }
            
        });
        // this.filteredProducts = this.products;
    }

    //Pass data out of nested component
    //4th step for @Output
    onRatingClicked(message:string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}