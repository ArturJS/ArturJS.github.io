import { createSelector } from 'reselect';

export const getAuthState = createSelector(
    state => state.auth,
    auth => ({
        isLoggedIn: auth.isLoggedIn,
        isLoginPending: auth.isLoginPending,
        isLoginSuccess: auth.isLoginSuccess,
        isLogoutPending: auth.isLogoutPending,
        isLogoutSuccess: auth.isLogoutSuccess,
        authData: {
            email: auth.authData.email,
            id: auth.authData.id
        }
    })
);