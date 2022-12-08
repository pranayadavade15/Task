import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent {

  freshnessList = ["Brand New","Second Hand","Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "save"
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
     private dailogRef : MatDialogRef<DailogComponent>) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productId : ['',Validators.required],
      productName : ['',Validators.required],
      categoryId : ['',Validators.required],
      category : ['',Validators.required],
      durability : ['',Validators.required],
      price : ['',Validators.required],
      date : ['',Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productId'].setValue(this.editData.productId);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['categoryId'].setValue(this.editData.categoryId);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['durability'].setValue(this.editData.durability);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }
  addProduct(){
   if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dailogRef.close('save');
        },
        error:()=>{
          alert("Error While adding the product")
        }
      })
    }
   }else{
    this.updateProduct()
   }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Sucessfully")
        this.productForm.reset();
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the records");
      }
    })
  }
}
