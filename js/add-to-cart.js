    // function returns index of item within basket
    function findIndex(productName) {
        var basket = JSON.parse(localStorage.getItem("basket"));
        for (var i = 0, l = basket.length; i < l; i++) {
            if (productName == basket[i].product) {
                return i;
            }
        }
    }

    // function removes item from basket
    function removeFromBasket(productName) {
        var basket = JSON.parse(localStorage.getItem("basket"));
        if (basket.length == 1) {
            basket = [];
        } else {
            var index = findIndex(productName);
            basket.splice(index, 1);
        }
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    // function updates quantity of an item within basket
    function updateQuantity(productName, newQuantity) {
        var basket = JSON.parse(localStorage.getItem("basket"));
        for (var i = 0, l = basket.length; i < l; i++) {
            if (productName == basket[i].product) {
                basket[i].quant = newQuantity;
            }
        }
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    // function calculates total items in basket
    function calculateBasketCount() {
        var basket = JSON.parse(localStorage.getItem("basket"));

        var count = 0;
        
        if (basket == null) {
            count = 0;
        }
        else {
            for (var i = 0, l = basket.length; i < l; i++) {
                count += parseInt(basket[i].quant);
            } 
        }

        return count;
    }

    // function calculates subtotal of items in basket
    function calculateSubtotal() {
        var basket = JSON.parse(localStorage.getItem("basket"));

        var subtotal = 0;
        
        if (basket == null) {
            subtotal = 0;
        }
        else {
           for (var i = 0, l = basket.length; i < l; i++) {
                var price = basket[i].price.substring(1);
                subtotal += (parseFloat(price) * parseInt(basket[i].quant));
            } 
        }
        return subtotal;
    }

    // function updates basket count display    
    function updateBasketCount() {
        $("#basket-count").empty();
        if (calculateBasketCount() > 0) {
            $("#basket-count").append("<p>" + calculateBasketCount() + "</p>");
        } else {
            $("#basket-count").append("<p>0</p>");
        }
    }

    // function updates basket count display    
    function updateBasketPreview() {
        var basket = JSON.parse(localStorage.getItem("basket"));
        $("#basket-preview-contents").empty();
        if ( basket == null || basket.length == 0 ) {
            //var htmlString = "<li id='empty-basket-preview'>\
            var htmlString = "<div id='empty-basket-preview'>\
                    <h1>Your basket is currently empty. Why don't you take some time to browse through our books and paper products?</h1>\
                </div>";
            //</li>";      
        }
        
        else {
            var htmlString = "";
            for (var i = 0, l = basket.length; i < l; i++) {
                htmlString += "<li>\
                  <figure>\
                    <img src=' " + basket[i].image + "' alt=''>\
                    <figcaption>" + basket[i].product + "</figcaption>\
                  </figure>\
                  <div class='product-details'>\
                    <p> " + basket[i].price + "</p>\
                    <form action=''>\
                      <input type='number' name='quantity' value='" + basket[i].quant + "'>\
                      <a href='#' class='update-button'>Update</a><br>\
                      <a href='#' class='remove-button'>Remove</a>\
                    </form>\
                  </div>\
                </li>";              
            }
        }
        
        $("#basket-preview-contents").append(htmlString);
        var htmlItemCount = "Subtotal (" + calculateBasketCount() + " items)";
        var htmlSubtotal = "$" + calculateSubtotal().toFixed(2);
        $(".preview-item-count").html(htmlItemCount);
        $(".preview-subtotal").html(htmlSubtotal);
    }

    // update table in basket.html
    function updateBasketFinal() {
        var basket = JSON.parse(localStorage.getItem("basket"));
    
        $("#basket-container").empty();
        if ( basket == null || basket.length == 0 ) {
            $("#empty-basket").remove();
            var htmlString = "\
                <div id='empty-basket'>\
                <h1>Your basket is currently empty. Why don't you take some time to browse through our books and paper products?</h1>\
                <a class='btn btn-primary btn-lg cont-shop-button' href='index.html' role='button'>Continue Shopping</a>\
            </div>";
            
            $(htmlString).insertAfter("#basket-container");
            console.log('else dude');
        }    
        
        else {
            var htmlString = "<table class='col-xs-12 col-sm-7' id='table-basket-contents'>\
            <tr>\
                <th>Item(s)</th>\
                <th>Price</th>\
                <th>Quantity</th>\
                <th>Total</th>\
            </tr>";
            
            for (var i = 0, l = basket.length; i < l; i++) {
                var total = parseFloat(basket[i].price.substring(1)) * parseInt(basket[i].quant);
                
                var tableRowString = "<tr><td>\
                    <figure>\
                    <img src=' " + basket[i].image + "' alt=''>\
                    <figcaption>" + basket[i].product + "</figcaption>\
                    </figure>\
                    </td>\
                    <td>" + basket[i].price + "</td>\
                    <td><form action=''>\
                            <input type='number' name='quantity' value='" + basket[i].quant + "'><br>\
                            <a href='#' class='update-button'>Update</a><br>\
                            <a href='#' class='remove-button'>Remove</a>\
                        </form></td>\
                    <td>$" + total.toFixed(2) + "</td></tr>";

                htmlString += tableRowString;
            }
            
            htmlString += "</table>";
            
            var shipping = 3.99;
            var taxes = 2.29;
            var total = calculateSubtotal() + shipping + taxes;
            
            var checkoutString = "<div class='col-xs-12 col-sm-4' id='checkout-window'>\
                <div class='checkout-header'>\
                <h4>Order Summary</h4>\
                </div>\
                <div class='checkout-body'>\
                    <p>Subtotal (0 items)</p>\
                    <p>$" + calculateSubtotal() + "</p>\
                    <p>Est. Shipping</p>\
                    <p>$" + shipping + "</p>\
                    <p>Est. Taxes</p>\
                    <p>$" + taxes + "</p>\
                </div>\
                <div class='checkout-footer'>\
                    <h4>Order Total</h4>\
                    <h4>$" + total.toFixed(2) + "</h4>\
                    <a class='btn btn-primary btn-lg checkout-button' href='#' role='button' data-toggle='modal' data-target='#checkoutModal'>Checkout</a>\
                </div>\
            </div>";
            
            var modalString = "<div class='modal fade' id='checkoutModal' tabindex='-1' role='dialog' aria-labelledby='checkoutModal'>\
              <div class='modal-dialog' role='document'>\
                <div class='modal-content'>\
                  <div class='modal-body'>\
                    <ul id='progressbar'>\
                        <li class='active'>Shipping Address</li>\
                        <li>Delivery Options</li>\
                        <li>Payment Information</li>\
                        <li>Review your  Order</li>\
                    </ul>\
                    <form class='checkoutForm'>\
                      <input type='text' name='firstname' placeholder='First Name'><br>\
                      <input type='text' name='lastname' placeholder='Last Name'><br>\
                      <input type='text' name='address' placeholder='Address'><br>\
                      <input type='text' name='city' placeholder='City'>\
                      <select><option value='AL'>Alabama</option></select><br>\
                      <input type='text' name='country' placeholder='Country'><br>\
                      <input type='text' name='zipcode' placeholder='Zip Code'><br>\
                      <input type='text' name='email' placeholder='Email'><br>\
                      <input type='text' name='phonenum' placeholder='Phone number'><br>\
                    </form>" + checkoutString +
                  "</div>\
                </div>\
              </div>\
            </div>";

                      /*
                                        <div class='modal-header'>\
                    <button type='button class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden="true">&times;</span></button>\
                    <h4 class='modal-title' id='checkoutModal'>Modal title</h4>\
                  </div>\*/
            htmlString += checkoutString + modalString;
            $("#basket-container").append(htmlString);
        }   
    }

$(document).ready(function () {

    // function returns true if item exists in basket
    function isInBasket(productName) {
        var basket = JSON.parse(localStorage.getItem("basket"));
        for (var i = 0, l = basket.length; i < l; i++) {
            if (productName == basket[i].product) {
                return true;
            }
        }
        return false;
    }

    updateBasketCount();
    updateBasketPreview();
    updateBasketFinal();
    $(".basket-preview-button").click(function () {
        if (!(localStorage.getItem("basket") === null)) {
            var basket = JSON.parse(localStorage.getItem("basket"));

            updateBasketPreview();
            if (basket.length > 0) {
                $(".update-button").click(function () {
                    var newQuant = $(this).parent().find("input").val();
                    var product = $(this).parent().parent().prev().find("figcaption").text();
                    if (newQuant == 0) {
                        removeFromBasket(product);
                    } else {
                        updateQuantity(product, newQuant);
                    }
                    updateBasketCount();
                    updateBasketPreview();
                })

                $(".remove-button").click(function () {
                    var product = $(this).parent().parent().prev().find("figcaption").text();
                    removeFromBasket(product);
                    updateBasketCount();          
                    if (basket.length == 0) {
                        $("#basket-container").empty();
                        $(".empty-basket-preview").show();
                    }
                    else {
                        updateBasketPreview();
                    }
                })
            }
        }
    })
    
    $(".add-to-cart-button").click(function () {
        event.preventDefault();

        // gather product details & create product object
        var product = $(this).parent().find("figcaption").text();
        var image = $(this).parent().find("img").attr("src");
        var price = $(this).parent().find("p").text();

        var itemToAdd = {};
        itemToAdd.product = product;
        itemToAdd.image = image;
        itemToAdd.price = price;
        itemToAdd.quant = 1;

        // if current basket is empty, just add the item
        if (localStorage.getItem("basket") === null) {
            var basket = [];
            basket.push(itemToAdd);
        } else {
            var basket = JSON.parse(localStorage.getItem("basket"));

            if (isInBasket(product)) { // if item exists in basket, update quantity
                for (var i = 0, l = basket.length; i < l; i++) {
                    if (product == basket[i].product) {
                        basket[i].quant++;
                    }
                }
            }
            // else, add the new item
            else {
                basket.push(itemToAdd);
            }
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        updateBasketCount();
    })
})
