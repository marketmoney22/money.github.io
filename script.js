/* 기본 스타일 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    color: #333;
}

header {
    text-align: center;
    margin: 20px 0;
}

h1 {
    font-size: 2.5rem;
    color: #2d2d2d;
}

main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.product {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 250px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
}

.product:hover {
    transform: scale(1.05);
}

.product img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
}

.product h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.price {
    font-size: 1.2rem;
    color: #f76c5e;
    margin-bottom: 15px;
}

.add-to-cart {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.add-to-cart:hover {
    background-color: #45a049;
}

/* 구매 후 후기 폼 */
#review-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: 20px auto;
    text-align: center;
    display: none;
}

textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.hidden {
    display: none;
}
