export interface ModelValue {
    modelClass: string;
    modelTitle: string;
    saveButtonName: string;
    saveButtonClass: string;
    name: string;
    discription: string;
  }


export interface SubCategory  {
  subcategory_id: string;
  ubcategory_name: string;
  subcategory_description: string;
  subcategory_files: string;
  status?:string;
}

export interface Category  {
  category_id: string;
  category_name: string;
  category_description: string;
  category_files: string;
  status: string;
  subcategory: SubCategory[]
}

export interface GetCategoryList {
  message: string;
  status: string;
  data: Category[]
}