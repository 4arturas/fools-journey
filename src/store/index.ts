import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/store/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {counterReducer} from "@/store/counterSlice";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["authState"],
};

const counterStorage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const counterPersistConfig = {
    key: "counter",
    storage: counterStorage,
    test: ""
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);

const rootReducer = combineReducers({
    auth: persistedReducer,
    counter: counterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;