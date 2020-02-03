$(document).ready(function () {  
    if (!(localStorage.getItem("basket") === null)) {
        var basket = JSON.parse(localStorage.getItem("basket"));
        
        updateBasketFinal();
        
        if (basket.length > 0) {
            $(".update-button").click(function () {
                var newQuant = $(this).parent().find("input").val();
                console.log(newQuant);
                var product = $(this).parent().parent().parent().find("figcaption").text();
                console.log(product);
                if (newQuant == 0) {
                    removeFromBasket(product);
                } else {
                    updateQuantity(product, newQuant);
                }
                updateBasketCount();
                updateBasketFinal();
            })

            $(".remove-button").click(function () {
                var product = $(this).parent().parent().parent().find("figcaption").text();
                removeFromBasket(product);
                updateBasketCount();
                location.reload();
            })
        } 
    }
})
