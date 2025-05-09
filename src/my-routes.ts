export const MY_ROUTES = {
    home: '',
    layout: {
        base: 'layout'
    },
    errorPages: {
        base: 'errors',
        unauthorized: {
            absolute: '/errors/401',
            base: '401'
        },
        forbidden: {
            absolute: '/errors/403',
            base: '403'
        },
        notFound: {
            absolute: '/errors/404',
            base: '404'
        },
        unavailable: {
            absolute: '/errors/503',
            base: '503'
        }
    },
    corePages: {
        base: 'pages/core',
        absolute: '/pages/core',
        manager: {
            base: 'manager',
            absolute: '/pages/core/manager',
            dashboard: {
                base: 'dashboard',
                absolute: '/pages/core/manager/dashboard'
            },
            project: {
                base: 'projects',
                absolute: '/pages/core/manager/projects',
                list: '/pages/core/manager/projects/list',
            }
        },
    },
    authPages: {
        base: 'auth',
        signIn: {
            base: 'sign-in',
            absolute: '/auth/sign-in'
        },
        signUp: {
            base: 'sign-up',
            absolute: '/auth/sign-up'
        },
        passwordReset: {
            base: 'password-reset',
            absolute: '/auth/password-reset'
        }
    },
    login: '/auth/sign-in',
    dashboards: {
        base: 'pages/dashboards',
        absolute: '/pages/dashboards',
    },
};
