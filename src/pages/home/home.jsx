import React from 'react';
import { pure, compose, toClass } from 'recompose';
import { notesApi, authApi } from '../../common/api';
import withReduxStore from '../../common/hocs/with-redux-store.jsx';
import withRootLayout from '../../common/hocs/with-root-layout.jsx';
import AddNoteForm from './components/add-note-form';
import NotesList from './components/notes-list';
import '../../common/style/index.scss';
import './home.scss';

const enhance = compose(
    toClass,
    withReduxStore({
        async getInitialReduxState({ req }) {
            const apiParams = {
                headers: {
                    Cookie: req.headers.cookie || ''
                }
            };

            try {
                const [notes, user] = await Promise.all([
                    notesApi.getAll(apiParams),
                    authApi.getUserData(apiParams)
                ]);

                return {
                    notes,
                    auth: {
                        isLoggedIn: true,
                        isLoginPending: false,
                        isLoginSuccess: null,
                        isLogoutPending: false,
                        isLogoutSuccess: null,
                        authData: {
                            email: user.email
                        }
                    }
                };
            } catch (err) {
                return {
                    notes: []
                };
            }
        }
    }),
    withRootLayout,
    pure
);

const Home = () => (
    <div className="home-page">
        <AddNoteForm />
        <NotesList />
    </div>
);

export default enhance(Home);