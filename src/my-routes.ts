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
        base: 'core',
        absolute: '/main/core',
        manager: {
            base: 'manager',
            absolute: '/main/core/manager',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/manager/dashboard'
            },
            project: {
                base: 'projects',
                absolute: '/main/core/manager/projects',
                list: {
                    base: 'projects/list',
                    absolute: '/main/core/manager/projects/list'
                },
                form: {
                    base: 'projects/form',
                    absolute: '/main/core/manager/projects/form'
                },
                document: {
                    base: 'projects/document',
                    absolute: '/main/core/manager/projects/document'
                }
            },
            program: {
                base: 'programs',
                absolute: '/main/core/manager/programs',
                list: {
                    base: 'programs/list',
                    absolute: '/main/core/manager/programs/list'
                },
                form: {
                    base: 'programs/form',
                    absolute: '/main/core/manager/programs/form'
                },
                document: {
                    base: 'programs/document',
                    absolute: '/main/core/manager/programs/document'
                }
            }
        }
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
    signIn: '/auth/sign-in',
    dashboards: {
        base: 'dashboards',
        absolute: '/main/dashboards'
    }
};
