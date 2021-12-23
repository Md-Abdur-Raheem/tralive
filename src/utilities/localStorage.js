const addToWishLists = id => {
    const myWish = [id] ;
    const traliveWishLists = localStorage.getItem("tralive-wish-list");

    if (!traliveWishLists) {
        localStorage.setItem("tralive-wish-list", JSON.stringify(myWish));
    }

    else {
        const wishLists = JSON.parse(traliveWishLists);

        if (wishLists.includes(id)) {
            alert("Already added to wish lists");
        }
        
        else {
            wishLists.push(id);
            const newWishLists = [...wishLists];
            localStorage.setItem("tralive-wish-list", JSON.stringify(newWishLists));
        }
        
    }        
}

const removeFromWishLists = id => {
    const traliveWishLists = JSON.parse(localStorage.getItem("tralive-wish-list"));
    const index = traliveWishLists.indexOf(id);

    traliveWishLists.splice(index, 1);

    const newWishLists = [...traliveWishLists];
    localStorage.setItem("tralive-wish-list", JSON.stringify(newWishLists));

}

export {addToWishLists, removeFromWishLists}
    
