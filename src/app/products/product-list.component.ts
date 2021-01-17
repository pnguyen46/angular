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
    products: IProduct[] = [];

    // constructor to set default values
    constructor(private productService: ProductService){
        // this.listFilter = 'cart';
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
        this.products = this.productService.getProduct();
        this.filteredProducts = this.products;
    }
    //4th step for @Output
    onRatingClicked(message:string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}