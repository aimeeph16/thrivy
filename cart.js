var removeItem = document.getElementsByClassName('cartremove')
console.log(removeItem)
for (var i=0; i< removeItem.length; i++){
    var button = removeItem[i]
    button.addEventListener('click', function(event){
        /* Calls this function when remove button is clicked*/
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

function updateCartTotal(){
    var cartItemContainer = documet.getElementsByClassName('cartitems')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cartrow')
    for (var i = 0; i< cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cartprice')[0]
        var quantityElement = cartRow.getElementsByClassName()

    }
}
