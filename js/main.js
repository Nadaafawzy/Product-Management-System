// =============>> HTML Elements
var productNameInput = document.getElementById("productName");
var productCategoryInput = document.getElementById("productCategory");
var productPriceInput = document.getElementById("productPrice");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput= document.getElementById("productImage");
var productsContainer = document.getElementById("productsContainer");
var searchProductsInput= document.getElementById("searchProductsInput");





//  =============>> App variable
var productList =JSON.parse(localStorage.getItem("productList")) || []
/*   ده اللي السطر اللي فوقه بيساويه
if(localStorage.getItem("productList")!==null){
    var productList = JSON.parse(localStorage.getItem("productList")) // * Array not string
}
else{
var productList =[]
}
*/
displayAllProducts();
// ###(Regex)
var nameRegex =/^[A-Z][A-Za-z0-9 ]{3,}$/;
var categoryRegex=/^(Mobile|Laptop|Camera|Clothes|Medicine)$/;
var priceRegex = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
var descriptionRegex=/^[A-Z][a-zA-Z0-9 ]{25,}$/;











//   =============>> function
//   ### Create ###
function addProduct(){
    var isValid=
    validateProduct(nameRegex,productNameInput)&&validateProduct(categoryRegex,productCategoryInput)&&validateProduct(categoryRegex,productCategoryInput)&&validateProduct(descriptionRegex,productDescriptionInput)&&productImageInput.files[0] !== undefined;;
    if (isValid === true){
    var product={
        name:productNameInput.value,
        category:productCategoryInput.value,
        price:productPriceInput.value,
        description:productDescriptionInput.value,
        imageSrc:productImageInput.files[0].name
    };
    productList.push(product);
    localStorage.setItem('productList',JSON.stringify(productList)); // *string not Array
    displayProduct(productList.length-1);
    resetValue()
}
}
//  ### Read ###
function displayProduct(index){
var productCardMarkup=`
                        <div class="col-md-6 col-lg-3">
                        <div class="product-card rounded-3 overflow-hidden">
                            <img src="./images/${productList[index].imageSrc}" alt="laptop"
                                class="w-100 object-fit-contain bg-white p-3">
                            <div class="product-info p-3">
                                <div>
                                    <h3 class="h6">${productList[index].name}</h3>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mt-2 mb-3">
                                    <h4 class="h6">
                                        <i class="fa-solid fa-tags"></i>
                                        <span>${productList[index].category}</span>
                                    </h4>
                                    <span class="h6">${productList[index].price}L.E</span>
                                </div>
                                <p class="text-body-secondary">${productList[index].description}</p>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-outline-warning w-100">Update</button>
                                    <button class="btn btn-outline-danger w-100" onclick="deleteProduct(${index})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
productsContainer.innerHTML += productCardMarkup
}
// ### علشان اعرض كل العناصر يعد ما اعملها save في localstorage
function displayAllProducts(){
for(var i=0;i<productList.length;i++){
    displayProduct(i)
}
}
//   ###Delete ###
function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem('productList',JSON.stringify(productList));
    productsContainer.innerHTML='';
    displayAllProducts();
}
//  ### Search ###
function searchProducts(){
productsContainer.innerHTML='';
var searchKeyword= searchProductsInput.value;
for(var i=0;i<productList.length;i++){
    if(productList[i].name.toLowerCase().includes(searchKeyword.toLowerCase())){
displayProduct(i);
    }
}
}
// ### VAlidation
function validateProduct(regex,input){
if (regex.test(input.value)) {
    input.nextElementSibling.classList.add("invisible");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
    } else {
    input.nextElementSibling.classList.remove("invisible");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
    }
    
}

//  ### clear inputs After display###
function resetValue() {
    productNameInput.value = "";
    productCategoryInput.value = "";
    productPriceInput.value = "";
    productDescriptionInput.value = "";
    productImageInput.value = null;

    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
}