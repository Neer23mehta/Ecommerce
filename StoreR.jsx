import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const ADD_ITEMS = "task/add";
const DELETE_ITEMS = "task/delete";
const UPDATE_QUANTITY = "task/updateQuantity";

const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
};

export const reactRedux = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEMS:
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            // const presentitems = state.items.some((items)=> items.id === newItem.id);

            if (existingItem >= 0) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingItem
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                const updatedTotalPrice = state.totalPrice + newItem.price;
                const updatedTotalQuantity = state.totalQuantity + 1;
                return {
                    ...state,
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                    totalQuantity: updatedTotalQuantity,
                };
            } else {
                const updatedTotalPrice = state.totalPrice + newItem.price;
                const updatedTotalQuantity = state.totalQuantity + 1;
                return {
                    ...state,
                    items: [...state.items, { ...newItem, quantity: 1 }],
                    totalPrice: updatedTotalPrice,
                    totalQuantity: updatedTotalQuantity,
                };
            }

        case DELETE_ITEMS:
            const deletedItem = state.items.find((item) => item.id === action.payload);
            const updatedItemsAfterDelete = state.items.filter((item) => item.id !== action.payload);
            const updatedTotalPriceAfterDelete = state.totalPrice - (deletedItem ? deletedItem.price * deletedItem.quantity : 0);
            const updatedTotalQuantityAfterDelete = state.totalQuantity - deletedItem?.quantity;
            return {
                ...state,
                items: updatedItemsAfterDelete,
                totalPrice: updatedTotalPriceAfterDelete,
                totalQuantity: updatedTotalQuantityAfterDelete,
            };

        case UPDATE_QUANTITY:
            const { id, quantity } = action.payload;
            const updatedItems = state.items.map((item) =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            );

            const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const updatedTotalQuantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);

            return {
                ...state,
                items: updatedItems,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedTotalQuantity,
            };

        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["items", "totalPrice", "totalQuantity"], 
};
const persistedReducer = persistReducer(persistConfig, reactRedux);

export const store = createStore(persistedReducer);



export const persistor = persistStore(store);

export const additems = (data) => {
    return { type: ADD_ITEMS, payload: data };
};

export const deleteitems = (id) => {
    return { type: DELETE_ITEMS, payload: id };
};

export const updateQuantity = (id, quantity) => {
    return { type: UPDATE_QUANTITY, payload: { id, quantity } };
};
 