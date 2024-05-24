class Product {
    constructor(id = "", name = "", desc = "", price = 0, stock = 0) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
    }
}

class Stock {
    constructor() {
        this.list_product = [];
        this.init();
    }

    get_list_product() {
        return this.list_product;
    }

    get_prod_by_id(id) {
        return this.list_product.find(product => product.id == id) || null;
    }

    init() {
        this.list_product.push(new Product(1, "Mystery Box 1", "Mystery Box avec 1 objet", 10, 10));
        this.list_product.push(new Product(2, "Mystery Box 2", "Mystery Box avec 2 objets", 20, 7));
        this.list_product.push(new Product(3, "Mystery Box 3", "Mystery Box avec 3 objets", 30, 5));
        this.list_product.push(new Product(4, "Mystery Box 4", "Mystery Box avec 4 objets", 40, 9));
        this.list_product.push(new Product(5, "Mystery Box 5", "Mystery Box avec 5 objets", 50, 4));
        this.list_product.push(new Product(6, "Mystery Box 6", "Mystery Box avec 6 objets", 60, 5));
        this.list_product.push(new Product(7, "Mystery Box 7", "Mystery Box avec 7 objets", 70, 3));
        this.list_product.push(new Product(8, "Mystery Box 8", "Mystery Box avec 8 objets", 80, 11));
        this.list_product.push(new Product(9, "Mystery Box 9", "Mystery Box avec 9 objets", 90, 8));
        this.list_product.push(new Product(10, "Mystery Box 10", "Mystery Box avec 10 objets", 100, 5));
        this.list_product.push(new Product(11, "Mystery Box 11", "Mystery Box avec 11 objets", 110, 9));
    }
}

// Creer une instance 
const stockInstance = new Stock();

class Cart {
    constructor() {
        this.list_cart = {};
    }

    get_list_cart() {
        return this.list_cart;
    }

    addInCart(id, stock) {
        const product = stock.get_prod_by_id(id);
        if (product && product.stock > 0) {
            if (this.list_cart[id]) {
                this.list_cart[id]++;
            } else {
                this.list_cart[id] = 1;
            }
            product.stock--;
        }
    }

    removeFromCart(id, stock) {
        const product = stock.get_prod_by_id(id);
        if (product && this.list_cart[id]) {
            this.list_cart[id]--;
            product.stock++;
            if (this.list_cart[id] === 0) {
                delete this.list_cart[id];
            }
        }
    }

    get_nbr_product() {
        return Object.values(this.list_cart).reduce((total, quantity) => total + quantity, 0);
    }

    get_total_price(stock) {
        return Object.entries(this.list_cart).reduce((total, [id, quantity]) => {
            const product = stock.get_prod_by_id(id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    }
}

export { Product, stockInstance as Stock, Cart };
