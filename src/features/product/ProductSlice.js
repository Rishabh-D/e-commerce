import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchAllProducts,
    fetchBrands,
    fetchCategories,
    fetchProductsByFilters,
    fetchProductById,
    createProduct,
    updateProduct,
} from "./ProductAPI";

const initialState = {
    products: [],
    categories: [],
    brands: [],
    status: "idle",
    totalItems: 0,
    selectedProduct: null,
};

// The function below is called a thunk and allows us to perform async logic.Thunks are
// typically used to make async requests.

/*
         *In order to fetch the products data and store it in the state, 
         you need to dispatch the fetchAllProductsAsync function in ProductList.js or any file where you want the data to get populated first. 
         This function makes an async call to fetch the products data 
         and dispatches actions to update the state with the fetched data. 
         By calling this function in the useEffect hook of your component, 
         the data will be fetched and updated in the state once the component mounts.
*/
export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        console.log("fetchAllProductsAsync dbcjsdbjsdbjsb");
        const response = await fetchAllProducts();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    "product/fetchProductsByFilters",
    async (filter, sort, pagination) => {
        // console.log("fetchProductsByFiltersAsync");
        const response = await fetchProductsByFilters(filter, sort, pagination);
        console.log(response.data);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchCategoriesAsync = createAsyncThunk(
    "product/fetchCategories",
    async () => {
        console.log("fetchCategoriesAsync running");
        const response = await fetchCategories();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchBrandsAsync = createAsyncThunk(
    "product/fetchBrands",
    async () => {
        console.log("fetchbrandsAsync dbcjsdbjsdbjsb");
        const response = await fetchBrands();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const fetchProductByIdAsync = createAsyncThunk(
    "product/fetchProductById",
    async (id) => {
        console.log("fetchProductByIdAsync running");
        const response = await fetchProductById(id);
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const createProductAsync = createAsyncThunk(
    "product/createProduct",
    async (product) => {
        const response = await createProduct(product);
        return response.data;
    }
);

export const updateProductAsync = createAsyncThunk(
    "product/update",
    async (update) => {
        const response = await updateProduct(update);
        return response.data;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload.products;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                console.log(state.brabs);
                state.brands = action.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.categories = action.payload;
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.selectedProduct = action.payload;
            })
            .addCase(createProductAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products.push(action.payload);
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = "idle";
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                state.products[index] = action.payload;
                state.selectedProduct = action.payload;
            });
    },
});

export const { clearSelectedProduct } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export const selectBrands = (state) => state.product.brands;

export const selectCategories = (state) => state.product.categories;

export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
